"""Real PySpark reference transforms; canonical upstream events, not API validation."""
from pyspark.sql import SparkSession, functions as F, types as T

EVENT_COLUMNS = [
    "schema_version", "event_id", "warehouse_id", "device_id", "metric", "value", "occurred_at"
]
INPUT_SCHEMA = T.StructType([
    T.StructField("schema_version", T.IntegerType()),
    T.StructField("event_id", T.StringType()),
    T.StructField("warehouse_id", T.StringType()),
    T.StructField("device_id", T.StringType()),
    T.StructField("metric", T.StringType()),
    T.StructField("value", T.DoubleType()),
    T.StructField("occurred_at", T.StringType()),
])
NORMALIZED_SCHEMA = T.StructType(
    INPUT_SCHEMA.fields + [T.StructField("event_time", T.TimestampType())]
)


def session():
    spark = (SparkSession.builder.appName("EventPulse supplied Spark reference")
             .config("spark.sql.session.timeZone", "UTC")
             .config("spark.sql.shuffle.partitions", "2")
             .config("spark.ui.enabled", "false")
             .config("spark.driver.bindAddress", "127.0.0.1")
             .getOrCreate())
    spark.sparkContext.setLogLevel("WARN")
    return spark


def normalize_events(frame):
    """Filter invalid canonical upstream records and parse event time.

    This is not a replacement for the shared ingestion validator: file parsing
    can discard unknown fields. It assumes identity conflicts were already
    prevented upstream. Invalid lab rows are excluded; no durable DLQ claim.
    """
    parsed = frame.withColumn("event_time", F.try_to_timestamp("occurred_at"))
    valid = (
        (F.col("schema_version") == 1)
        & F.col("event_id").rlike(
            r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")
        & F.col("occurred_at").rlike(
            r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z$")
        & F.col("event_time").isNotNull()
        & ~F.isnan("value")
        & (F.abs(F.col("value")) <= F.lit(1.7976931348623157e308))
    )
    for key in ("warehouse_id", "device_id", "metric"):
        valid = valid & F.col(key).rlike(r"^[A-Za-z0-9_.:-]{1,64}$")
    return parsed.where(valid).select(*EVENT_COLUMNS, "event_time")


def ensure_no_batch_identity_conflicts(valid):
    payload = F.struct(*[F.col(c) for c in EVENT_COLUMNS if c != "event_id"])
    conflict = (valid.groupBy("event_id").agg(F.countDistinct(payload).alias("variants"))
                .where("variants > 1").limit(1).count())
    if conflict:
        raise ValueError("same event_id has conflicting payloads; no arbitrary first winner")


def window_aggregates(valid):
    return (valid.groupBy(F.window("event_time", "1 minute"), "warehouse_id", "metric")
            .agg(F.count("*").alias("event_count"), F.avg("value").alias("mean_value"),
                 F.max("value").alias("max_value"),
                 F.sum(F.when(F.col("value") > 100, 1).otherwise(0)).alias("above_threshold"))
            .select(F.col("window.start").alias("window_start"),
                    F.col("window.end").alias("window_end"),
                    "warehouse_id", "metric", "event_count", "mean_value",
                    "max_value", "above_threshold"))


def batch_windows(frame):
    valid = normalize_events(frame)
    ensure_no_batch_identity_conflicts(valid)
    return window_aggregates(valid.dropDuplicates(["event_id"]))


def row_summary(frame):
    return [r.asDict() for r in frame.orderBy("warehouse_id", "metric", "window_start").collect()]


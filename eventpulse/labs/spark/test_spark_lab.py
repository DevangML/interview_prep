"""Meaningful behavior checks executed by Spark's JVM, not a Python simulation."""
import math
import unittest
from datetime import datetime

from telemetry_lab import INPUT_SCHEMA, batch_windows, normalize_events, row_summary, session


def event(n, value, time, warehouse="pune-1"):
    return (1, f"00000000-0000-4000-8000-{n:012d}", warehouse, "scanner-1",
            "latency_ms", float(value), time)


class SparkBehavior(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spark = session()
        print("REFERENCE_RUNTIME_SPARK_VERSION=" + cls.spark.version)

    @classmethod
    def tearDownClass(cls):
        cls.spark.stop()

    def frame(self, rows):
        return self.spark.createDataFrame(rows, INPUT_SCHEMA)

    def test_window_boundary_dedup_threshold_and_invalid_records(self):
        first = event(1, 101, "2026-10-03T00:00:10.000000Z")
        rows = [
            first, first,
            event(2, 99, "2026-10-03T00:00:59.999999Z"),
            event(3, 110, "2026-10-03T00:01:00.000000Z"),
            event(4, 5, "2026-10-03T00:00:20.000000Z", "pune-2"),
            event(5, math.nan, "2026-10-03T00:00:20.000000Z"),
            event(6, math.inf, "2026-10-03T00:00:20.000000Z"),
            event(7, 5, "not-a-timestamp"),
            event(8, 5, "2026-10-03T00:00:20.000000Z", "warehouse space"),
        ]
        frame = self.frame(rows)
        self.assertEqual(normalize_events(frame).count(), 5)
        result = row_summary(batch_windows(frame))
        self.assertEqual(len(result), 3)
        self.assertEqual(
            [(r["warehouse_id"], r["window_start"], r["event_count"],
              r["mean_value"], r["above_threshold"]) for r in result],
            [("pune-1", datetime(2026, 10, 3, 0, 0), 2, 100.0, 1),
             ("pune-1", datetime(2026, 10, 3, 0, 1), 1, 110.0, 1),
             ("pune-2", datetime(2026, 10, 3, 0, 0), 1, 5.0, 0)])
        self.assertEqual(result[0]["max_value"], 101.0)

    def test_conflicting_identity_is_rejected_in_batch(self):
        time = "2026-10-03T00:00:10.000000Z"
        with self.assertRaisesRegex(ValueError, "conflicting"):
            batch_windows(self.frame([event(1, 101, time), event(1, 102, time)]))

    def test_partition_and_order_changes_preserve_finite_batch_result(self):
        rows = [event(i, i, f"2026-10-03T00:00:{i:02d}.000000Z") for i in range(1, 7)]
        rows += [rows[0], rows[-1]]
        forward = row_summary(batch_windows(self.frame(rows).repartition(1)))
        reverse = row_summary(batch_windows(self.frame(list(reversed(rows))).repartition(3)))
        self.assertEqual(forward, reverse)


if __name__ == "__main__":
    unittest.main(verbosity=2)


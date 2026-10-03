FROM apache/spark:4.1.3-scala2.13-java17-python3-ubuntu
USER root
RUN mkdir -p /opt/spark/work-dir/state && chown 185:185 /opt/spark/work-dir/state
COPY --chown=185:185 telemetry_lab.py stream_lab.py test_spark_lab.py /opt/spark/work-dir/
USER 185
ENV SPARK_LOCAL_IP=127.0.0.1
ENTRYPOINT ["/opt/spark/bin/spark-submit", "--master", "local[2]", "--driver-memory", "512m"]
CMD ["/opt/spark/work-dir/test_spark_lab.py"]


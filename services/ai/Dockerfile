FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Required for llama-cpp-python native build
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential \
    cmake \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /srv

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Model
RUN mkdir -p /models
COPY models/model.gguf /models/model.gguf

# Tarot meanings (single source of truth)
RUN mkdir -p /data
COPY data/tarotMeanings.json /data/tarotMeanings.json

ENV MODEL_PATH=/models/model.gguf
ENV MEANINGS_PATH=/data/tarotMeanings.json

CMD ["./start.sh"]

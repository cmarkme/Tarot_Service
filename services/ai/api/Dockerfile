FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Minimal deps (llama-cpp-python often pulls a wheel; keep build tools light)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /srv

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Place your GGUF model at /models/model.gguf (see model notes below)
RUN mkdir -p /models

ENV MODEL_PATH=/models/model.gguf
ENV N_THREADS=2
ENV N_CTX=2048
ENV N_BATCH=128
ENV MAX_TOKENS=260
ENV TEMPERATURE=0.2
ENV TOP_P=0.9

CMD ["./start.sh"]

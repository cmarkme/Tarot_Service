#!/usr/bin/env bash
set -euo pipefail

# Cloud Run sets PORT. Default to 8080 locally.
PORT="${PORT:-8080}"

# Expect the model file baked into the image at /models/model.gguf
# (or you can mount/download it and set MODEL_PATH)
: "${MODEL_PATH:=/models/model.gguf}"

exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT}"

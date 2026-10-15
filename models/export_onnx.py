#!/usr/bin/env python3
"""
Ekspor Model Student (CodeBERT 125M) ke Format ONNX.
Digunakan untuk simulasi evaluasi latensi CPU single-core pada runner CI/CD (RQ3).
"""

import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

MODEL_NAME = "microsoft/codebert-base"
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
ONNX_PATH = os.path.join(OUTPUT_DIR, "distilled_codebert.onnx")

def export():
    print(f"Loading model checkpoint: {MODEL_NAME}...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)
    model.eval()

    dummy_text = "// FIXME temporary workaround for race condition"
    inputs = tokenizer(dummy_text, padding="max_length", max_length=128, truncation=True, return_tensors="pt")

    print(f"Exporting to ONNX: {ONNX_PATH}...")
    torch.onnx.export(
        model,
        (inputs["input_ids"], inputs["attention_mask"]),
        ONNX_PATH,
        input_names=["input_ids", "attention_mask"],
        output_names=["logits"],
        dynamic_axes={
            "input_ids": {0: "batch_size"},
            "attention_mask": {0: "batch_size"},
            "logits": {0: "batch_size"}
        },
        opset_version=14
    )
    print("Export selesai. Model ONNX siap diuji dengan ONNX Runtime pada CPU.")

if __name__ == "__main__":
    export()

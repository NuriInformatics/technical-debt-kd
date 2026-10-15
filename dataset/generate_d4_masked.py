#!/usr/bin/env python3
"""
Sintesis Dataset D4: Implicit SATD Masked Evaluation Suite.
Mengadopsi protokol Zhuang et al. (2022) untuk menguji ketergantungan shortcut learning.
Menyamarkan kata kunci eksplisit (TODO, FIXME, HACK, dll.) pada sampel utang teknis.
"""

import os
import re
import pandas as pd

KEYWORDS_REGEX = re.compile(
    r"\b(TODO|FIXME|XXX|HACK|BUG|TEMPORARY|WORKAROUND|KLUDGE)\b",
    re.IGNORECASE,
)


def mask_keywords(text: str) -> tuple[str, str]:
    found = KEYWORDS_REGEX.findall(str(text))
    masked_text = KEYWORDS_REGEX.sub("[MASK]", str(text))
    return masked_text, ";".join(found) if found else "-"


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    d1_path = os.path.join(base_dir, "D1_code_comments.csv")
    out_path = os.path.join(base_dir, "D4_implicit_masked_test.csv")

    if not os.path.exists(d1_path):
        print(f"Error: {d1_path} tidak ditemukan.")
        return

    df = pd.read_csv(d1_path)
    # Filter komentar yang memuat label utang
    debt_samples = df[df["classification"] != "non_debt"].copy()
    non_debt_samples = df[df["classification"] == "non_debt"].copy()

    # Mask keywords pada debt samples
    masked_data = [mask_keywords(t) for t in debt_samples["text"]]
    debt_samples["text_masked"] = [m[0] for m in masked_data]
    debt_samples["removed_keywords"] = [m[1] for m in masked_data]
    debt_samples["is_masked"] = debt_samples["removed_keywords"] != "-"
    debt_samples["label"] = 1

    # Ambil sampel seimbang non-debt
    sampled_debt = debt_samples[debt_samples["is_masked"]].sample(
        n=min(2000, len(debt_samples[debt_samples["is_masked"]])),
        random_state=42,
    )
    sampled_non_debt = non_debt_samples.sample(
        n=len(sampled_debt),
        random_state=42,
    ).copy()
    sampled_non_debt["text_masked"] = sampled_non_debt["text"]
    sampled_non_debt["removed_keywords"] = "-"
    sampled_non_debt["is_masked"] = False
    sampled_non_debt["label"] = 0

    d4 = pd.concat([sampled_debt, sampled_non_debt]).sample(
        frac=1, random_state=42
    )
    cols = ["project", "text", "text_masked", "removed_keywords", "label"]
    d4[cols].to_csv(out_path, index=False)
    print(
        f"Dataset D4 berhasil disintesis: {out_path} ({len(d4)} baris seimbang: {len(sampled_debt)} SATD masked, {len(sampled_non_debt)} Non-SATD)"
    )


if __name__ == "__main__":
    main()

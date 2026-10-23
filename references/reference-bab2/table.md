# Matriks State-of-the-Art (Tabel 2.1)

| No & Penulis (Tahun) | Judul & Venue | Problem Domain & Dataset | Metode / Algoritma | Hasil Temuan & Skor Kunci | Keterbatasan & Gap |
|---|---|---|---|---|---|
| 1. Zhu et al. (2021) | Detecting and Classifying... with CNN-BiLSTM; JPCS | 10 proyek OSS | CNN-BiLSTM | Efektif untuk deteksi dan klasifikasi lintas proyek | Multi-class masih terganggu imbalance |
| 2. Yu et al. (2022) | GGSATD; JSS | 10 proyek + 7 proyek real-world | GGNN + attention/pooling | F1 0.895 within, 0.862 cross, 0.921 extended | Imbalance belum tertangani penuh |
| 3. Tu & Menzies (2022) | DebtFree; EMSE | 10 proyek software | Semi-supervised + active learning | Label effort turun 99% / 63% | Belum fokus pada robustness model |
| 4. Li et al. (2022) | Automatic identification... four different sources; EMSE | 103 proyek, 4 artefak | Multi-source SATD identification | Avg F1 0.611 | Performa moderat pada heterogenitas tinggi |
| 5. Qu et al. (2023) | Deep Learning-Based SATD Detection; JIT | 10 proyek Java, 259.229 komentar | TextCNN + improved focal loss | Lebih baik dari SOTA baselines | Bergantung pada benchmark Java |
| 6. Sabbah & Hanani (2023) | SATD classification using NLP word embeddings; IJECE | 2 dataset komentar/commit | TF-IDF, BERT features, RF, CNN | RF akurasi 0.822; CNN+BERT 0.838 | Dataset relatif kecil |
| 7. Sutoyo & Capiluppi (2024) | SATDAUG; MSR | Dataset SATD multi-artefak | Augmentasi dan balancing dataset | Menambah contoh pada kelas sangat timpang | Fokus pada data, bukan model |
| 8. Sheikhaei et al. (2024) | Effectiveness of LLMs for SATD; EMSE | Benchmark SATD umum | Flan-T5, CNN, BERT, ICL | Fine-tuned LLM unggul 4.4–7.2% F1 | Zero-shot masih tertinggal |
| 9. Yu et al. (2024) | Prompt-Based Method in Issue-Tracking Systems; Electronics | 7 proyek issue-tracking | Weighted prompt tuning | Outperform baseline secara signifikan | Fokus issue tracker saja |
| 10. Sutoyo et al. (2026) | Reducing labeling effort in ATD detection; EMSE | >103k candidate issues, 10 proyek | Keyword filtering + active learning + XAI | F1 0.72; effort turun 49% | Spesifik ATD, bukan seluruh SATD |
| 11. Abdulaziz et al. (2025/2026) | Automated Detection of SATD: SLR; IEEE Access | Review 46 studi | SLR | Menegaskan transisi ke context-aware/transformer | Bukan studi eksperimental primer |

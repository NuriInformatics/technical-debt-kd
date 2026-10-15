# Dataset Korpus Empiris (D1 - D4)

Repositori ini memuat seluruh korpus pengujian SATD (*Self-Admitted Technical Debt*) multi-artefak:

| Kode | Nama Korpus | Sumber Publikasi | Total Sampel | Format Data |
|---|---|---|---|---|
| **D1** | Java Source Comments | Maldonado & da Silva / Qu et al. (2023) | 62.275 baris | CSV (`project`, `text`, `classification`) |
| **D2-A** | Git Commit Messages | Li et al., Springer EMSE (2023) | 5.000 baris | CSV (`project`, `sha`, `text`, `classification`, `indicator`) |
| **D2-B** | Jira Issue Trackers | Li et al., Springer EMSE (2023) | 7.000 baris | CSV (`project`, `issue_number`, `issue_type`, `text`, `classification`) |
| **D2-C** | GitHub Pull Requests | Li et al., Springer EMSE (2023) | 5.000 baris | CSV (`project`, `pull_number`, `pull_type`, `id`, `text`, `classification`) |
| **D3** | Scientific Software Corpus | Melin et al., ACM PASC (2026) | 900.358 baris | CSV (`status`, `project`, `text`, `label`, `artifact_source`) |
| **D4** | Implicit Masked Test Suite | Sintesis Mandiri (Zhuang et al., 2022) | 4.000 baris | CSV (`project`, `text`, `text_masked`, `removed_keywords`, `label`) |

### Pembuatan Ulang D4 (Masked Test)
```bash
python generate_d4_masked.py
```
Menghasilkan 4.000 baris data uji seimbang (2.000 SATD bertopeng dan 2.000 Non-SATD) untuk menguji ketahanan model terhadap *shortcut learning*.

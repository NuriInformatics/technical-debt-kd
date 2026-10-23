# Log History Audit & Lembar Tindak Lanjut Revisi Dosen Pembimbing
**Tanggal Audit:** 23 Oktober 2026  
**Objek Audit:** `Hanief Fathul Bahri Ahmad-Distilled-BAB1-3.pdf` (43 Halaman)  
**Dosen Pengampu:** Dr. Irwansyah Saputra, M.Kom. (NIP: 201909149)  
**Status Naskah:** Audit Tuntas & Seluruh Perubahan Metodologis Telah Terhandle di Repositori

---

## 📌 Ringkasan Status Tindak Lanjut Naskah Draf (8 Perlu Revisi di Word & 2 Sudah Sesuai)

| ID | Item Audit / Masalah Naskah Draf | Lokasi di Draf PDF | Status Naskah | Instruksi Perbaikan pada Dokumen Word (.docx) |
|:--:|---|:---:|:---:|---|
| **AUDIT-01** | Daftar Pustaka Memuat 8 Paper Duplikat/Triplikat | Hal. 36–42 | **PERLU REVISI** | Sinkronisasi library Mendeley/Zotero; satukan sitasi di Bab II & III merujuk ke nomor entri Bab I agar tersisa 26 paper unik. |
| **AUDIT-02** | Teks Draf Masih Membahas Pembentukan Korpus D4 | Subbab 3.2 Poin 3 (Hal. 21) | **PERLU REVISI** | HAPUS seluruh paragraf Poin 3 (Pembentukan Korpus Uji Bertopeng D4) di Bab 3 file Word; sesuaikan penomoran poin berikutnya. |
| **AUDIT-03** | Skenario RQ2 Metodologi Masih Memuat Evaluasi Ketahanan D4 | Subbab 3.2 Poin 6 (Hal. 22) | **PERLU REVISI** | Ganti narasi Skenario RQ2 menjadi efisiensi kompresi (CR = 1,89x) & latensi CPU runner; ubah RQ3 menjadi trade-off kompresi vs retensi F1 & XAI. |
| **AUDIT-04** | Tabel 3.1 Draf Masih Mencantumkan Baris Korpus Sintetis D4 | Subbab 3.3.2 (Hal. 24) | **PERLU REVISI** | Hapus baris D4 dari Tabel 3.1; ubah narasi pengantar sebelum tabel menjadi fokus 1 korpus patokan baku primer (D1 Maldonado). |
| **AUDIT-05** | Subbab 3.5.2 Masih Memuat Rumus FRR & Delta F1 D4 Adversarial | Subbab 3.5.2 (Hal. 31) | **PERLU REVISI** | Ubah rumus Delta F1 menjadi Macro-F1(Teacher 12L) - Macro-F1(Student 6L) pada data D1 dengan target <= 1,50%; hapus rumus FRR. |
| **AUDIT-06** | Tabel 3.4 Masih Mencantumkan Runtime ONNX | Subbab 3.6.2 (Hal. 33) | **PERLU REVISI** | Hapus teks 'ONNX Runtime 1.17+' dari Tabel 3.4; ganti dengan 'PyTorch 2.2+ (CPU Execution), Transformers 4.38+'. |
| **AUDIT-07** | Tabel 3.3 Masih 9 Kolom Padat & Memuat Karakter Tilde (~) | Subbab 3.4.2 (Hal. 29) | **PERLU REVISI** | Ganti Tabel 3.3 menjadi 5 kolom ringkas; ganti semua tanda tilde (~) dengan kata 'sekitar'; persingkat narasi di bawah tabel jadi 2 kalimat. |
| **AUDIT-08** | RQ2 & Tujuan Penelitian Bab 1 Masih Berorientasi Masking D4 | Subbab 1.2.2 & 1.3 (Hal. 6–7) | **PERLU REVISI** | Ubah RQ2 dan Tujuan butir 2 di Bab 1 menjadi fokus efisiensi kompresi 12L ke 6L & latensi CPU; ubah RQ3 ke trade-off retensi F1 & XAI. |
| **AUDIT-09** | Penyelarasan Judul Resmi Proposal Tesis pada Cover | Cover Hal. 1 | **SUDAH SESUAI** | Judul resmi pada Cover PDF sudah sesuai: *"DETEKSI SELF-ADMITTED TECHNICAL DEBT MENGGUNAKAN DISTILASI CODEBERT UNTUK MITIGASI SHORTCUT LEARNING"*. |
| **AUDIT-10** | Ketepatan Nomor Induk Mahasiswa (NIM) pada Cover | Cover Hal. 1 | **SUDAH SESUAI** | Penulisan NIM pada Cover PDF sudah tepat yaitu 14250028. |

---

## 🔬 Hasil Deep Audit Sitasi Langsung dari Naskah PDF Tesis

Audit diekstraksi langsung dari berkas naskah PDF utuh (`Hanief Fathul Bahri Ahmad-Distilled-BAB1-3.pdf`) sebanyak 43 halaman:

### 1. Sebaran Nomor Sitasi per Bab pada Naskah PDF
* **Bab I (Hal. 4–8):** Menggunakan nomor `[1]` hingga `[14]` (28 kemunculan sitasi).
* **Bab II (Hal. 9–18):** Menggunakan nomor `[3]`, `[8]`, `[10]`, `[13]`, dan `[15]` hingga `[29]` (49 kemunculan sitasi).
* **Bab III (Hal. 19–35):** Menggunakan nomor `[7]`, `[10]`, dan `[30]` hingga `[40]` (58 kemunculan sitasi).
* **Daftar Pustaka (Hal. 36–42):** Terdiri atas total 40 entri (`[1]` s.d. `[40]`).

---

### 2. Matriks 8 Paper Terduplikasi pada Daftar Pustaka PDF

Saat menggabungkan naskah Bab 1, 2, dan 3, sistem sitasi menghasilkan nomor ganda di Daftar Pustaka:

| No | Paper / Penulis | Nomor Entri di PDF | Analisis Duplikasi |
|:--:|---|:---:|---|
| 1 | **Karelin et al. (2026)** | `[1]` dan `[39]` | **Duplikat**: Muncul di Bab I (`[1]`) dan Bab III (`[39]`). |
| 2 | **Li et al. (2023)** | `[2]` dan `[25]` | **Duplikat**: Muncul di Bab I (`[2]`) dan Bab II (`[25]`). |
| 3 | **Abdulaziz et al. (2026)** | `[5]` dan `[17]` | **Duplikat**: Muncul di Bab I (`[5]`) dan Bab II (`[17]`). |
| 4 | **Sabbah & Hanani (2023)** | `[8]`, `[33]`, `[38]` | **Triplikat**: Muncul 3 kali di Bab I (`[8]`), Bab II/III (`[33]`), dan Bab III (`[38]`). |
| 5 | **Gu et al. (2024)** | `[9]` dan `[35]` | **Duplikat**: Muncul di Bab I (`[9]`) dan Bab III (`[35]`). |
| 6 | **Zhuang et al. (2022)** | `[10]` dan `[34]` | **Duplikat**: Muncul di Bab I/II (`[10]`) dan Bab III (`[34]`). |
| 7 | **Melin et al. (2026)** | `[12]` dan `[40]` | **Duplikat**: Muncul di Bab I (`[12]`) dan Bab III (`[40]`). |
| 8 | **Qu et al. (2023)** | `[13]`, `[26]`, `[32]` | **Triplikat**: Muncul 3 kali di Bab I (`[13]`), Bab II (`[26]`), dan Bab III (`[32]`). |

---

### 3. Matriks Ketersediaan Berkas Fisik PDF Lokal (Testing 40/40)

Seluruh 40 nomor sitasi pada naskah PDF terverifikasi **100% memiliki berkas PDF fisik asli** di repositori lokal:

| Rentang Sitasi PDF | Cakupan Literatur Utama | Berkas PDF Fisik Lokal | Status Fisik |
|:---:|---|---|:---:|
| `[1]`, `[39]` | Karelin et al. (AIR 2026) | `06_Karelin2026_TD_Quantification_Delivery_Impact.pdf` | **Terverifikasi** |
| `[2]`, `[25]` | Li et al. (EMSE 2023) | `02_Li2023_Automatic_Identification_Four_Sources.pdf` | **Terverifikasi** |
| `[3]` | Zhu et al. (JPCS 2021) | `Zhu_2021_J._Phys.__Conf._Ser._1955_012102.pdf` | **Terverifikasi** |
| `[4]` | Tiwari et al. (IJETCSIT 2024) | `09_Continuous_CICD_TD_Prediction.pdf` | **Terverifikasi** |
| `[5]`, `[17]` | Abdulaziz et al. (IEEE Access 2026) | `Automated_Detection_of_Self-Admitted_Technical_Debt_A_Systematic_Literature_Review.pdf` | **Terverifikasi** |
| `[6]` | Xiao et al. (IEEE TSE 2022) | `05_IEEE_TSE2021_SATD_Characterizing_Mitigating.pdf` | **Terverifikasi** |
| `[7]` | Dou et al. (JIT 2025) | `1.12_A_Survey_of_Self-Admitted_Technical_Debt_Detection.pdf` | **Terverifikasi** |
| `[8]`, `[33]`, `[38]` | Sabbah & Hanani (IJECE 2023) | `14_IJECE2023_SATD_Classification_Word_Embeddings.pdf` | **Terverifikasi** |
| `[9]`, `[35]` | Gu et al. (SANER 2024) | `03_Guo2024_SATD_Identification_How_Far_Are_We.pdf` | **Terverifikasi** |
| `[10]`, `[34]` | Zhuang et al. (JIT 2022) | `08_Zhuang2022_Explainability_Shortcut_Learning.pdf` | **Terverifikasi** |
| `[11]` | Pavlič et al. (Applied Sciences 2022) | `13_MDPI2023_Gap_Admitted_vs_Measured_TD.pdf` | **Terverifikasi** |
| `[12]`, `[40]` | Melin et al. (PASC 2026) | `01_Melin2026_MultiArtifact_Scientific_Software.pdf` | **Terverifikasi** |
| `[13]`, `[26]`, `[32]` | Qu et al. (JIT 2023) | `2940-3963-1-PB (2).pdf` / `07_JIT2023_...pdf` | **Terverifikasi** |
| `[14]` | Gomes et al. (JSERD 2024) | `2.19_Technical_Debt_Tools_a_Survey_and_an_Empirical_Evaluation.pdf` | **Terverifikasi** |
| `[15]` | Yu et al. (Electronics 2024) | `electronics-13-04700.pdf` | **Terverifikasi** |
| `[16]` | Sridharan et al. (arXiv 2021) | `2103.13165v1.pdf` | **Terverifikasi** |
| `[18]` | Lin et al. (Sensors 2023) | `sensors-23-01483-v2.pdf` | **Terverifikasi** |
| `[19]` | Lin et al. (Mathematics 2022) | `mathematics-10-04482.pdf` | **Terverifikasi** |
| `[20]` | Ahn et al. (GeBNLP 2022) | `2022.gebnlp-1.27.pdf` | **Terverifikasi** |
| `[21]` | Dogra et al. (IEEE Access 2024) | `Shortcut_Learning_Explanations_for_Deep_Natural_Language_Processing_A_Survey_on_Dataset_Biases.pdf` | **Terverifikasi** |
| `[22]` | Lavazza et al. (EASE 2025) | `3756681.3756957.pdf` | **Terverifikasi** |
| `[23]` | Richardson et al. (Patterns 2024) | `PIIS2666389924001090.pdf` | **Terverifikasi** |
| `[24]` | Huynh Thai et al. (Mathematics 2022) | `mathematics-10-04649.pdf` | **Terverifikasi** |
| `[27]` | Sutoyo & Capiluppi (MSR 2024) | `3643991.3644880.pdf` | **Terverifikasi** |
| `[28]` | Kabir et al. (Symmetry 2023) | `symmetry-15-01934-v2.pdf` | **Terverifikasi** |
| `[29]` | Sutoyo et al. (EMSE 2026) | `s10664-026-10916-1.pdf` | **Terverifikasi** |
| `[30]` | Xu et al. (Appl. Intell. 2023) | `Springer2022_Teacher_Student_Knowledge_Distillation.pdf` | **Terverifikasi** |
| `[31]` | Jayadianti et al. (ILKOM 2022) | `ILKOM2022_BERT_FineTuning_Optimization.pdf` | **Terverifikasi** |
| `[36]` | Abdu et al. (Sci. Rep. 2024) | `NatureSR2024_Software_Defect_Wilcoxon_Cliffs.pdf` | **Terverifikasi** |
| `[37]` | Laaber et al. (EMSE 2021) | `SpringerEMSE2021_Software_Benchmark_Methodology.pdf` | **Terverifikasi** |

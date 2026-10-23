# Log History Audit & Lembar Tindak Lanjut Revisi Dosen Pembimbing
**Tanggal Audit:** 23 Oktober 2026  
**Objek Audit:** `Hanief Fathul Bahri Ahmad-Distilled-BAB1-3.pdf`  
**Dosen Pengampu:** Dr. Irwansyah Saputra, M.Kom. (NIP: 201909149)  
**Status Naskah:** Sinkronisasi Revisi Dosen ke Repositori & Persiapan Dokumen Word

---

## 📌 Ringkasan Arahan Dosen & Keputusan Perubahan

| No | Poin Revisi Dosen | Lokasi Dokumen | Masalah Terdahulu | Keputusan & Tindak Lanjut | Status di GitHub |
|:--:|---|---|---|---|:---:|
| 1 | **Pembaruan Judul Tesis** | Cover Bab I, II, III | Judul lama memuat *multi-artefak domain* yang sudah tidak lagi sejalan dengan ruang lingkup eksperimen. | Diganti menjadi: *"DETEKSI SELF-ADMITTED TECHNICAL DEBT MENGGUNAKAN DISTILASI CODEBERT UNTUK MITIGASI SHORTCUT LEARNING"*. | **Selesai** |
| 2 | **Penyempitan Dataset (Hanya Komentar Kode)** | Direktori `dataset/` & Subbab 3.3 | Repositori memuat dataset D2 (commits/issues/PRs), D3 (HPC DOE), dan D4 (sintetis) yang membuat fokus riset melebar. | D2, D3, dan D4 dihapus permanen dari repositori. Eksperimen dibatasi murni pada **D1 Maldonado Java (62.275 baris)**. | **Selesai** |
| 3 | **Penangguhan Studi Ablasi Data Sintetis (D4)** | Subbab 1.2.2 & 3.2 (Rumusan Masalah) | Terdapat rencana studi ablasi pengujian ketahanan data bertopeng adversarial D4. Dosen mengarahkan untuk menunda ablasi data sintetis dan fokus ke masalah utama distilasi CodeBERT. | RQ diubah menjadi 3 pilar: RQ1 (Efektivitas Deteksi SATD), RQ2 (Efisiensi Kompresi Parameter & Latensi CPU), dan RQ3 (Trade-off Kompresi vs Retensi F1 & XAI Integrated Gradients). | **Selesai** |
| 4 | **Peniadaan Dependensi ONNX** | Subbab 3.6 & `models/` | Sebelumnya terdapat rencana ekspor model ke format ONNX (`export_onnx.py`). | ONNX tidak lagi menjadi sasaran keluaran wajib; seluruh evaluasi inferensi menggunakan PyTorch runtime murni (`torch.no_grad()`). Skrip dihapus. | **Selesai** |
| 5 | **Arsitektur Model (Opsi B)** | Subbab 3.4 & `models/` | Inkonsistensi narasi parameter Teacher (pernah menyebut DeepSeek-Coder 1.3B). | Ditetapkan Opsi B: Teacher = CodeBERT-base 12-layer (125M parameter), Student = Distilled-CodeBERT 6-layer (66M parameter) dengan inisialisasi lapisan berseling (1, 3, 5, 7, 9, 11). | **Selesai** |
| 6 | **Audit Sitasi Mandiri Tiap Bab** | Daftar Pustaka Bab I, II, III | Potensi sitasi tertukar atau nomor tidak urut saat naskah dipisah. | Bab 1 mandiri [1]-[14], Bab 3 mandiri [1]-[12], Bab 2 menggunakan 15 jurnal peer-reviewed 2021–2026. Semua terverifikasi lengkap. | **Tercatat untuk Word** |
| 7 | **Penyederhanaan Tabel 3.3 & Tipografi** | Subbab 3.4.2 & Naskah Word | Tabel 3.3 terdahulu terlalu padat (9 kolom) dan karakter tilde (~) berisiko terkonversi menjadi coret teks (strikethrough). | Disederhanakan menjadi 5 kolom bersih, narasi pasca tabel dipadatkan menjadi 2 kalimat, dan seluruh simbol tilde diganti 'sekitar'. | **Tercatat untuk Word** |

---

## 🔍 Detail Lembar Tindak Lanjut Per Item

### 1. Judul Resmi Proposal
- **Sebelumnya:** *"Deteksi Self-Admitted Technical Debt Multi Artefak Domain Menggunakan Distilasi CodeBERT"*
- **Revisi Dosen:** *"DETEKSI SELF-ADMITTED TECHNICAL DEBT MENGGUNAKAN DISTILASI CODEBERT UNTUK MITIGASI SHORTCUT LEARNING"*
- **Alasan:** Menegaskan kontribusi utama riset pada penanganan bias pintasan (*shortcut learning*) dan efisiensi kompresi model transformer untuk deteksi utang teknis.

### 2. Eliminasi Korpus Non-Kode & Sintetis
- Seluruh file selain `D1_code_comments.csv` telah dihapus dari repositori git untuk memastikan kebersihan artefak riset:
  - `D2_commit_messages.csv` (10.533 baris) -> Dihapus
  - `D2_issues.csv` (23.181 baris) -> Dihapus
  - `D2_pull_requests.csv` (8.775 baris) -> Dihapus
  - `D3_scientific_master.csv` (121.941 baris) -> Dihapus
  - `D4_implicit_masked_test.csv` (10.335 baris) -> Dihapus
  - `generate_d4_masked.py` -> Dihapus
- Repositori kini 100% ramping dengan hanya 1 korpus emas: **62.275 baris komentar kode Java Maldonado**.

### 3. Penataan Tiga Rumusan Masalah (Research Questions)
- **RQ1 (Efektivitas Deteksi SATD):** Menguji Macro-F1, MCC, dan AUC-PR model Student 6-layer terhadap Teacher 12-layer dan baseline konvensional (TextCNN, BiLSTM, Student-6L tanpa distilasi).
- **RQ2 (Efisiensi Kompresi Parameter & Throughput CPU):** Menguji pencapaian rasio kompresi parameter $CR = 1{,}89\times$, penyusutan bobot fisik dari ~490 MB ke ~260 MB, dan kecepatan inferensi CPU ($\le 30$ ms / sampel).
- **RQ3 (Trade-off Kompresi vs Retensi F1 & Atribusi XAI):** Memvalidasi batasan toleransi penurunan F1 ($\Delta F_1 \le 1{,}50\%$) serta analisis *Integrated Gradients* untuk membuktikan model tetap mempertahankan perhatian pada konteks semantik utang teknis.

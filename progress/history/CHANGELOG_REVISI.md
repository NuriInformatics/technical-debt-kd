# Changelog & History Revisi Naskah Tesis

Format pencatatan riwayat revisi, koreksi typo, dan audit naskah akademik:

| Tanggal | Bagian Naskah | Tipe | Uraian Sebelum | Uraian Sesudah | Status | Reviewer |
|---|---|---|---|---|---|---|
| 2026-10-16 | Cover Bab 3 | Placeholder | `[ Tuliskan Judul Rencana... ]` | *"Deteksi Utang Teknis Implisit..."* | Teridentifikasi | Audit AI |
| 2026-10-16 | Cover Bab 3 | Typo NIM | `NIM: 14250028` | `NIM: 1250028` | Teridentifikasi | Audit AI |
| 2026-10-16 | Subbab 3.2 Poin 5 | Kontradiksi | *"Teacher berskala 7 miliar..."* | *"Teacher berskala 1,3 miliar..."* | Selesai di MD | Audit AI |
| 2026-10-16 | Subbab 3.5.1 MCC | Missing Ref | Chicco (2021) tanpa pustaka | Ditambahkan ke Daftar Pustaka | Selesai di MD | Audit AI |
| 2026-10-16 | Subbab 3.4.1 Formula | Broken Math | Pembilang $\exp(z/T)$ terputus | Rumus disederhanakan | Selesai di MD | Audit AI |
| 2026-10-16 | Subbab 3.5.3 | Out of Scope | Subbab Estimasi Effort Software | Dihapus (Fokus Defect Prediction) | Selesai di MD | Arahan Dosen |
| 2026-10-23 | Judul Tesis | Revisi Judul | *"Deteksi SATD Multi Artefak..."* | *"Deteksi Self-Admitted Technical Debt Menggunakan Distilasi CodeBERT untuk Mitigasi Shortcut Learning"* | Selesai di Repo | Arahan Dosen (PDF) |
| 2026-10-23 | Dataset & Scope | Eliminasi Dataset | Korpus D2, D3, dan D4 sintetis | Fokus eksklusif D1 Komentar Kode Java (62.275 baris) | Selesai di Repo | Arahan Dosen |
| 2026-10-23 | Metodologi | Penangguhan Ablasi D4 | Ablasi data sintetis bertopeng D4 | Ditangguhkan; fokus utama distilasi CodeBERT (12L -> 6L) | Selesai di Repo | Arahan Dosen |
| 2026-10-23 | Arsitektur & Tool | Eliminasi ONNX | Skrip ekspor ONNX (`export_onnx.py`) | Dihapus; evaluasi inferensi murni PyTorch CPU runner | Selesai di Repo | Klarifikasi Draft |
| 2026-10-23 | Sitasi & Bibliografi | Testing Fisik 40/40 Sitasi | Cek berkas PDF 40 sitasi naskah | 100% berkas PDF fisik asli tersedia lengkap di repositori lokal | Selesai di Repo | Audit AI & PDF |
| 2026-10-23 | Sitasi & Bibliografi | Deduplikasi Sitasi | 8 Paper duplikat/triplikat di PDF | Dipetakan lengkap ke matriks deduplikasi untuk file Word | Selesai di Repo | Audit AI & PDF |
| 2026-10-23 | Metadata Repo | Pembersihan Info Pribadi | Nama, NIM, Prodi, Dosen di README | Dihapus; README hanya memuat judul resmi & navigasi riset | Selesai di Repo | Permintaan Pengguna |

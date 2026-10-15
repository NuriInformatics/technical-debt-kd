// Minimalist Academic Research Console Controller

const FALLBACK_DATA = {
  "thesis": {
    "title": "DETEKSI SELF-ADMITTED TECHNICAL DEBT MULTI ARTEFAK DOMAIN MENGGUNAKAN DISTILASI CODEBERT",
    "student": "Hanief Fathul Bahri Ahmad",
    "nim": "1250028",
    "advisor": "Dr. Irwansyah Saputra, M.Kom.",
    "status": "In Progress (Penyelarasan Bab 1 & Bab 3)",
    "date": "2026-10-16"
  },
  "metrics": {
    "total_references": 21,
    "pdf_verified": 23,
    "estimated_pages": 23,
    "dataset_samples": "978.633",
    "official_revisions_count": 3,
    "ai_alerts_count": 7
  },
  "official_revisions": [
    {
      "id": "REV-01",
      "source": "Arahan Dosen Pengampu (Dr. Irwansyah Saputra, M.Kom.)",
      "date": "2026-10-14",
      "target_section": "Subbab 3.5 Metrik Evaluasi & Subbab 3.6.3 Uji Signifikansi",
      "topic": "Penetapan Metrik Evaluasi Kebal Imbalance & Uji Non-Parametrik",
      "directive": "Evaluasi klasifikasi biner wajib menggunakan metrik yang kebal ketimpangan kelas (class imbalance), yaitu Matthews Correlation Coefficient (MCC) dan Macro-F1. Uji komparasi antar-model tidak boleh mengandalkan perbedaan nilai rerata numerik semata, melainkan wajib diuji melalui protokol statistika inferensial non-parametrik (Wilcoxon Signed-Rank Test & Cliff's Delta) karena sebaran metrik software engineering terbukti tidak berdistribusi normal.",
      "implementation_status": "Implemented in MD (Pending sync to Word/PDF)",
      "evidence": "Subbab 3.5.1 diperkuat dengan teorema Chicco et al. (2021). Subbab 3.6.3 mengadopsi protokol statistik Abdu et al. (2024)."
    },
    {
      "id": "REV-02",
      "source": "Arahan Dosen Pengampu (Dr. Irwansyah Saputra, M.Kom.)",
      "date": "2026-10-12",
      "target_section": "Subbab 3.5.3 Estimasi Effort",
      "topic": "Pembersihan Ruang Lingkup: Hapus Subbab Estimasi Effort",
      "directive": "Hapus subbab estimasi effort rekayasa perangkat lunak karena penelitian tesis ini berfokus pada prediksi cacat dan pendeteksian utang teknis (klasifikasi biner pada komentar/artefak teks), bukan estimasi durasi waktu rekayasa atau biaya (regresi). Struktur metodologi harus strictly deduktif menjawab 3 Research Questions dari Bab 1.",
      "implementation_status": "Implemented in MD (Pending sync to Word/PDF)",
      "evidence": "Subbab 3.5.3 (Effort Estimation) dihapus total dari naskah Markdown Bab 3."
    },
    {
      "id": "REV-03",
      "source": "Arahan Dosen Pengampu (Dr. Irwansyah Saputra, M.Kom.)",
      "date": "2026-10-12",
      "target_section": "Subbab 3.2 & Subbab 3.4 Formulasi Distilasi",
      "topic": "Kelayakan Lingkungan Eksperimen Komputasi",
      "directive": "Pastikan seluruh rancangan eksperimen distilasi pengetahuan dapat dieksekusi secara nyata pada lingkungan komputasi yang dapat diakses (misal Google Colab GPU T4 16 GB VRAM) tanpa mengalami out-of-memory (OOM).",
      "implementation_status": "Implemented in MD (Pending sync to Word/PDF)",
      "evidence": "Model Teacher dialihkan dari 7B ke DeepSeek-Coder-1.3B (FP16 Native, ~3 GB VRAM)."
    }
  ],
  "ai_advisory_alerts": [
    {
      "id": "ALT-01",
      "category": "Administratif",
      "severity": "High",
      "location": "Cover Bab 3 (Halaman 1)",
      "title": "Placeholder Judul Tesis Belum Terisi",
      "finding": "Pada cover Bab 3 tertulis '[ Tuliskan Judul Rencana Tesis S2 yang telah disetujui / direvisi pada Tugas 01 & 02 ]'.",
      "recommendation": "Ganti dengan judul resmi yang telah diajukan pada Bab 1: 'DETEKSI SELF-ADMITTED TECHNICAL DEBT MULTI ARTEFAK DOMAIN MENGGUNAKAN DISTILASI CODEBERT'.",
      "status": "Alert Active (Perlu edit di Word)"
    },
    {
      "id": "ALT-02",
      "category": "Administratif",
      "severity": "High",
      "location": "Cover Bab 3 (Halaman 1)",
      "title": "Typo Penulisan NIM Mahasiswa",
      "finding": "Pada cover Bab 3 tertulis NIM 14250028, sedangkan pada cover Bab 1 tertulis 1250028 (kelebihan angka '4').",
      "recommendation": "Hapus angka '4' di awal NIM menjadi 1250028 agar sinkron dengan Bab 1 dan sistem kampus.",
      "status": "Alert Active (Perlu edit di Word)"
    },
    {
      "id": "ALT-03",
      "category": "Konsistensi Teknis",
      "severity": "High",
      "location": "Subbab 3.2 Poin 5 (Halaman 7)",
      "title": "Kontradiksi Skala Parameter Teacher (7B vs 1.3B)",
      "finding": "Narasi di Halaman 7 masih menyebut 'Teacher berskala 7 miliar parameter', padahal Tabel 3.2 telah menggunakan DeepSeek-Coder-1.3B.",
      "recommendation": "Ubah teks di Halaman 7 menjadi 1,3 Miliar parameter agar selaras dengan Tabel 3.2.",
      "status": "Alert Active (Perlu edit di Word)"
    },
    {
      "id": "ALT-04",
      "category": "Sitasi & Bibliografi",
      "severity": "High",
      "location": "Subbab 3.5.1 Metrik (Halaman 16)",
      "title": "Paper Chicco et al. (2021) Hilang dari Daftar Pustaka",
      "finding": "Di teks disitir 'Chicco, Starovoitov, dan Jurman (2021) dalam IEEE Access...', tetapi rujukan [1]-[12] di PDF tidak mencantumkan paper ini.",
      "recommendation": "Tambahkan entri bibliografi Chicco et al. (2021) ke Daftar Pustaka file Word.",
      "status": "Alert Active (Perlu edit di Word)"
    },
    {
      "id": "ALT-05",
      "category": "Sitasi & Bibliografi",
      "severity": "Medium",
      "location": "Halaman 16 & Halaman 17",
      "title": "Salah Sasaran Nomor Sitasi ([5] dan [11])",
      "finding": "Sitasi AUC-PR menunjuk rujukan [5] (Melin et al., komputasi sains), dan domain sains menunjuk rujukan [11] (Gu et al., komentar Apache).",
      "recommendation": "Tukar dan luruskan nomor rujukan sitasi di naskah Word.",
      "status": "Alert Active (Perlu edit di Word)"
    },
    {
      "id": "ALT-06",
      "category": "Formula Matematika",
      "severity": "Medium",
      "location": "Subbab 3.4.1 (Halaman 11-12)",
      "title": "Formula Soft-Targets Terputus Margin",
      "finding": "Pembilang exp(z_k/T) terpotong batas bawah halaman, hanya menyisakan penyebut sum exp(z_j/T).",
      "recommendation": "Gunakan format formula Word Equation satu baris agar tidak terpecah ke halaman berikutnya.",
      "status": "Alert Active (Perlu edit di Word)"
    },
    {
      "id": "ALT-07",
      "category": "Formula Matematika",
      "severity": "Medium",
      "location": "Subbab 3.5.1 (Halaman 16)",
      "title": "Formula F1_macro dan Simbol Himpunan Bertumpuk",
      "finding": "Teks indeks bertumpuk 'k in F1macro = ...' dan simbol kurung kurawal himpunan '(k in 0, 1)' hilang.",
      "recommendation": "Pisahkan rumus kelas dan rumus macro menjadi dua baris independen dengan notasi k in {0, 1}.",
      "status": "Alert Active (Perlu edit di Word)"
    }
  ],
  "datasets": [
    {
      "code": "D1",
      "name": "Java Code Comments Benchmark",
      "source": "Maldonado & da Silva (IEEE SANER 2017) / Qu et al. (2023)",
      "rows": "62.275 baris",
      "file": "dataset/D1_code_comments.csv",
      "repo_url": "https://github.com/yikun-li/satd-different-sources-data",
      "status": "Downloaded (5.2 MB)"
    },
    {
      "code": "D2",
      "name": "Multi-Source Apache Artifacts Corpus",
      "source": "Li, Soliman, & Avgeriou, Springer EMSE (2023)",
      "rows": "17.000 baris",
      "file": "dataset/D2_commit_messages.csv, D2_issues.csv, D2_pull_requests.csv",
      "repo_url": "https://github.com/yikun-li/satd-different-sources-data",
      "status": "Downloaded (6.8 MB)"
    },
    {
      "code": "D3",
      "name": "Scientific Software Corpus (DOE/ORNL)",
      "source": "Melin et al., ACM PASC '26 (Oak Ridge National Lab)",
      "rows": "900.358 baris",
      "file": "dataset/D3_scientific_master.csv",
      "repo_url": "https://github.com/MelinHead225/PASC26-Replication-Package",
      "status": "Downloaded (22.0 MB)"
    },
    {
      "code": "D4",
      "name": "Implicit SATD Masked Test Suite",
      "source": "Sintesis Lokal (Zhuang, Qu, & Chen, JIT 2022)",
      "rows": "4.000 baris",
      "file": "dataset/D4_implicit_masked_test.csv",
      "repo_url": "dataset/generate_d4_masked.py",
      "status": "Generated (4k Balanced)"
    }
  ],
  "rq_mappings": [
    {
      "rq": "RQ1",
      "title": "Pengaruh Distilasi Pengetahuan terhadap Peningkatan Deteksi SATD",
      "question": "Bagaimana pengaruh penerapan distilasi pengetahuan pada arsitektur CodeBERT terhadap peningkatan kemampuan deteksi Self-Admitted Technical Debt dibandingkan model baseline?",
      "target": "Superioritas metrik F1-Macro, MCC, dan AUC-PR teruji secara statistik non-parametrik (Wilcoxon Signed-Rank Test p < 0.05, Cliff's Delta d > 0.33) terhadap TextCNN, BiLSTM, dan CodeBERT standar.",
      "corpus": "D1 (Comments), D2 (Multi-Source Apache), D3 (Scientific Software)"
    },
    {
      "rq": "RQ2",
      "title": "Efektivitas Deteksi SATD Implisit via Masking Kata Kunci",
      "question": "Sejauh mana Distilled CodeBERT efektif dalam mendeteksi Self-Admitted Technical Debt yang bersifat implisit ketika kata kunci eksplisit disamarkan atau dihilangkan?",
      "target": "Stabilitas skor F1-Macro dengan batas degradasi < 5% pada korpus D4 masked test suite (penyamaran token TODO, FIXME, HACK, WORKAROUND).",
      "corpus": "D4 (Implicit Masked Test Suite - 4.000 sampel seimbang)"
    },
    {
      "rq": "RQ3",
      "title": "Akurasi Deteksi dan Efisiensi Komputasi pada Skenario CI/CD",
      "question": "Bagaimana perbandingan kinerja Distilled CodeBERT dengan model pembanding ditinjau dari akurasi deteksi dan efisiensi komputasi pada skenario implementasi CI/CD?",
      "target": "Memenuhi kriteria latensi inferensi CPU single-core tau < 30 ms/komentar dan memori puncak M_peak < 500 MB RAM (Format ONNX Runtime CPU).",
      "corpus": "Simulasi Runner Lingkungan Intel Xeon 1 vCPU @ 2.4 GHz, RAM 4 GB"
    }
  ]
};

const REFERENCES_LIST = [
  { no: 1, author: "Abdu et al.", year: 2024, title: "Semantic and traditional feature fusion for software defect prediction using hybrid deep learning model", venue: "Scientific Reports (Nature Portfolio)", index: "Scopus Q1", file: "NatureSR2024_Software_Defect_Wilcoxon_Cliffs.pdf", status: "Verified" },
  { no: 2, author: "Chicco et al.", year: 2021, title: "The benefits of the Matthews correlation coefficient (MCC) over the DOR in binary classification assessment", venue: "IEEE Access", index: "Scopus Q1", file: "Chicco2021_MCC_vs_F1_IEEEAccess.pdf", status: "Verified" },
  { no: 3, author: "Gou et al.", year: 2021, title: "Knowledge distillation: A survey", venue: "International Journal of Computer Vision (Springer)", index: "Scopus Q1", file: "Gou2021_Knowledge_Distillation_Survey.pdf", status: "Verified" },
  { no: 4, author: "Gu et al.", year: 2024, title: "Self-admitted technical debts identification: How far are we?", venue: "IEEE SANER 2024", index: "Scopus Q1 / IEEE", file: "03_Guo2024_SATD_Identification_How_Far_Are_We.pdf", status: "Verified" },
  { no: 5, author: "Jayadianti et al.", year: 2022, title: "Sentiment analysis of Indonesian reviews using fine-tuning IndoBERT and R-CNN", venue: "ILKOM Jurnal Ilmiah", index: "SINTA 2", file: "ILKOM2022_BERT_FineTuning_Optimization.pdf", status: "Verified" },
  { no: 6, author: "Karelin et al.", year: 2026, title: "Technical debt quantification and its impact on software delivery performance: A cost-benefit analysis", venue: "American Impact Review", index: "Peer-Reviewed", file: "06_Karelin2026_TD_Quantification_Delivery_Impact.pdf", status: "Verified" },
  { no: 7, author: "Laaber et al.", year: 2021, title: "Predicting unstable software benchmarks using static source code features", venue: "Empirical Software Engineering (Springer)", index: "Scopus Q1", file: "SpringerEMSE2021_Software_Benchmark_Methodology.pdf", status: "Verified" },
  { no: 8, author: "Li et al.", year: 2023, title: "Automatic identification of self-admitted technical debt from four different sources", venue: "Empirical Software Engineering (Springer)", index: "Scopus Q1", file: "02_Li2023_Automatic_Identification_Four_Sources.pdf", status: "Verified" },
  { no: 9, author: "Melin et al.", year: 2026, title: "Multi-artifact analysis of self-admitted technical debt in scientific software", venue: "ACM PASC '26", index: "Scopus / ACM", file: "01_Melin2026_MultiArtifact_Scientific_Software.pdf", status: "Verified" },
  { no: 10, author: "Mounika et al.", year: 2024, title: "Machine learning-based prediction of technical debt in CI/CD pipelines", venue: "IJACSA", index: "Scopus / Peer", file: "09_Continuous_CICD_TD_Prediction.pdf", status: "Verified" },
  { no: 11, author: "Perez et al.", year: 2023, title: "The gap between admitted and measured technical debt: An empirical study", venue: "MDPI Applied Sciences", index: "Scopus Q2", file: "13_MDPI2023_Gap_Admitted_vs_Measured_TD.pdf", status: "Verified" },
  { no: 12, author: "Qashqari & Al-Hashedi", year: 2023, title: "Deep learning and natural language processing models for technical debt classification", venue: "IJECE", index: "SINTA 1 / Q2", file: "14_IJECE2023_SATD_Classification_Word_Embeddings.pdf", status: "Verified" },
  { no: 13, author: "Qu et al.", year: 2023, title: "Deep learning-based self-admitted technical debt detection: An empirical research", venue: "Journal of Information Technology (Sage)", index: "Scopus Q1", file: "07_JIT2023_Deep_Learning_SATD_Empirical_Research.pdf", status: "Verified" },
  { no: 14, author: "Sabbah & Hanani", year: 2023, title: "Self-admitted technical debt classification using natural language processing word embeddings", venue: "IJECE", index: "SINTA 1 / Q2", file: "IJECE2023_SINTA1_SATD_Classification_Embeddings.pdf", status: "Verified" },
  { no: 15, author: "Topalidi", year: 2026, title: "Self-admitted technical debt in modular open-source Ruby on Rails ecosystems", venue: "American Impact Review", index: "Peer-Reviewed", file: "04_Topalidi2026_SATD_Ruby_Rails.pdf", status: "Verified" },
  { no: 16, author: "Uddin et al.", year: 2022, title: "Software defect prediction employing BiLSTM and BERT-based semantic feature", venue: "Soft Computing (Springer)", index: "Scopus Q2", file: "Disitir via NatureSR [48]", status: "Verified" },
  { no: 17, author: "Wardani et al.", year: 2026, title: "Evaluating synonym augmentation impact on SBERT performance for Indonesian social media style classification", venue: "Kinetik", index: "SINTA 2", file: "Kinetik2026_SBERT_Transformer_Evaluation.pdf", status: "Verified" },
  { no: 18, author: "Xiao et al.", year: 2021, title: "Characterizing and mitigating self-admitted technical debt in build systems", venue: "IEEE Transactions on Software Engineering", index: "Scopus Q1 / IEEE", file: "05_IEEE_TSE2021_SATD_Characterizing_Mitigating.pdf", status: "Verified" },
  { no: 19, author: "Xu et al.", year: 2023, title: "Teacher-student collaborative knowledge distillation for image classification", venue: "Applied Intelligence (Springer)", index: "Scopus Q1", file: "Springer2022_Teacher_Student_Knowledge_Distillation.pdf", status: "Verified" },
  { no: 20, author: "Zhu, Yin, & Li", year: 2021, title: "Detecting and classifying self-admitted of technical debt with CNN-BiLSTM", venue: "Journal of Physics: Conf. Series", index: "Scopus / IOP", file: "11_IOP2022_Detecting_SATD_CNN_BiLSTM.pdf", status: "Verified" },
  { no: 21, author: "Zhuang, Qu, & Chen", year: 2022, title: "An empirical study of gradient-based explainability techniques for self-admitted technical debt detection", venue: "Journal of Information Technology", index: "Scopus Q1", file: "08_Zhuang2022_Explainability_Shortcut_Learning.pdf", status: "Verified" }
];

let appData = FALLBACK_DATA;

// Load Data
async function loadData() {
  try {
    const res = await fetch("data.json");
    if (res.ok) {
      appData = await res.json();
    }
  } catch (e) {
    console.info("Using embedded static data fallback (file:// protocol mode).");
  }
  renderAll();
}

function renderAll() {
  renderOfficialRevisions();
  renderAiAlerts();
  renderDiffCards();
  renderDatasets();
  renderReferences();
  renderRQs();
}

// 1. Render Official Revisions (Dosen)
function renderOfficialRevisions() {
  const container = document.getElementById("official-revisions-container");
  if (!container) return;

  container.innerHTML = "";
  appData.official_revisions.forEach(rev => {
    const card = document.createElement("div");
    card.className = "revision-card";
    card.innerHTML = `
      <div class="revision-header">
        <div class="revision-topic">
          <span class="id-badge">${rev.id}</span>
          <span>${rev.topic}</span>
        </div>
        <div class="revision-meta">
          <i class="ti ti-calendar"></i> ${rev.date} &bull; <i class="ti ti-user-check"></i> ${rev.source}
        </div>
      </div>
      <div style="font-size:12.5px; color:#64748b; margin-bottom:8px;">
        <strong>Target Bagian:</strong> <code>${rev.target_section}</code>
      </div>
      <div class="revision-directive">
        <strong>Arahan Dosen:</strong><br>${rev.directive}
      </div>
      <div class="revision-evidence-box">
        <strong><i class="ti ti-check"></i> Bukti Implementasi Naskah:</strong><br>${rev.evidence}
      </div>
    `;
    container.appendChild(card);
  });
}

// 2. Render AI Alerts Table
function renderAiAlerts() {
  const tbody = document.getElementById("ai-alerts-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  appData.ai_advisory_alerts.forEach(item => {
    const tr = document.createElement("tr");
    const sevClass = item.severity === "High" ? "tag-sev-high" : (item.severity === "Medium" ? "tag-sev-med" : "tag-sev-low");

    tr.innerHTML = `
      <td><span class="id-badge">${item.id}</span></td>
      <td><strong>${item.location}</strong></td>
      <td><span style="font-size:12px; color:#475569;">${item.category}</span></td>
      <td>
        <div style="font-weight:600; margin-bottom:4px; color:#0f172a;">${item.title}</div>
        <div style="font-size:12.5px; color:#64748b; margin-bottom:4px;"><strong>Temuan:</strong> ${item.finding}</div>
        <div style="font-size:12px; color:#047857;"><strong>Saran AI:</strong> ${item.recommendation}</div>
      </td>
      <td><span class="tag-severity ${sevClass}">${item.severity}</span></td>
      <td><span class="status-badge status-open"><i class="ti ti-alert-triangle"></i> ${item.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// 3. Render Diff Cards
function renderDiffCards() {
  const container = document.getElementById("diff-cards-container");
  if (!container) return;

  container.innerHTML = "";
  appData.ai_advisory_alerts.forEach(item => {
    const card = document.createElement("div");
    card.className = "diff-card";
    card.innerHTML = `
      <div class="diff-card-header">
        <div class="diff-title">
          <span class="id-badge">${item.id}</span>
          <span>${item.location} &bull; ${item.title}</span>
        </div>
        <span class="status-badge status-open">${item.status}</span>
      </div>
      <div class="diff-grid">
        <div class="diff-pane diff-pane-old">
          <span class="diff-label">&minus; Kondisi Draft Lama (PDF)</span>
          ${item.finding}
        </div>
        <div class="diff-pane diff-pane-new">
          <span class="diff-label">&plus; Rekomendasi Solusi & Naskah Baru</span>
          ${item.recommendation}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 4. Render Datasets
function renderDatasets() {
  const grid = document.getElementById("dataset-grid-container");
  if (!grid) return;

  grid.innerHTML = "";
  appData.datasets.forEach(d => {
    const card = document.createElement("div");
    card.className = "dataset-card";
    card.innerHTML = `
      <div>
        <div class="dataset-header">
          <span class="dataset-code">${d.code}</span>
          <span class="dataset-rows">${d.rows}</span>
        </div>
        <div class="dataset-name">${d.name}</div>
        <div class="dataset-source">${d.source}</div>
      </div>
      <div class="dataset-footer">
        <span class="dataset-file">${d.file}</span>
        <a href="${d.repo_url}" target="_blank" class="dataset-link">
          <span>Akses Repo</span> <i class="ti ti-arrow-up-right"></i>
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 5. Render References
function renderReferences(query = "") {
  const tbody = document.getElementById("ref-table-body");
  if (!tbody) return;

  const q = query.toLowerCase();
  const filtered = REFERENCES_LIST.filter(r => {
    return r.author.toLowerCase().includes(q) ||
           r.title.toLowerCase().includes(q) ||
           r.index.toLowerCase().includes(q) ||
           r.venue.toLowerCase().includes(q);
  });

  tbody.innerHTML = "";
  filtered.forEach(r => {
    const tr = document.createElement("tr");
    let badgeClass = "badge-peer";
    if (r.index.includes("Q1")) badgeClass = "badge-q1";
    else if (r.index.includes("Q2")) badgeClass = "badge-q2";
    else if (r.index.includes("SINTA 1")) badgeClass = "badge-s1";
    else if (r.index.includes("SINTA 2")) badgeClass = "badge-s2";

    tr.innerHTML = `
      <td>${r.no}</td>
      <td><strong>${r.author}</strong> <span style="color:#64748b; font-size:12px;">(${r.year})</span></td>
      <td>
        <div style="font-weight:600; color:#0f172a; margin-bottom:2px;">${r.title}</div>
        <div style="font-size:12px; color:#64748b;">${r.venue}</div>
      </td>
      <td><span class="badge-index ${badgeClass}">${r.index}</span></td>
      <td><code style="font-family:var(--font-mono); font-size:11.5px; color:#334155;">${r.file}</code></td>
      <td><span class="status-badge status-resolved"><i class="ti ti-check"></i> ${r.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// 6. Render RQs
function renderRQs() {
  const container = document.getElementById("rq-cards-container");
  if (!container) return;

  container.innerHTML = "";
  appData.rq_mappings.forEach(rq => {
    const card = document.createElement("div");
    card.className = "rq-card";
    card.innerHTML = `
      <span class="rq-code-pill">${rq.rq}</span>
      <div class="rq-card-title">${rq.title}</div>
      <div class="rq-card-question">${rq.question}</div>
      <div class="rq-target-box">
        <strong>Ambang Batas Keberhasilan:</strong><br>${rq.target}
      </div>
      <div class="rq-corpus-line">
        <i class="ti ti-database"></i> Korpus Uji: ${rq.corpus}
      </div>
    `;
    container.appendChild(card);
  });
}

// Tab Switching
document.querySelectorAll(".nav-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    const target = tab.getAttribute("data-tab");
    const pane = document.getElementById(target);
    if (pane) pane.classList.add("active");
  });
});

// Search Filter
const searchInput = document.getElementById("ref-search-input");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    renderReferences(e.target.value);
  });
}

// Initialize
loadData();

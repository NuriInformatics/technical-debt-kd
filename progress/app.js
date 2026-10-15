// Clean, Intuitive Academic Dashboard Controller
// Single-source loading: data.json + references.json

let appData = {
  thesis: {},
  metrics: {},
  rq_mappings: [],
  datasets: [],
  draft_audit_alerts: []
};

let referencesData = [];
let activeRefCategory = 'all';
let currentSearchQuery = '';

// Load data on startup
async function initDashboard() {
  await Promise.all([loadAppData(), loadReferences()]);
  renderAllViews();
}

// 1. Load Data JSON
async function loadAppData() {
  try {
    const res = await fetch("data.json");
    if (res.ok) {
      appData = await res.json();
    }
  } catch (err) {
    console.info("Using inline fallback for data.json (file:// mode).");
  }
}

// 2. Load References from references.json
async function loadReferences() {
  try {
    // Try local references.json first (symlink in progress/), then ../references.json
    let res = await fetch("references.json").catch(() => fetch("../references.json"));
    if (res && res.ok) {
      referencesData = await res.json();
      return;
    }
  } catch (e) {
    console.info("Fetch references.json failed, checking fallback.");
  }

  // Embedded fallback for offline/file:// protocol mode
  if (referencesData.length === 0) {
    referencesData = [
      { no: 1, author: "Abdu et al.", year: 2024, title: "Semantic and traditional feature fusion for software defect prediction using hybrid deep learning model", venue: "Scientific Reports (Nature Portfolio)", index: "Scopus Q1", file: "NatureSR2024_Software_Defect_Wilcoxon_Cliffs.pdf", role: "Uji Statistika Wilcoxon & Cliff's Delta" },
      { no: 2, author: "Chicco et al.", year: 2021, title: "The benefits of the Matthews correlation coefficient (MCC) over the DOR in binary classification assessment", venue: "IEEE Access", index: "Scopus Q1", file: "Chicco2021_MCC_vs_F1_IEEEAccess.pdf", role: "Landasan Teori Metrik Evaluasi MCC" },
      { no: 3, author: "Gou et al.", year: 2021, title: "Knowledge distillation: A survey", venue: "International Journal of Computer Vision (Springer)", index: "Scopus Q1", file: "Gou2021_Knowledge_Distillation_Survey.pdf", role: "Teori Distilasi Pengetahuan (Soft-Logits & Suhu)" },
      { no: 4, author: "Gu et al.", year: 2024, title: "Self-admitted technical debts identification: How far are we?", venue: "IEEE SANER 2024", index: "Scopus Q1", file: "03_Guo2024_SATD_Identification_How_Far_Are_We.pdf", role: "Keterbatasan Kata Kunci & Shortcut Learning" },
      { no: 5, author: "Jayadianti et al.", year: 2022, title: "Sentiment analysis of Indonesian reviews using fine-tuning IndoBERT and R-CNN", venue: "ILKOM Jurnal Ilmiah", index: "SINTA 2", file: "ILKOM2022_BERT_FineTuning_Optimization.pdf", role: "Optimasi Fine-Tuning Transformer" },
      { no: 6, author: "Karelin et al.", year: 2026, title: "Technical debt quantification and its impact on software delivery performance", venue: "American Impact Review", index: "Peer-Reviewed", file: "06_Karelin2026_TD_Quantification_Delivery_Impact.pdf", role: "Dampak Utang Teknis pada Biaya Pemeliharaan" },
      { no: 7, author: "Laaber et al.", year: 2021, title: "Predicting unstable software benchmarks using static source code features", venue: "Empirical Software Engineering (Springer)", index: "Scopus Q1", file: "SpringerEMSE2021_Software_Benchmark_Methodology.pdf", role: "Metodologi Isolasi Cross-Project Data Splitting" },
      { no: 8, author: "Li et al.", year: 2023, title: "Automatic identification of self-admitted technical debt from four different sources", venue: "Empirical Software Engineering (Springer)", index: "Scopus Q1", file: "02_Li2023_Automatic_Identification_Four_Sources.pdf", role: "Penyedia Dataset D2 Multi-Artefak Apache" },
      { no: 9, author: "Melin et al.", year: 2026, title: "Multi-artifact analysis of self-admitted technical debt in scientific software", venue: "ACM PASC '26", index: "Scopus / ACM", file: "01_Melin2026_MultiArtifact_Scientific_Software.pdf", role: "Penyedia Dataset D3 Software Ilmiah DOE/ORNL" },
      { no: 10, author: "Mounika et al.", year: 2024, title: "Machine learning-based prediction of technical debt in CI/CD pipelines", venue: "IJACSA", index: "Peer-Reviewed", file: "09_Continuous_CICD_TD_Prediction.pdf", role: "Integrasi Model pada Pipeline CI/CD" },
      { no: 11, author: "Perez et al.", year: 2023, title: "The gap between admitted and measured technical debt: An empirical study", venue: "MDPI Applied Sciences", index: "Scopus Q2", file: "13_MDPI2023_Gap_Admitted_vs_Measured_TD.pdf", role: "Kesenjangan Antara Admitted TD dan Measured TD" },
      { no: 12, author: "Qashqari & Al-Hashedi", year: 2023, title: "Deep learning and natural language processing models for technical debt classification", venue: "IJECE", index: "SINTA 1 / Q2", file: "14_IJECE2023_SATD_Classification_Word_Embeddings.pdf", role: "Baseline Pembanding NLP Klasifikasi SATD" },
      { no: 13, author: "Qu et al.", year: 2023, title: "Deep learning-based self-admitted technical debt detection: An empirical research", venue: "Journal of Information Technology (Sage)", index: "Scopus Q1", file: "07_JIT2023_Deep_Learning_SATD_Empirical_Research.pdf", role: "Baseline CodeBERT & Benchmark D1 Comments" },
      { no: 14, author: "Sabbah & Hanani", year: 2023, title: "Self-admitted technical debt classification using natural language processing word embeddings", venue: "IJECE", index: "SINTA 1 / Q2", file: "IJECE2023_SINTA1_SATD_Classification_Embeddings.pdf", role: "Baseline Vektor Kata & BiLSTM pada SATD" },
      { no: 15, author: "Topalidi", year: 2026, title: "Self-admitted technical debt in modular open-source Ruby on Rails ecosystems", venue: "American Impact Review", index: "Peer-Reviewed", file: "04_Topalidi2026_SATD_Ruby_Rails.pdf", role: "Generalisasi Analisis SATD Lintas Ekosistem" },
      { no: 16, author: "Uddin et al.", year: 2022, title: "Software defect prediction employing BiLSTM and BERT-based semantic feature", venue: "Soft Computing (Springer)", index: "Scopus Q2", file: "Disitir via NatureSR [48]", role: "Arsitektur Hibrida Semantik BiLSTM" },
      { no: 17, author: "Wardani et al.", year: 2026, title: "Evaluating synonym augmentation impact on SBERT performance for Indonesian social media style classification", venue: "Kinetik", index: "SINTA 2", file: "Kinetik2026_SBERT_Transformer_Evaluation.pdf", role: "Evaluasi Representasi Semantik Transformer" },
      { no: 18, author: "Xiao et al.", year: 2021, title: "Characterizing and mitigating self-admitted technical debt in build systems", venue: "IEEE Transactions on Software Engineering", index: "Scopus Q1", file: "05_IEEE_TSE2021_SATD_Characterizing_Mitigating.pdf", role: "Karakterisasi SATD pada Build System" },
      { no: 19, author: "Xu et al.", year: 2023, title: "Teacher-student collaborative knowledge distillation for image classification", venue: "Applied Intelligence (Springer)", index: "Scopus Q1", file: "Springer2022_Teacher_Student_Knowledge_Distillation.pdf", role: "Formulasi Joint Loss Teacher-Student" },
      { no: 20, author: "Zhu et al.", year: 2021, title: "Detecting and classifying self-admitted of technical debt with CNN-BiLSTM", venue: "Journal of Physics: Conf. Series", index: "Scopus / IOP", file: "11_IOP2022_Detecting_SATD_CNN_BiLSTM.pdf", role: "Spesifikasi Baseline CNN-BiLSTM" },
      { no: 21, author: "Zhuang et al.", year: 2022, title: "An empirical study of gradient-based explainability techniques for self-admitted technical debt detection", venue: "Journal of Information Technology", index: "Scopus Q1", file: "08_Zhuang2022_Explainability_Shortcut_Learning.pdf", role: "Atribusi Gradien & Desain Korpus D4 Masked" }
    ];
  }
}

// 3. Render Views
function renderAllViews() {
  renderRQs();
  renderDatasets();
  renderReferencesList();
  renderAlerts();

  // Update counts
  const refCount = referencesData.length;
  const statElem = document.getElementById("ref-count-stat");
  const tabElem = document.getElementById("tab-ref-count");
  if (statElem) statElem.textContent = refCount;
  if (tabElem) tabElem.textContent = refCount;
}

// Render Tab 1: Research Questions
function renderRQs() {
  const container = document.getElementById("rq-container");
  if (!container || !appData.rq_mappings) return;

  container.innerHTML = "";
  appData.rq_mappings.forEach(item => {
    const card = document.createElement("div");
    card.className = "rq-card";
    card.innerHTML = `
      <div class="rq-top">
        <span class="rq-badge"><i class="ti ti-target"></i> ${item.rq}</span>
        <span class="rq-tag">${item.tag}</span>
      </div>
      <h3 class="rq-main-title">${item.title}</h3>
      <div class="rq-question-box">
        <strong>Rumusan Masalah:</strong><br>
        &ldquo;${item.question}&rdquo;
      </div>
      <div class="rq-specs-grid">
        <div class="rq-spec-item">
          <strong>Target Metrik</strong>
          <span>${item.metric}</span>
        </div>
        <div class="rq-spec-item">
          <strong>Metode Validasi</strong>
          <span>${item.test}</span>
        </div>
        <div class="rq-spec-item">
          <strong>Model Pembanding</strong>
          <span>${item.baseline}</span>
        </div>
        <div class="rq-spec-item">
          <strong>Korpus Evaluasi</strong>
          <span>${item.corpus}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Tab 2: Datasets
function renderDatasets() {
  const container = document.getElementById("dataset-container");
  if (!container || !appData.datasets) return;

  container.innerHTML = "";
  appData.datasets.forEach(d => {
    const card = document.createElement("div");
    card.className = "dataset-card";
    card.innerHTML = `
      <div>
        <div class="dataset-head">
          <span class="dataset-chip">${d.code}</span>
          <span class="dataset-count">${d.rows}</span>
        </div>
        <h3 class="dataset-title">${d.name}</h3>
        <p class="dataset-source">${d.source}</p>
      </div>
      <div class="dataset-bottom">
        <div class="dataset-file-info">
          <code>${d.file}</code> &bull; ${d.size}
        </div>
        <a href="${d.repo_url}" target="_blank" class="dataset-btn">
          <span>Lihat Repo</span> <i class="ti ti-arrow-up-right"></i>
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Tab 3: References List from JSON
function renderReferencesList() {
  const container = document.getElementById("reference-list-container");
  if (!container) return;

  const query = currentSearchQuery.toLowerCase().trim();
  const filtered = referencesData.filter(r => {
    // Filter Category
    let matchCategory = true;
    if (activeRefCategory === 'Q1') matchCategory = r.index.includes('Q1');
    else if (activeRefCategory === 'Q2') matchCategory = r.index.includes('Q2');
    else if (activeRefCategory === 'SINTA') matchCategory = r.index.includes('SINTA');

    if (!matchCategory) return false;

    // Search query
    if (!query) return true;
    return r.author.toLowerCase().includes(query) ||
           r.title.toLowerCase().includes(query) ||
           r.venue.toLowerCase().includes(query) ||
           r.index.toLowerCase().includes(query) ||
           (r.role && r.role.toLowerCase().includes(query));
  });

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:32px; text-align:center; color:#64748b;">
        <i class="ti ti-search-off" style="font-size:32px; display:block; margin-bottom:8px;"></i>
        Tidak ada referensi yang cocok dengan kata kunci "<strong>${currentSearchQuery}</strong>".
      </div>
    `;
    return;
  }

  filtered.forEach(r => {
    const item = document.createElement("div");
    item.className = "ref-item";

    let indexBadgeClass = "index-peer";
    if (r.index.includes("Q1")) indexBadgeClass = "index-q1";
    else if (r.index.includes("Q2")) indexBadgeClass = "index-q2";
    else if (r.index.includes("SINTA")) indexBadgeClass = "index-sinta";

    item.innerHTML = `
      <span class="ref-num">[${r.no}]</span>
      <div class="ref-body">
        <div class="ref-headline">
          <span class="ref-author">${r.author}</span>
          <span class="ref-year">(${r.year})</span>
          <span class="ref-index-badge ${indexBadgeClass}">${r.index}</span>
        </div>
        <div class="ref-paper-title">&ldquo;${r.title}&rdquo;</div>
        <div class="ref-meta-row">
          <span><i class="ti ti-building"></i> ${r.venue}</span>
          <span><i class="ti ti-file-text"></i> <code>${r.file}</code></span>
          ${r.role ? `<span style="color:#059669;"><i class="ti ti-bulb"></i> ${r.role}</span>` : ''}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Search handler
function onSearchRefs(val) {
  currentSearchQuery = val;
  renderReferencesList();
}

// Category filter handler
function filterCategory(cat, btn) {
  activeRefCategory = cat;
  document.querySelectorAll("#filter-pills .pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  renderReferencesList();
}

// Render Tab 4: Checklist Perbaikan Draf (Audit AI)
function renderAlerts() {
  const container = document.getElementById("alerts-container");
  if (!container || !appData.draft_audit_alerts) return;

  container.innerHTML = "";
  appData.draft_audit_alerts.forEach(item => {
    const card = document.createElement("div");
    card.className = "check-card";
    const sevClass = item.severity === "Penting" ? "sev-penting" : "sev-sedang";

    card.innerHTML = `
      <div class="check-box-icon">
        <i class="ti ti-pencil"></i>
      </div>
      <div class="check-content">
        <div class="check-header">
          <span class="check-id">${item.id}</span>
          <span class="check-loc">${item.location}</span>
          <span class="check-sev ${sevClass}">${item.severity}</span>
        </div>
        <h4 class="check-title">${item.title}</h4>
        <div class="check-diff-grid">
          <div class="diff-box-problem">
            <span class="diff-tag-label"><i class="ti ti-alert-circle"></i> Kondisi di Draf PDF:</span>
            ${item.problem}
          </div>
          <div class="diff-box-solution">
            <span class="diff-tag-label"><i class="ti ti-check"></i> Saran Perbaikan di Word:</span>
            ${item.solution}
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Tab Switching
function switchTab(tabId) {
  // Update buttons
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  // Update views
  document.querySelectorAll(".tab-view").forEach(view => {
    view.classList.toggle("active", view.id === tabId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", initDashboard);

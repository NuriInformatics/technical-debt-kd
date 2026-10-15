// Progress & Audit Dashboard Script

const INITIAL_TASKS = [
  {
    id: 1,
    category: "Administrasi",
    title: "Isi Placeholder Judul Rencana Tesis S2 di Halaman 1",
    detail: "Pada PDF Halaman 1 masih tertulis template: '[ Tuliskan Judul Rencana Tesis S2... ]'. Ganti dengan: 'Deteksi Utang Teknis Implisit dan Ringan pada Pipeline CI/CD Menggunakan Distilasi CodeBERT'.",
    severity: "High",
    done: false
  },
  {
    id: 2,
    category: "Administrasi",
    title: "Koreksi Inkonsistensi NIM Mahasiswa",
    detail: "Pada cover Bab 3 tertulis NIM 14250028, sedangkan pada naskah Bab 1 tertulis 1250028. Sesuaikan dengan NIM resmi di sistem kampus.",
    severity: "High",
    done: false
  },
  {
    id: 3,
    category: "Teknis",
    title: "Sinkronisasi Parameter Model Teacher (7B -> 1.3B)",
    detail: "Pada Subbab 3.2 (Pipeline Komputasi poin 5) masih tertulis Teacher berskala 7 miliar parameter. Ubah menjadi 1,3 Miliar parameter (deepseek-ai/deepseek-coder-1.3b-instruct) agar konsisten dengan Tabel 3.2 dan kompatibel dengan VRAM Colab T4.",
    severity: "High",
    done: false
  },
  {
    id: 4,
    category: "Sitasi",
    title: "Tambahkan Chicco et al. (2021) ke Daftar Pustaka Word",
    detail: "Di Halaman 16 naskah disitir: 'Berdasarkan pembuktian matematis Chicco, Starovoitov, dan Jurman (2021) dalam IEEE Access...', namun di Daftar Pustaka PDF tidak ada rujukannya. Masukkan rujukan lengkap IEEE Access Chicco et al. (2021).",
    severity: "High",
    done: false
  },
  {
    id: 5,
    category: "Sitasi",
    title: "Perbaiki Mismatched Citation [5] dan [11] di Teks",
    detail: "Sitasi AUC-PR merujuk [5] (Melin et al., sains), seharusnya merujuk literatur evaluasi. Sitasi domain komputasi sains merujuk [11] (Gu et al., komentar Apache), seharusnya merujuk [5] (Melin et al.).",
    severity: "Medium",
    done: false
  },
  {
    id: 6,
    category: "Formula",
    title: "Perbaiki Render Formula Matematika Soft-Targets di Hal. 11",
    detail: "Rumus q_k(T) terpotong pembilangnya saat diexport ke PDF, hanya tersisa penyebut sum exp(z/T). Gunakan format formula Word equation inline tanpa multi-level bertumpuk.",
    severity: "Medium",
    done: false
  },
  {
    id: 7,
    category: "Formula",
    title: "Perbaiki Rumus F1_macro dan Simbol Kurung Kurawal Himpunan",
    detail: "Halaman 12 simbol kurung kurawal himpunan hilang: '(k in 0, 1)' menjadi '(k in {0, 1})'. Halaman 16 rumus F1_macro bertumpuk teks indeksnya.",
    severity: "Medium",
    done: false
  },
  {
    id: 8,
    category: "Administrasi",
    title: "Lengkapi Nomor Urut Tabel 3.2 dan Tabel 3.3",
    detail: "Halaman 14 tabel konfigurasi hyperparameter belum memiliki label 'Tabel 3.2'. Halaman 18 tabel spesifikasi perangkat keras belum memiliki label 'Tabel 3.3'.",
    severity: "Low",
    done: false
  },
  {
    id: 9,
    category: "Teknis",
    title: "Verifikasi Script Sintesis Dataset D4 (generate_d4_masked.py)",
    detail: "Pastikan script sintesis dataset D4 menghasilkan 4.000 sampel seimbang dengan token penyamaran [MASK] pada keyword TODO/FIXME/HACK.",
    severity: "Low",
    done: true
  },
  {
    id: 10,
    category: "Sitasi",
    title: "Verifikasi Kelengkapan 23 File PDF Fisik di Folder references/",
    detail: "Seluruh 21 rujukan pustaka wajib memiliki file PDF asli di repository lokal untuk antisipasi permintaan penguji saat sidang.",
    severity: "High",
    done: true
  }
];

const INITIAL_HISTORY = [
  {
    id: 1,
    date: "2026-10-16",
    section: "Cover Bab 3 (Hal. 1)",
    type: "Placeholder",
    badgeClass: "badge-typo",
    title: "Placeholder Judul Tesis Belum Diisi",
    before: "[ Tuliskan Judul Rencana Tesis S2 yang telah disetujui / direvisi pada Tugas 01 & 02 ]",
    after: "Deteksi Utang Teknis Implisit dan Ringan pada Pipeline CI/CD Menggunakan Distilasi CodeBERT",
    status: "Identified in PDF",
    statusClass: "status-identified",
    note: "Tercatat dari hasil audit PDF. Menunggu revisi file DOCX."
  },
  {
    id: 2,
    date: "2026-10-16",
    section: "Cover Bab 3 (Hal. 1)",
    type: "Typo NIM",
    badgeClass: "badge-typo",
    title: "Inkonsistensi NIM Mahasiswa (Kelebihan Digit)",
    before: "Nomor Induk Mahasiswa (NIM): 14250028",
    after: "Nomor Induk Mahasiswa (NIM): 1250028",
    status: "Identified in PDF",
    statusClass: "status-identified",
    note: "Menyesuaikan dengan NIM resmi pada Bab 1 dan sistem pascasarjana."
  },
  {
    id: 3,
    date: "2026-10-16",
    section: "Subbab 3.2 Pipeline (Hal. 7)",
    type: "Contradiction",
    badgeClass: "badge-contradiction",
    title: "Kontradiksi Skala Parameter Teacher (7B vs 1.3B)",
    before: "Model Teacher berskala 7 miliar parameter menghasilkan vektor logit...",
    after: "Model Teacher deepseek-ai/deepseek-coder-1.3b-instruct (1,3 Miliar parameter)...",
    status: "Fixed in MD",
    statusClass: "status-fixed",
    note: "Disesuaikan agar muat pada VRAM GPU T4 16 GB tanpa error OOM."
  },
  {
    id: 4,
    date: "2026-10-16",
    section: "Subbab 3.5.1 Metrik (Hal. 16)",
    type: "Missing Ref",
    badgeClass: "badge-missing",
    title: "Sitasi Chicco et al. (2021) IEEE Access Belum Ada di Daftar Pustaka",
    before: "Disitir di naskah namun rujukan [1]-[12] di PDF tidak memuat entri pustaka Chicco",
    after: "Entri lengkap Chicco, Starovoitov, & Jurman (2021) dimasukkan ke naskah",
    status: "Fixed in MD",
    statusClass: "status-fixed",
    note: "File PDF Chicco2021_MCC_vs_F1_IEEEAccess.pdf sudah diamankan di /references."
  },
  {
    id: 5,
    date: "2026-10-16",
    section: "Subbab 3.4.1 Formula (Hal. 11)",
    type: "Broken Math",
    badgeClass: "badge-broken",
    title: "Formula Soft-Targets Terpotong Margin Saat Render PDF",
    before: "Hanya menyisakan penyebut sum exp(z/T), pembilang terpotong",
    after: "Diformulasi ulang dalam notasi Word Equation inline aman margin",
    status: "Fixed in MD",
    statusClass: "status-fixed",
    note: "Telah divalidasi tidak memecah layout paragraf."
  },
  {
    id: 6,
    date: "2026-10-16",
    section: "Subbab 3.5.3 Evaluasi",
    type: "Scope Cut",
    badgeClass: "badge-scope",
    title: "Penghapusan Subbab Estimasi Effort Software Engineering",
    before: "Memuat subbab Effort Estimation (metrik regresi waktu/biaya)",
    after: "Dihapus total atas arahan dosen (fokus riset adalah defect prediction biner)",
    status: "Fixed in MD",
    statusClass: "status-fixed",
    note: "Diarahkan oleh Dr. Irwansyah Saputra, M.Kom."
  }
];

const INITIAL_NOTES = [
  {
    id: 1,
    date: "2026-10-12",
    author: "Dr. Irwansyah Saputra, M.Kom.",
    content: "1. Metodologi harus deduktif dan strictly menjawab 3 Research Questions dari Bab 1.\n2. Pastikan eksperimen realistis dapat dieksekusi di GPU Google Colab T4 tanpa VRAM OOM.\n3. Hapus subbab estimasi effort karena penelitian ini berfokus pada prediksi cacat (klasifikasi biner), bukan estimasi durasi rekayasa (regresi)."
  },
  {
    id: 2,
    date: "2026-10-14",
    author: "Catatan Bimbingan Metodologi",
    content: "Gunakan metrik evaluasi yang kebal class imbalance (MCC dan Macro-F1). Uji signifikansi wajib non-parametrik (Wilcoxon Signed-Rank Test & Cliff's Delta) karena sebaran metrik software engineering tidak berdistribusi normal."
  }
];

const REFERENCES_DATA = [
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

// App State
let tasks = JSON.parse(localStorage.getItem("thesis_tasks")) || INITIAL_TASKS;
let notes = JSON.parse(localStorage.getItem("thesis_notes")) || INITIAL_NOTES;
let historyData = INITIAL_HISTORY;
let currentFilter = "all";

// DOM Elements
const taskListContainer = document.getElementById("task-list-container");
const historyTimelineContainer = document.getElementById("history-timeline-container");
const searchHistory = document.getElementById("search-history");
const taskStatCount = document.getElementById("task-stat-count");
const taskStatDesc = document.getElementById("task-stat-desc");
const countAll = document.getElementById("count-all");
const countPending = document.getElementById("count-pending");
const countDone = document.getElementById("count-done");
const notesContainer = document.getElementById("notes-container");
const refTableBody = document.getElementById("ref-table-body");
const searchRef = document.getElementById("search-ref");
const timestampEl = document.getElementById("timestamp");

// Initialize Clock
function updateClock() {
  const now = new Date();
  timestampEl.innerHTML = `<i class="ti ti-calendar"></i> ` + now.toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "short", day: "numeric"
  });
}
updateClock();

// Tab Navigation
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.getAttribute("data-tab");
    document.getElementById(target).classList.add("active");
  });
});

// Render Tasks
function renderTasks() {
  const filtered = tasks.filter(t => {
    if (currentFilter === "pending") return !t.done;
    if (currentFilter === "done") return t.done;
    return true;
  });

  const total = tasks.length;
  const doneCount = tasks.filter(t => t.done).length;
  const pendingCount = total - doneCount;

  countAll.textContent = total;
  countPending.textContent = pendingCount;
  countDone.textContent = doneCount;

  taskStatCount.textContent = `${doneCount} / ${total}`;
  taskStatDesc.innerHTML = `<i class="ti ti-info-circle"></i> ${pendingCount} revisi/task masih terbuka`;

  taskListContainer.innerHTML = "";
  if (filtered.length === 0) {
    taskListContainer.innerHTML = `<div style="text-align:center; padding:30px; color:#64748b;"><i class="ti ti-inbox" style="font-size:2em;"></i><br>Tidak ada task pada filter ini.</div>`;
    return;
  }

  filtered.forEach(t => {
    const item = document.createElement("div");
    item.className = `task-item ${t.done ? "done" : ""}`;
    const tagClass = `tag-${t.category.toLowerCase().replace(/[^a-z]/g, "")}`;

    item.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${t.done ? "checked" : ""} data-id="${t.id}">
      <div class="task-content">
        <div class="task-title">${t.title}</div>
        <div class="task-detail">${t.detail}</div>
        <div class="task-meta">
          <span class="tag ${tagClass}"><i class="ti ti-tag"></i> ${t.category}</span>
          <span class="tag ${t.severity === 'High' ? 'tag-severity-high' : 'tag-admin'}"><i class="ti ti-flag"></i> ${t.severity} Priority</span>
        </div>
      </div>
      <button class="btn-del-task" title="Hapus Task" data-id="${t.id}"><i class="ti ti-trash"></i></button>
    `;
    taskListContainer.appendChild(item);
  });

  // Attach Checkbox Events
  document.querySelectorAll(".task-checkbox").forEach(cb => {
    cb.addEventListener("change", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const targetTask = tasks.find(x => x.id === id);
      if (targetTask) {
        targetTask.done = e.target.checked;
        saveTasks();
        renderTasks();
      }
    });
  });

  // Attach Delete Events
  document.querySelectorAll(".btn-del-task").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.closest("button").getAttribute("data-id"));
      tasks = tasks.filter(x => x.id !== id);
      saveTasks();
      renderTasks();
    });
  });
}

function saveTasks() {
  localStorage.setItem("thesis_tasks", JSON.stringify(tasks));
}

// Filter Task Buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    renderTasks();
  });
});

// Add New Task
document.getElementById("add-task-btn").addEventListener("click", () => {
  const input = document.getElementById("new-task-input");
  const cat = document.getElementById("new-task-cat");
  const val = input.value.trim();
  if (!val) return;

  const newTask = {
    id: Date.now(),
    category: cat.value,
    title: val,
    detail: "Catatan tambahan manual dari dashboard lokal.",
    severity: "Medium",
    done: false
  };
  tasks.unshift(newTask);
  saveTasks();
  input.value = "";
  renderTasks();
});

// Render History
function renderHistory(filterText = "") {
  const q = filterText.toLowerCase();
  const filtered = historyData.filter(h => {
    return h.title.toLowerCase().includes(q) ||
           h.section.toLowerCase().includes(q) ||
           h.type.toLowerCase().includes(q) ||
           h.before.toLowerCase().includes(q) ||
           h.after.toLowerCase().includes(q);
  });

  historyTimelineContainer.innerHTML = "";
  if (filtered.length === 0) {
    historyTimelineContainer.innerHTML = `<div style="text-align:center; padding:30px; color:#64748b;">Tidak ada data history yang cocok.</div>`;
    return;
  }

  filtered.forEach(h => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <div class="history-card-header">
        <div class="history-meta-left">
          <span class="history-date"><i class="ti ti-calendar-event"></i> ${h.date}</span>
          <span class="history-type-badge ${h.badgeClass}">${h.type}</span>
          <span style="font-size:12px; color:#64748b;"><i class="ti ti-map-pin"></i> ${h.section}</span>
        </div>
        <span class="history-status-badge ${h.statusClass}"><i class="ti ti-circle-check"></i> ${h.status}</span>
      </div>
      <div class="history-title">${h.title}</div>
      <div class="history-diff-box">
        <div class="diff-before">
          <strong><i class="ti ti-x"></i> Naskah PDF Lama:</strong><br>${h.before}
        </div>
        <div class="diff-after">
          <strong><i class="ti ti-check"></i> Koreksi / Revisi:</strong><br>${h.after}
        </div>
      </div>
      <div style="font-size:12px; color:#64748b; margin-top:8px;">
        <i class="ti ti-info-circle"></i> Catatan: ${h.note}
      </div>
    `;
    historyTimelineContainer.appendChild(card);
  });
}

searchHistory.addEventListener("input", (e) => {
  renderHistory(e.target.value);
});

// Render Notes
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach(n => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <div class="note-card-header">
        <span class="note-date"><i class="ti ti-calendar"></i> ${n.date}</span>
        <span class="note-author"><i class="ti ti-user-check"></i> ${n.author}</span>
      </div>
      <div class="note-body">${n.content}</div>
    `;
    notesContainer.appendChild(card);
  });
}

function saveNotes() {
  localStorage.setItem("thesis_notes", JSON.stringify(notes));
}

// Add New Note
document.getElementById("add-note-btn").addEventListener("click", () => {
  const dateInput = document.getElementById("note-date");
  const authorInput = document.getElementById("note-author");
  const contentInput = document.getElementById("note-content");

  const content = contentInput.value.trim();
  if (!content) return;

  const newNote = {
    id: Date.now(),
    date: dateInput.value || new Date().toISOString().split("T")[0],
    author: authorInput.value.trim() || "Dr. Irwansyah Saputra, M.Kom.",
    content: content
  };
  notes.unshift(newNote);
  saveNotes();
  contentInput.value = "";
  renderNotes();
});

// Render References Table
function renderReferences(filterText = "") {
  const q = filterText.toLowerCase();
  const filtered = REFERENCES_DATA.filter(r => {
    return r.author.toLowerCase().includes(q) ||
           r.title.toLowerCase().includes(q) ||
           r.index.toLowerCase().includes(q) ||
           r.venue.toLowerCase().includes(q);
  });

  refTableBody.innerHTML = "";
  filtered.forEach(r => {
    const tr = document.createElement("tr");
    let badgeClass = "badge-peer";
    if (r.index.includes("Q1")) badgeClass = "badge-q1";
    else if (r.index.includes("Q2")) badgeClass = "badge-q2";
    else if (r.index.includes("SINTA 1")) badgeClass = "badge-s1";
    else if (r.index.includes("SINTA 2")) badgeClass = "badge-s2";

    tr.innerHTML = `
      <td>${r.no}</td>
      <td><strong>${r.author}</strong></td>
      <td>
        <div>${r.title}</div>
        <div style="font-size:11px; color:#64748b; margin-top:2px;"><i class="ti ti-building-bank"></i> ${r.venue}</div>
      </td>
      <td>${r.year}</td>
      <td><span class="badge-index ${badgeClass}">${r.index}</span></td>
      <td><code style="font-size:11px;"><i class="ti ti-file-type-pdf"></i> ${r.file}</code></td>
      <td><span class="status-badge-ok"><i class="ti ti-check"></i> ${r.status}</span></td>
    `;
    refTableBody.appendChild(tr);
  });
}

searchRef.addEventListener("input", (e) => {
  renderReferences(e.target.value);
});

// Initial Run
renderTasks();
renderHistory();
renderNotes();
renderReferences();

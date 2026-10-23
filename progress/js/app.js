/**
 * TECHNICAL DEBT KD - MASTER RESEARCH CONSOLE CONTROLLER
 * Zero Hardcode, Dynamic JSON Loader, GitHub Pages Native
 */

// Application State
const state = {
  activeTab: 'audit',
  rq: [],
  datasets: [],
  references: [],
  filteredReferences: [],
  audit: null,
  auditHistory: [],
  completedAuditIds: new Set(),
  theme: localStorage.getItem('console_theme') || 'dark'
};

// DOM References Cache
const dom = {
  tabBtns: document.querySelectorAll('.tab-btn'),
  views: {
    rq: document.getElementById('view-rq'),
    datasets: document.getElementById('view-datasets'),
    references: document.getElementById('view-references'),
    audit: document.getElementById('view-audit')
  },
  toast: document.getElementById('toast'),
  themeToggle: document.getElementById('theme-toggle'),
  headerStats: {
    rq: document.getElementById('tab-count-rq'),
    data: document.getElementById('tab-count-data'),
    ref: document.getElementById('tab-count-ref'),
    audit: document.getElementById('tab-count-audit')
  }
};

// --------------------------------------------------------------------------
// 1. INITIALIZATION & DATA FETCHING
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initRouting();
  initKeyboardShortcuts();
  await loadAllData();
});

function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();

  if (dom.themeToggle) {
    dom.themeToggle.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('console_theme', state.theme);
      updateThemeIcon();
    });
  }
}

function updateThemeIcon() {
  if (!dom.themeToggle) return;
  dom.themeToggle.innerHTML = state.theme === 'dark' 
    ? '<i class="ti ti-sun"></i>' 
    : '<i class="ti ti-moon"></i>';
}

async function loadAllData() {
  try {
    // Relative paths compatible with GitHub Pages at any depth
    const [rqRes, dataRes, refRes, histIndexRes, auditRes] = await Promise.allSettled([
      fetch('data/rq.json').then(r => r.json()),
      fetch('data/datasets.json').then(r => r.json()),
      fetch('data/references.json').then(r => r.json()),
      fetch('history/index.json').then(r => r.json()),
      fetch('history/latest.json').then(r => r.json())
    ]);

    if (rqRes.status === 'fulfilled') {
      state.rq = rqRes.value;
      renderRQ(state.rq);
      if (dom.headerStats.rq) dom.headerStats.rq.textContent = state.rq.length;
    }

    if (dataRes.status === 'fulfilled') {
      state.datasets = dataRes.value;
      renderDatasets(state.datasets);
      if (dom.headerStats.data) dom.headerStats.data.textContent = state.datasets.length;
    }

    if (refRes.status === 'fulfilled') {
      state.references = refRes.value;
      state.filteredReferences = [...state.references];
      renderReferences(state.filteredReferences);
      if (dom.headerStats.ref) dom.headerStats.ref.textContent = state.references.length;
    }

    if (histIndexRes.status === 'fulfilled') {
      state.auditHistory = histIndexRes.value;
    }

    if (auditRes.status === 'fulfilled') {
      state.audit = auditRes.value;
      loadAuditChecklistState();
      renderAudit(state.audit);
      if (dom.headerStats.audit) dom.headerStats.audit.textContent = state.audit.items.length;
    }

  } catch (error) {
    console.error('Data loader error:', error);
    showToast('Gagal memuat data JSON. Pastikan file tersedia.');
  }
}

// --------------------------------------------------------------------------
// 2. VIEWPORT NAVIGATION & ROUTING
// --------------------------------------------------------------------------
function initRouting() {
  dom.tabBtns = document.querySelectorAll('.tab-btn');

  // Listen to hash change
  window.addEventListener('hashchange', handleHash);

  // Tab button click handlers
  dom.tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
      window.location.hash = tab;
    });
  });

  // Initial tab from hash or default
  handleHash();
}

function handleHash() {
  const hash = window.location.hash.replace('#', '');
  if (['audit', 'datasets', 'references', 'rq'].includes(hash)) {
    switchTab(hash);
  } else {
    switchTab('audit');
  }
}

function switchTab(tabId) {
  state.activeTab = tabId;

  // Update tabs visual state
  dom.tabBtns.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update views display
  Object.keys(dom.views).forEach(key => {
    if (dom.views[key]) {
      if (key === tabId) {
        dom.views[key].classList.add('active-view');
      } else {
        dom.views[key].classList.remove('active-view');
      }
    }
  });
}

function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Avoid triggering when focused on input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      if (e.key === 'Escape') {
        e.target.blur();
        e.target.value = '';
        if (state.activeTab === 'references') {
          filterReferences('');
        }
      }
      return;
    }

    if (e.key === '1') { switchTab('audit'); window.location.hash = 'audit'; }
    if (e.key === '2') { switchTab('datasets'); window.location.hash = 'datasets'; }
    if (e.key === '3') { switchTab('references'); window.location.hash = 'references'; }
    if (e.key === '4') { switchTab('rq'); window.location.hash = 'rq'; }

    if (e.key === '/') {
      e.preventDefault();
      switchTab('references');
      window.location.hash = 'references';
      const searchInput = document.getElementById('ref-search-input');
      if (searchInput) searchInput.focus();
    }
  });
}

// --------------------------------------------------------------------------
// 3. RENDER VIEW 1: RUMUSAN MASALAH (RQ)
// --------------------------------------------------------------------------
function renderRQ(rqList) {
  const container = document.getElementById('rq-container');
  if (!container) return;

  if (!rqList || rqList.length === 0) {
    container.innerHTML = '<div class="empty-state">Data RQ belum tersedia.</div>';
    return;
  }

  const html = rqList.map(rq => `
    <div class="rq-card">
      <div>
        <div class="rq-badge-row">
          <span class="rq-id-tag">${rq.id}</span>
          <span class="rq-focus-tag">${rq.focus}</span>
        </div>
        <h3 class="rq-title">${rq.title}</h3>
        <div class="rq-question-box">${rq.question}</div>
        
        <div class="rq-metrics-block">
          <div class="metrics-label"><i class="ti ti-chart-bar"></i> Target Evaluasi &amp; Metrik</div>
          <div class="metrics-list">
            ${rq.metrics.map(m => `
              <div class="metric-pill">
                <span class="name">${m.name}</span>
                <span class="val">${m.target}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="rq-specs-box">
        <div class="spec-row">
          <span class="spec-label">Uji Statistik</span>
          <span class="spec-val">${rq.stats_test}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">Baseline Model</span>
          <span class="spec-val">${rq.baselines.join(', ')}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">Dataset Uji</span>
          <span class="spec-val">${rq.datasets.join(', ')}</span>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

// --------------------------------------------------------------------------
// 4. RENDER VIEW 2: DATASETS EMPIRIS
// --------------------------------------------------------------------------
function renderDatasets(datasetList) {
  const container = document.getElementById('datasets-container');
  if (!container) return;

  if (!datasetList || datasetList.length === 0) {
    container.innerHTML = '<div class="empty-state">Data dataset belum tersedia.</div>';
    return;
  }

  const html = datasetList.map(ds => `
    <div class="dataset-card">
      <div>
        <div class="dataset-head">
          <span class="dataset-id">${ds.id}</span>
          <span class="dataset-badge">${ds.badge}</span>
        </div>
        <h3 class="dataset-name">${ds.name}</h3>
        <p class="dataset-domain">${ds.domain}</p>

        <div class="dataset-stats-matrix">
          <div class="stat-cell">
            <span class="lbl">Sampel</span>
            <span class="num">${Number(ds.samples).toLocaleString()}</span>
          </div>
          <div class="stat-cell">
            <span class="lbl">Ukuran</span>
            <span class="num">${ds.size_mb} MB</span>
          </div>
          <div class="stat-cell">
            <span class="lbl">Distribusi</span>
            <span class="num" style="font-size:11px;">${ds.distribution}</span>
          </div>
          <div class="stat-cell">
            <span class="lbl">Bahasa</span>
            <span class="num" style="font-size:11px;">${ds.language}</span>
          </div>
        </div>

        <div class="dataset-artifacts">
          <strong style="color:var(--text-primary); font-size:11px; text-transform:uppercase; font-family:var(--font-mono); display:block; margin-bottom:2px;">Artefak:</strong>
          ${ds.artifacts}
        </div>
      </div>

      <div style="border-top:1px solid var(--border-subtle); padding-top:14px; margin-top:14px;">
        <a href="${ds.source_repo}" target="_blank" rel="noopener" class="dataset-link-btn" style="width:100%;">
          <i class="ti ti-brand-github"></i> Buka Sumber Korpus
        </a>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

// --------------------------------------------------------------------------
// 5. RENDER VIEW 3: REFERENCES (21 PAPERS)
// --------------------------------------------------------------------------
function renderReferences(refList) {
  const tbody = document.getElementById('ref-table-body');
  const countBadge = document.getElementById('ref-active-count');
  if (!tbody) return;

  if (countBadge) countBadge.textContent = `${refList.length} dari ${state.references.length}`;

  if (!refList || refList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; padding:36px; color:var(--text-muted); font-family:var(--font-mono);">
          <i class="ti ti-search-off" style="font-size:24px; display:block; margin-bottom:6px;"></i>
          Tidak ada referensi yang cocok dengan kata kunci pencarian.
        </td>
      </tr>
    `;
    return;
  }

  const html = refList.map(r => {
    const isScopus = r.index.toLowerCase().includes('scopus');
    const badgeClass = isScopus ? 'badge-scopus' : 'badge-sinta';
    const doiLink = r.doi ? `https://doi.org/${r.doi}` : '#';

    return `
      <tr>
        <td style="font-family:var(--font-mono); font-weight:700; color:var(--text-muted);">${r.no}</td>
        <td>
          <div class="ref-title-text">${r.title}</div>
          <div class="ref-authors">${r.author} (${r.year}) &bull; <em>${r.venue}</em></div>
          <div class="ref-role-tag">
            <i class="ti ti-compass"></i> ${r.role}
          </div>
        </td>
        <td>
          <span class="${badgeClass}">${r.index}</span>
        </td>
        <td style="text-align: center;">
          <div class="ref-actions-cell" style="justify-content: center;">
            ${r.doi ? `
              <a href="${doiLink}" target="_blank" rel="noopener" class="action-icon-btn" title="Buka DOI Resmi">
                <i class="ti ti-external-link"></i>
              </a>
            ` : ''}
            <button class="action-icon-btn" onclick="copyCitation(this, '${r.citation_key}')" title="Salin Sitasi BibTeX">
              <i class="ti ti-copy"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.innerHTML = html;
}

function escapeQuote(str) {
  return str ? str.replace(/'/g, "\\'") : '';
}

function filterReferences(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    state.filteredReferences = [...state.references];
  } else {
    state.filteredReferences = state.references.filter(r => {
      return (
        r.title.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.authors_full.toLowerCase().includes(q) ||
        r.index.toLowerCase().includes(q) ||
        r.venue.toLowerCase().includes(q) ||
        String(r.year).includes(q) ||
        r.role.toLowerCase().includes(q) ||
        (r.citation_key && r.citation_key.toLowerCase().includes(q))
      );
    });
  }
  renderReferences(state.filteredReferences);
}

// Global search input listener
document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'ref-search-input') {
    filterReferences(e.target.value);
  }
});

function copyCitation(btn, key) {
  const ref = state.references.find(r => r.citation_key === key);
  const text = ref 
    ? `@article{${ref.citation_key},\n  author = {${ref.author}},\n  title = {${ref.title}},\n  journal = {${ref.venue}},\n  year = {${ref.year}}\n}`
    : key;

  copyToClipboard(text, () => {
    if (btn) {
      const origHtml = btn.innerHTML;
      btn.innerHTML = '<i class="ti ti-check" style="color:var(--accent);"></i>';
      btn.style.borderColor = 'var(--accent)';
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.style.borderColor = '';
      }, 1500);
    }
    showToast(`Sitasi '${key}' berhasil disalin!`);
  });
}

function copyToClipboard(text, callback) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => { if (callback) callback(); })
      .catch(() => fallbackCopy(text, callback));
  } else {
    fallbackCopy(text, callback);
  }
}

function fallbackCopy(text, callback) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  textArea.setAttribute('readonly', '');
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    if (callback) callback();
  } catch (err) {
    showToast('Gagal menyalin ke clipboard');
  } finally {
    document.body.removeChild(textArea);
  }
}

// --------------------------------------------------------------------------
// 6. RENDER VIEW 4: AUDIT CHECKLIST (BAB 3 DRAFT)
// --------------------------------------------------------------------------
function loadAuditChecklistState() {
  state.completedAuditIds.clear();
  if (!state.audit || !state.audit.items) return;

  state.audit.items.forEach(item => {
    const val = localStorage.getItem('audit_' + item.id);
    if (val === '1') {
      state.completedAuditIds.add(item.id);
    }
  });
}

function renderAudit(auditData) {
  const container = document.getElementById('audit-items-container');
  const summaryPending = document.getElementById('audit-pending-count');
  const summaryResolved = document.getElementById('audit-resolved-count');
  const metaDate = document.getElementById('audit-meta-date');
  const metaDoc = document.getElementById('audit-meta-doc');

  if (!container || !auditData) return;

  if (metaDate && auditData.date) metaDate.textContent = auditData.date;
  if (metaDoc && auditData.document) {
    metaDoc.textContent = auditData.document.split('/').pop();
  }

  const total = auditData.items.length;
  const resolved = auditData.items.filter(item => item.status === 'resolved').length;
  const pending = total - resolved;

  if (summaryPending) summaryPending.textContent = pending;
  if (summaryResolved) summaryResolved.textContent = resolved;
  if (dom.headerStats.audit) dom.headerStats.audit.textContent = pending;

  const html = auditData.items.map(item => {
    const isResolved = item.status === 'resolved';
    const sevClass = item.severity === 'Penting' ? 'sev-penting' : 'sev-sedang';

    return `
      <div class="audit-item-card ${isResolved ? 'is-completed' : ''}" id="audit-card-${item.id}">
        <div class="audit-status-icon ${isResolved ? 'resolved' : 'pending'}" title="${isResolved ? 'Telah Diperbaiki' : 'Perlu Tindakan'}">
          <i class="ti ${isResolved ? 'ti-check' : 'ti-alert-triangle'}"></i>
        </div>
        <div class="audit-item-content">
          <div class="audit-item-header">
            <div class="audit-item-tags">
              <span class="audit-code">${item.id}</span>
              <span class="audit-loc">&bull; ${item.location}</span>
            </div>
            <div class="audit-badges-wrap">
              <span class="audit-sev-badge ${sevClass}">${item.severity}</span>
              <span class="audit-state-badge ${isResolved ? 'resolved' : 'pending'}">
                ${isResolved ? '<i class="ti ti-check"></i> Selesai' : '<i class="ti ti-clock"></i> Perlu Tindakan'}
              </span>
            </div>
          </div>
          <h4 class="audit-item-title">${item.title}</h4>
          
          <div class="audit-diff-grid">
            <div class="diff-box diff-problem">
              <div class="diff-tag"><i class="ti ti-alert-triangle"></i> Draf Saat Ini:</div>
              ${item.problem}
            </div>
            <div class="diff-box diff-solution">
              <div class="diff-tag"><i class="ti ti-check"></i> Tindakan Perbaikan:</div>
              ${item.solution}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

// --------------------------------------------------------------------------
// 7. TOAST NOTIFICATION UTILITY
// --------------------------------------------------------------------------
let toastTimeout;
function showToast(message) {
  if (!dom.toast) return;
  dom.toast.innerHTML = `<i class="ti ti-info-circle"></i> <span>${message}</span>`;
  dom.toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    dom.toast.classList.remove('show');
  }, 2800);
}

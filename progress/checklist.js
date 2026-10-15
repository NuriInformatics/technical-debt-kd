// Controller Checklist Harian Berbasis Tanggal (Dated JSON)

let availableSnapshots = [];
let currentSnapshot = null;

async function initChecklist() {
  await loadSnapshotIndex();
}

async function loadSnapshotIndex() {
  try {
    const res = await fetch("checklists/index.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    availableSnapshots = await res.json();
    renderDateSelector();

    if (availableSnapshots.length > 0) {
      loadDateSnapshot(availableSnapshots[0].file);
    }
  } catch (err) {
    console.error("Gagal memuat index checklist:", err);
    loadDateSnapshot("checklists/2026-10-16.json");
  }
}

function renderDateSelector() {
  const container = document.getElementById("date-selector-container");
  if (!container || availableSnapshots.length === 0) return;

  container.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px;">
      <label for="date-select" style="font-size:12.5px; font-weight:600; color:#475569;">
        <i class="ti ti-calendar"></i> Arsip Tanggal:
      </label>
      <select id="date-select" class="date-dropdown" onchange="onSelectDate(this.value)">
        ${availableSnapshots.map(s => `
          <option value="${s.file}">${s.date} &bull; ${s.title} (${s.items_count} item)</option>
        `).join("")}
      </select>
    </div>
  `;
}

async function loadDateSnapshot(filename) {
  const path = filename.startsWith("checklists/") ? filename : `checklists/${filename}`;
  const container = document.getElementById("checklist-items-container");

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("HTTP " + res.status);
    currentSnapshot = await res.json();
    renderSnapshotData();
  } catch (err) {
    console.error("Gagal memuat snapshot checklist:", err);
    if (container) {
      container.innerHTML = `
        <div style="background:#fff; border:1px solid #fed7aa; border-radius:10px; padding:28px; text-align:center; color:#9a3412;">
          <i class="ti ti-alert-triangle" style="font-size:32px; display:block; margin-bottom:10px;"></i>
          <strong>Perhatian Protokol file://</strong><br>
          <span style="font-size:13px; color:#64748b;">
            Browser membatasi <code>fetch()</code> lokal pada file JSON.<br>
            Jalankan local server untuk membaca arsip dinamis:<br>
            <code>python3 -m http.server 8000</code> dari root repositori.
          </span>
        </div>
      `;
    }
  }
}

function renderSnapshotData() {
  if (!currentSnapshot) return;

  // Render header info
  const headerElem = document.getElementById("snapshot-header");
  if (headerElem) {
    headerElem.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px; background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:16px 20px;">
        <div>
          <div style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:#2563eb; margin-bottom:2px;">
            <i class="ti ti-calendar-event"></i> CATATAN TANGGAL: ${currentSnapshot.date}
          </div>
          <h3 style="font-size:16px; font-weight:700; color:#0f172a; margin-bottom:4px;">${currentSnapshot.title}</h3>
          <div style="font-size:12.5px; color:#64748b;">
            Berkas: <code>${currentSnapshot.document}</code> &bull; Status: <strong>${currentSnapshot.status}</strong>
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:6px 14px; text-align:center;">
            <span style="font-family:var(--font-mono); font-size:18px; font-weight:700; color:#e11d48; display:block; line-height:1;">${currentSnapshot.summary.pending}</span>
            <span style="font-size:11px; color:#9f1239; font-weight:600;">Perlu Tindakan</span>
          </div>
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:6px 14px; text-align:center;">
            <span style="font-family:var(--font-mono); font-size:18px; font-weight:700; color:#059669; display:block; line-height:1;">${currentSnapshot.summary.resolved}</span>
            <span style="font-size:11px; color:#065f46; font-weight:600;">Selesai</span>
          </div>
        </div>
      </div>
    `;
  }

  // Render items
  const container = document.getElementById("checklist-items-container");
  if (!container || !currentSnapshot.items) return;

  container.innerHTML = "";
  currentSnapshot.items.forEach(item => {
    const card = document.createElement("div");
    card.className = "check-card";
    const sevClass = item.severity === "Penting" ? "sev-penting" : "sev-sedang";
    const isResolved = item.status === "resolved";

    card.innerHTML = `
      <div class="check-box-icon" style="${isResolved ? 'background:#ecfdf5; border-color:#10b981; color:#059669;' : ''}">
        <i class="ti ${isResolved ? 'ti-check' : 'ti-pencil'}"></i>
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

function onSelectDate(file) {
  loadDateSnapshot(file);
}

document.addEventListener("DOMContentLoaded", initChecklist);

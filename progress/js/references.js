// Controller Khusus Referensi Pustaka
// Memuat data MURNI dari file references.json

let allReferences = [];
let activeCategory = 'all';
let searchQuery = '';

async function loadReferences() {
  const container = document.getElementById("ref-list-container");
  try {
    let res;
    try {
      res = await fetch("../references.json");
    } catch (e) {
      res = await fetch("references.json");
    }
    if (!res.ok) throw new Error("HTTP " + res.status);
    allReferences = await res.json();
    renderReferences();
  } catch (err) {
    console.error("Gagal memuat references.json:", err);
    if (container) {
      container.innerHTML = `
        <div style="background:#fff; border:1px solid #fed7aa; border-radius:10px; padding:28px; text-align:center; color:#9a3412;">
          <i class="ti ti-alert-triangle" style="font-size:32px; display:block; margin-bottom:10px;"></i>
          <strong>Perhatian Protokol file://</strong><br>
          <span style="font-size:13px; color:#64748b;">
            Browser membatasi <code>fetch()</code> lokal karena kebijakan keamanan CORS.<br>
            Untuk memuat langsung dari <code>references.json</code>, jalankan local web server:<br>
            <code>python3 -m http.server 8000</code> dari folder repositori.
          </span>
        </div>
      `;
    }
  }
}

function renderReferences() {
  const container = document.getElementById("ref-list-container");
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  const filtered = allReferences.filter(r => {
    let matchCat = true;
    if (activeCategory === 'Q1') matchCat = r.index && r.index.includes('Q1');
    else if (activeCategory === 'Q2') matchCat = r.index && r.index.includes('Q2');
    else if (activeCategory === 'SINTA') matchCat = r.index && r.index.includes('SINTA');

    if (!matchCat) return false;
    if (!query) return true;

    return (r.author && r.author.toLowerCase().includes(query)) ||
           (r.title && r.title.toLowerCase().includes(query)) ||
           (r.venue && r.venue.toLowerCase().includes(query)) ||
           (r.index && r.index.toLowerCase().includes(query)) ||
           (r.role && r.role.toLowerCase().includes(query));
  });

  const countElem = document.getElementById("ref-found-count");
  if (countElem) countElem.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:32px; text-align:center; color:#64748b;">
        <i class="ti ti-search-off" style="font-size:32px; display:block; margin-bottom:8px;"></i>
        Tidak ditemukan referensi yang cocok dengan kata kunci "<strong>${searchQuery}</strong>".
      </div>
    `;
    return;
  }

  container.innerHTML = "";
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

function onSearchRefs(val) {
  searchQuery = val;
  renderReferences();
}

function filterCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll("#filter-pills .pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  renderReferences();
}

document.addEventListener("DOMContentLoaded", loadReferences);

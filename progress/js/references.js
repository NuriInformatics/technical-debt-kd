// Instant In-DOM Search for 21 References
// Works 100% on file:// protocol without CORS or fetch errors

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("ref-search");
  const countElem = document.getElementById("ref-found-count");
  const items = document.querySelectorAll(".ref-item");
  const emptyBox = document.getElementById("ref-empty-box");

  if (!input) return;

  input.addEventListener("input", function (e) {
    const q = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    items.forEach(function (item) {
      const text = item.textContent.toLowerCase();
      const match = !q || text.includes(q);
      item.style.display = match ? "flex" : "none";
      if (match) visibleCount++;
    });

    if (countElem) {
      countElem.textContent = visibleCount;
    }

    if (emptyBox) {
      emptyBox.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
});

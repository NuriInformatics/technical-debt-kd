// Interactive In-DOM Checklist State Controller
// Zero fetch(), 100% works on file:// protocol with localStorage persistence

function updateChecklistStats() {
  const cards = document.querySelectorAll(".check-card");
  let resolved = 0;

  cards.forEach(card => {
    const icon = card.querySelector(".check-box-icon");
    if (icon && icon.classList.contains("is-resolved")) {
      resolved++;
    }
  });

  const pending = cards.length - resolved;
  const pendingElem = document.getElementById("stat-pending");
  const resolvedElem = document.getElementById("stat-resolved");

  if (pendingElem) pendingElem.textContent = pending;
  if (resolvedElem) resolvedElem.textContent = resolved;
}

function toggleCheckItem(boxElem) {
  const isResolved = boxElem.classList.toggle("is-resolved");
  const checkIcon = boxElem.querySelector("i");
  const card = boxElem.closest(".check-card");
  const cardId = card ? card.getAttribute("data-id") : null;

  if (isResolved) {
    boxElem.style.backgroundColor = "#ecfdf5";
    boxElem.style.borderColor = "#10b981";
    boxElem.style.color = "#059669";
    if (checkIcon) checkIcon.style.display = "block";
    if (card) card.style.opacity = "0.7";
  } else {
    boxElem.style.backgroundColor = "";
    boxElem.style.borderColor = "#cbd5e1";
    boxElem.style.color = "transparent";
    if (checkIcon) checkIcon.style.display = "none";
    if (card) card.style.opacity = "1";
  }

  // Save to localStorage
  if (cardId) {
    try {
      localStorage.setItem("checklist_" + cardId, isResolved ? "1" : "0");
    } catch (e) {}
  }

  updateChecklistStats();
}

// Restore saved state on load
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".check-card").forEach(card => {
    const cardId = card.getAttribute("data-id");
    const box = card.querySelector(".check-box-icon");
    if (!cardId || !box) return;

    try {
      if (localStorage.getItem("checklist_" + cardId) === "1") {
        box.classList.add("is-resolved");
        box.style.backgroundColor = "#ecfdf5";
        box.style.borderColor = "#10b981";
        box.style.color = "#059669";
        const checkIcon = box.querySelector("i");
        if (checkIcon) checkIcon.style.display = "block";
        card.style.opacity = "0.7";
      }
    } catch (e) {}
  });

  updateChecklistStats();
});

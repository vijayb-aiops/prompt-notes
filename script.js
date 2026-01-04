const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".prompt-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    cards.forEach((card) => {
      const matches = category === "all" || card.dataset.category === category;
      card.style.display = matches ? "flex" : "none";
    });
  });
});

const buttons = document.querySelectorAll(".copy-btn");

async function copyText(button) {
  const target = document.querySelector(button.dataset.target);
  if (!target) return;

  const text = target.innerText.trim();
  try {
    await navigator.clipboard.writeText(text);
    flashState(button, "success", "Copied!");
  } catch (err) {
    console.error("Copy failed", err);
    flashState(button, "error", "Copy failed");
  }
}

function flashState(button, state, label) {
  const original = button.textContent;
  button.textContent = label;
  button.classList.add(state);
  setTimeout(() => {
    button.textContent = original;
    button.classList.remove(state);
  }, 1200);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => copyText(btn));
});

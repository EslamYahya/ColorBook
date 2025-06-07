const animals = [
  { letter: "أ", name: "أسد" }, { letter: "ب", name: "بقره" }, { letter: "ت", name: "تمساح" },
  { letter: "ث", name: "ثور" }, { letter: "ج", name: "جمل" }, { letter: "ح", name: "حصان" },
  { letter: "خ", name: "خروف" }, { letter: "د", name: "ديك" }, { letter: "ذ", name: "ذئب" },
  { letter: "ر", name: "راكون" }, { letter: "ز", name: "زرافه" }, { letter: "س", name: "سلحفاه" },
  { letter: "ش", name: "شبل" }, { letter: "ص", name: "صقر" }, { letter: "ض", name: "ضفدع" },
  { letter: "ط", name: "طاوس" }, { letter: "ظ", name: "ظبي" }, { letter: "ع", name: "عنكبوت" },
  { letter: "غ", name: "غراب" }, { letter: "ف", name: "فار" }, { letter: "ق", name: "قرد" },
  { letter: "ك", name: "كلب" }, { letter: "ل", name: "لاما" }, { letter: "م", name: "ماعز" },
  { letter: "ن", name: "نحله" }, { letter: "هـ", name: "هره" }, { letter: "و", name: "وحيد القرن" },
  { letter: "ي", name: "يمامه" }
];

const container = document.getElementById("book-container");

animals.forEach(animal => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${animal.letter}</h2>
    <canvas width="180" height="180" data-src="images/${animal.name}.png"></canvas>
    <p>${animal.name}</p>
    <div class="tools">
      <label>🎨 اللون: <input type="color" class="color-picker" value="#000000"></label>
      <label>✏️ الحجم: <input type="range" class="brush-size" min="1" max="20" value="3"></label>
    </div>
    <button class="clear-btn">مسح</button>
  `;
  container.appendChild(card);
});

const setupCanvas = (canvas) => {
  const ctx = canvas.getContext("2d");
  let drawing = false;
  let color = "#000";
  let size = 3;

  const img = new Image();
  img.src = canvas.dataset.src;
  img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const updateSettings = (el) => {
    const parent = el.closest(".card");
    if (!parent) return;
    color = parent.querySelector(".color-picker")?.value || "#000";
    size = parseInt(parent.querySelector(".brush-size")?.value || 3);
  };

  canvas.addEventListener("mousedown", (e) => {
    updateSettings(e.target);
    drawing = true;
    canvas.classList.add("drawing");
  });
  canvas.addEventListener("mouseup", () => {
    drawing = false;
    canvas.classList.remove("drawing");
  });
  canvas.addEventListener("mouseleave", () => {
    drawing = false;
    canvas.classList.remove("drawing");
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, size, 0, 2 * Math.PI);
    ctx.fill();
  });

  const clearBtn = canvas.parentElement.querySelector(".clear-btn");
  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
};

document.querySelectorAll("canvas").forEach(setupCanvas);

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
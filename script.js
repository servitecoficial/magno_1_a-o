// Musica automatica
const music = document.getElementById("bgMusic");
document.addEventListener(
  "click",
  () => {
    music.play().catch(() => {});
  },
  { once: true }
);

// Cuenta regresiva (actualiza por minuto para evitar saltos de scroll en moviles)
const eventDate = new Date("2026-03-15T16:00:00").getTime();
const countdown = document.getElementById("countdown");

function updateCountdown() {
  if (!countdown) return;

  const now = Date.now();
  const distance = eventDate - now;

  if (distance <= 0) {
    countdown.textContent = "El cumple ya comenzo.";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  countdown.textContent = `Faltan ${days} dias ${String(hours).padStart(2, "0")} hs ${String(minutes).padStart(2, "0")} min`;
}

updateCountdown();
setInterval(updateCountdown, 60000);

// Olas dinamicas
const body = document.body;
if (!document.querySelector(".waves")) {
  body.insertAdjacentHTML("beforeend", '<div class="waves"></div>');
}

// Burbujas
const bubbleContainer = document.querySelector(".bubbles");
if (bubbleContainer) {
  for (let i = 0; i < 18; i++) {
    const bubble = document.createElement("span");
    const size = Math.random() * 25 + 10;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = Math.random() * 6 + 6 + "s";
    bubbleContainer.appendChild(bubble);
  }
}

// Globos
const balloonContainer = document.querySelector(".balloons");
if (balloonContainer) {
  for (let i = 0; i < 8; i++) {
    const balloon = document.createElement("span");
    balloon.style.left = 8 + i * 11 + "%";
    balloon.style.background = ["#FFD700", "#FF4D4D", "#00E1FF", "#7CFF00"][i % 4];
    balloon.style.animationDuration = Math.random() * 4 + 7 + "s";
    balloonContainer.appendChild(balloon);
  }
}

const calendarLink =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cumpleaños+N°1+Magno&dates=20260315T190000Z/20260315T220000Z&location=Calle+Costa+Rica+2135,+Libertad,+Merlo,+Buenos+Aires&ctz=America/Argentina/Buenos_Aires";

const mapsLink = "https://www.google.com/maps/place/Costa+Rica+2135,+Libertad,+Merlo,+Buenos+Aires";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildWhatsappMessage(nombre, apellido, tipo, mensajeExtra) {
  return (
    `*🎉 CONFIRMACIÓN CUMPLEAÑOS DE MAGNO 🎉*\n\n` +
    `👤 *Nombre:* ${nombre}\n` +
    `👤 *Apellido:* ${apellido}\n` +
    `🎈 *Invitado:* ${tipo}\n\n` +
    `💌 *Dedicatoria:* ${mensajeExtra || "-"}\n\n` +
    `✨ *En este link vas a poder agendar mi cumple en tu calendario:*\n` +
    `${calendarLink}\n\n` +
    `📍 *Acá está el link para que puedas encontrar la dirección de mi casa más rápido y puedas llegar a festejar con nosotros:*\n` +
    `${mapsLink}\n\n` +
    `💛 *Quiero que seas parte de este momento tan especial para mis papis como para mí. ¡TE ESPERO!* 🎂🎊`
  );
}

// Formulario
const inviteForm = document.getElementById("inviteForm");
if (inviteForm) {
  inviteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const tipo = document.getElementById("tipo").value;
    const mensajeExtra = document.getElementById("mensajeExtra").value.trim();

    const submarine = document.getElementById("submarine");
    const thankYou = document.getElementById("thankYou");

    if (submarine) submarine.classList.add("dive");

    const formData = new URLSearchParams();
    formData.append("entry.810720251", nombre);
    formData.append("entry.1257370811", apellido);
    formData.append("entry.517323634", tipo);
    formData.append("entry.346124039", mensajeExtra);

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSfLxa7HQTb9wvG21ety1IHTsXLxhl7lnH1qUr2MiTr-rROD0g/formResponse", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    });

    setTimeout(() => {
      if (!thankYou) return;

      const safeNombre = escapeHtml(nombre || "invitado/a");
      thankYou.innerHTML =
        `<div class="thankYouVisual">` +
        `<img src="submarino.png" alt="Submarino" class="thankYouSubmarine">` +
        `<div class="miniWaves" aria-hidden="true"></div>` +
        `</div>` +
        `<div class="thankYouText"><strong>Gracias ${safeNombre}.</strong><br><br>Nos emociona que seas parte de este momento tan especial.</div>`;
      thankYou.classList.add("show");

      setTimeout(() => {
        const mensaje = buildWhatsappMessage(nombre, apellido, tipo, mensajeExtra);
        window.location.href = `https://wa.me/5491161892818?text=${encodeURIComponent(mensaje)}`;
      }, 2000);
    }, 1200);
  });
}

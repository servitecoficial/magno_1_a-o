// 🎵 Música automática
const music = document.getElementById("bgMusic");
document.addEventListener("click",()=>{music.play().catch(()=>{});},{once:true});

// 🎬 Cuenta regresiva
const eventDate = new Date("March 15, 2026 16:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(()=>{
const now = new Date().getTime();
const distance = eventDate - now;

const days = Math.floor(distance / (1000*60*60*24));
const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

countdown.innerHTML = `⏳ Faltan ${days} días ${hours} hs ${minutes} min`;
},1000);

// 🌊 OLAS dinámicas tipo película
const body = document.body;
body.insertAdjacentHTML("beforeend", `
<div class="waves"></div>
`);

// 🫧 Burbujas 3D
const bubbleContainer = document.querySelector('.bubbles');
for(let i=0;i<30;i++){
let bubble=document.createElement('span');
let size=Math.random()*25+10;
bubble.style.width=size+"px";
bubble.style.height=size+"px";
bubble.style.left=Math.random()*100+"%";
bubble.style.animationDuration=(Math.random()*6+6)+"s";
bubbleContainer.appendChild(bubble);
}

// 🎈 Globos organizados
const balloonContainer = document.querySelector('.balloons');
for(let i=0;i<10;i++){
let balloon=document.createElement('span');
balloon.style.left=(5 + i*9)+"%";
balloon.style.background=["#FFD700","#FF4D4D","#00E1FF","#7CFF00"][i%4];
balloon.style.animationDuration=(Math.random()*4+7)+"s";
balloonContainer.appendChild(balloon);
}

// 🔗 LINKS
const calendarLink="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cumpleaños+N°1+Magno&dates=20260315T190000Z/20260315T220000Z&location=Calle+Costa+Rica+2135,+Libertad,+Merlo,+Buenos+Aires&ctz=America/Argentina/Buenos_Aires";

const mapsLink="https://www.google.com/maps/place/Costa+Rica+2135,+Libertad,+Merlo,+Buenos+Aires";

// 📝 FORMULARIO + ENVÍO A GOOGLE FORMS
document.getElementById("inviteForm").addEventListener("submit",function(e){
e.preventDefault();

const nombre=document.getElementById("nombre").value.trim();
const apellido=document.getElementById("apellido").value.trim();
const tipo=document.getElementById("tipo").value;
const mensajeExtra=document.getElementById("mensajeExtra").value.trim();

const submarine=document.getElementById("submarine");
const thankYou=document.getElementById("thankYou");

submarine.classList.add("dive");

// 🔥 ENVÍO REAL A TU GOOGLE FORMS
const formData=new URLSearchParams();
formData.append("entry.810720251",nombre);
formData.append("entry.1257370811",apellido);
formData.append("entry.517323634",tipo);
formData.append("entry.346124039",mensajeExtra);

fetch("https://docs.google.com/forms/d/e/1FAIpQLSfLxa7HQTb9wvG21ety1IHTsXLxhl7lnH1qUr2MiTr-rROD0g/formResponse",{
method:"POST",
mode:"no-cors",
headers:{"Content-Type":"application/x-www-form-urlencoded"},
body:formData.toString()
});

// 🎬 Animación estilo Pixar
setTimeout(()=>{
thankYou.innerHTML=`✨ Gracias ${nombre} ✨<br><br>Nos emociona que seas parte de este momento tan especial 💛`;
thankYou.classList.add("show");
},1200);

// 📲 WhatsApp profesional
setTimeout(()=>{

const mensaje=
`🎉 *CONFIRMACIÓN CUMPLEAÑOS DE MAGNO* 🎉

👤 *Nombre:* ${nombre}
👤 *Apellido:* ${apellido}
🎈 *Invitado:* ${tipo}

💌 ${mensajeExtra}

✨ *En este link vas a poder agendar mi cumple en tu calendario:*  
${calendarLink}

📍 *Acá está el link para que puedas encontrar la dirección de mi casa más rápido y puedas llegar a festejar con nosotros:*  
${mapsLink}

💛 *Quiero que seas parte de este momento tan especial para mis papis como para mí. ¡TE ESPERO!* 🎂🎊`;

window.location.href=`https://wa.me/5491161892818?text=${encodeURIComponent(mensaje)}`;

},4500);

});
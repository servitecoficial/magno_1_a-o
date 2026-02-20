const music=document.getElementById("bgMusic");

function startMusic(){
music.play().catch(()=>{});
document.removeEventListener("click",startMusic);
}
document.addEventListener("click",startMusic);

// Burbujas
const bubbleContainer=document.querySelector('.bubbles');
for(let i=0;i<30;i++){
let bubble=document.createElement('span');
bubble.style.left=Math.random()*100+"%";
bubble.style.animationDuration=(5+Math.random()*5)+"s";
bubbleContainer.appendChild(bubble);
}

// Globos
const balloonContainer=document.querySelector('.balloons');
for(let i=0;i<10;i++){
let balloon=document.createElement('span');
balloon.style.left=Math.random()*100+"%";
balloon.style.background=["#FFD700","#FF4D4D","#00E1FF","#7CFF00"][Math.floor(Math.random()*4)];
balloonContainer.appendChild(balloon);
}

// Countdown
const countdown=document.getElementById("countdown");
const eventDate=new Date("March 15, 2026 16:00:00").getTime();

setInterval(()=>{
const now=new Date().getTime();
const distance=eventDate-now;
const days=Math.floor(distance/(1000*60*60*24));
countdown.innerHTML=`Faltan ${days} días para el gran día 🎉`;
},1000);

// Formulario
document.getElementById("inviteForm").addEventListener("submit",function(e){
e.preventDefault();

const nombre=document.getElementById("nombre").value.trim();
const apellido=document.getElementById("apellido").value.trim();
const tipo=document.getElementById("tipo").value;
const mensajeExtra=document.getElementById("mensajeExtra").value.trim();

const submarine=document.getElementById("submarine");
const thankYou=document.getElementById("thankYou");

submarine.classList.add("dive");

// Google Forms
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

setTimeout(()=>{
thankYou.innerHTML=`Gracias ${nombre}, nos alegra mucho que seas parte de este día tan importante para nosotros.`;
thankYou.classList.remove("hidden");
thankYou.classList.add("show");
},1000);

setTimeout(()=>{
const mensaje=`Confirmación cumpleaños de Magno 🎉

Nombre: ${nombre}
Apellido: ${apellido}
Tipo: ${tipo}

Dedicatoria:
${mensajeExtra}`;

window.location.href=`https://wa.me/5491161892818?text=${encodeURIComponent(mensaje)}`;
},4000);

});
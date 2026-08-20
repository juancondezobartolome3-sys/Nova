// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

window.addEventListener("load", function () {

  audio.play().then(function () {
    console.log("La canción empezó");
  }).catch(function () {
    console.log("El navegador bloqueó el autoplay");
  });

});
function iniciarFlores() {

  var flores = document.querySelectorAll(".flower");

  flores.forEach(function(flor, index) {

    flor.style.animationDelay = (index * 0.5) + "s";

  });

}
audio.addEventListener("play", function() {
  iniciarFlores();
});

var tiemposFlores = [
  0,
  0.8,
  1.6,
  2.5,
  3.4,
  4.3
];

function revisarFlores() {

  var tiempo = audio.currentTime;
  var flores = document.querySelectorAll(".flower");

  for (var i = 0; i < tiemposFlores.length; i++) {

    if (tiempo >= tiemposFlores[i]) {
      flores[i].classList.add("flor-visible");
    }

  }

}

setInterval(revisarFlores, 50);

//contiene cada línea y su tiempo 

var lyricsData = [
  { text: "Kerosene, dopamine, chemical induced", time: 13 },
  { text: "Fantasy and fame, yeah, the things we choose", time: 16.8 },
  { text: "Show me hate, show me love, make me bulletproof", time: 20 },
  { text: "Yeah, we call this thing normal", time: 23 },
  { text: "Run away out of sight, don't know what I want", time: 26.5 },
  { text: "Wish I had a minute just to turn me off", time: 29 },
  { text: "Kerosene, dopamine, what I gotta do", time: 32.7 },
  { text: "Yeah, we call this thing normal", time: 35.3 },
  { text: "Heavy's the head when you chasin' true", time: 39 },
  { text: "Will you color me red? Will you color me blue?", time: 42.2 },
  { text: "Two sides of a coin and they both ain't true", time: 45.5 },
  { text: "Is it different for me? Is it different for you?", time: 48.5 },
  { text: "Got me feelin' things unusual", time: 52.7 },
  { text: "And I live them all", time: 56.3 },
  { text: "Got me and my feelings up on this wall", time: 59 },
  { text: "And my knees-ees", time: 63 },
  { text: "Kerosene, dopamine, chemical induced", time: 65 },
  { text: "Fantasy and fame, yeah, the things we choose", time: 68 },
  { text: "Show me hate, show me love, make me bulletproof", time: 71 },
  { text: "Yeah, we call this thing normal", time: 74 },
  { text: "Run away out of sight, don't know what I want", time: 77.5 },
  { text: "Wish I had a minute just to turn me off", time: 80.5 },
  { text: "Kerosene, dopamine, what I gotta do", time: 83.5 },
  { text: "Yeah, we call this thing normal", time: 86.7 },


  { text: "How I'm 'posed to feel?", time: 89.5 },
  { text: "Used to think that I was built with a heart made of steel", time: 91.5 },
  { text: "Now I understand the truth, some pain don't heal", time: 95 },
  { text: "If everything's just happy, mm, that ain't real", time: 98 },
  { text: "That ain't real", time: 100.5 },
  { text: "I breathe everything out like a thousand times", time: 102 },
  { text: "Normal and special, they are just some lines", time: 105 },
  { text: "One deep sigh, then it slips away, fades away", time: 108 },
  { text: "What I try to keep never want to stay", time: 111.5 },
  { text: "Run away, pushin' me, pullin' me", time: 115 },
  { text: "Said you wanted all of me, but what is even all of me?", time: 116.8 },

  { text: "Suddenly, part of me is hauntin' me", time: 121 },
// --------------------------------------------------
  { text: "Heard the things they callin' me", time: 123.2 },
  { text: "What the hell you want from me?", time: 124.8 },

  { text: "Got me feelin' things unusual", time: 129.2 },
  { text: "And I live them all", time: 132.5 },

  { text: "Got me and my feelings up on this wall", time: 135 },
  { text: "And my knees-ees", time: 138.5 },




  { text: "Kerosene, dopamine, chemical induced", time: 141 },
  { text: "Fantasy and fame, yeah, the things we choose", time: 143.5 },
  { text: "Show me hate, show me love, make me bulletproof", time: 147 },
  { text: "Yeah, we call this thing normal", time: 150 },
  { text: "Run away out of sight, don't know what I want", time: 153 },
  { text: "Wish I had a minute just to turn me off", time: 155.5 },
  //ygvhjkhgfghjk
  { text: "Kerosene, dopamine, what I gotta do", time: 159.5 },
  { text: "Yeah, we call this thing normal", time: 163 },

  { text: "No, we, no, we, no, we call this thing normal", time: 166.5 },
  { text: "No, we, no, we, no, we call this thing normal", time: 169.5 },
  { text: "No, we, no, we, no, we call this thing normal", time: 173.5 }
];

// Animar las letras
function updateLyrics() {
  var time = audio.currentTime; // Mantiene los decimales exactos
  
  // Encuentra la línea actual
  var currentLineIndex = lyricsData.findIndex(
    (line) => time >= line.time
  );

  // Busca la última línea cuyo tiempo ya haya pasado
  var currentLine = null;
  for (var i = lyricsData.length - 1; i >= 0; i--) {
    if (time >= lyricsData[i].time) {
      currentLine = lyricsData[i];
      break;
    }
  }

  if (currentLine) {
    var duration = time - currentLine.time;
    var fadeInDuration = 0.5; // Duración de aparición suave en segundos

    // Transición de opacidad fluida
    var opacity = Math.min(1, duration / fadeInDuration);

    // Oculta la frase suavemente si pasan más de 4 segundos sin nueva línea
    if (duration > 4) {
      opacity = Math.max(0, 1 - (duration - 4) / 0.5);
    }

    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

// Se ejecuta cada 100 ms para mayor precisión en la animación
setInterval(updateLyrics, 100);

// Función para ocultar el título
function ocultarTitulo() {
  var titulos = document.querySelectorAll(".titulo");
  titulos.forEach((titulo) => {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  });
}

// Oculta el título a los 10 segundos de haber iniciado la canción
setTimeout(ocultarTitulo, 10000);
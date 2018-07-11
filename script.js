
/* .............Day 22 cours un fond blanc qui suit le mvmt de la souris.............. */

var triggers = document.querySelectorAll('a');
 var  surligne = document.createElement('span'); 
 //la méthode  document.createElement() crée un élément HTML du type spécifié par son tagName ( ici un span)
 surligne.classList.add('highlight'); // a qui on ajoute la classe highlight
 document.body.append(surligne); // qu'on va mettre dans le DOM 

function lienSurligner () {
  var liens = this.getBoundingClientRect() ; 
  // La méthode Element.getBoundingClientRect() renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage (viewport).
   var coords = {
      width: liens.width,
      height: liens.height,
      top: liens.top + window.scrollY,
      left: liens.left + window.scrollX // les coordonnées du liens 
             }; 
    surligne.style.width = `${coords.width}px`;  
    surligne.style.height = `${coords.height}px`;
    surligne.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
// qu'on écrit directement dans le CSS.
  }
 triggers.forEach(a => a.addEventListener('mouseenter', lienSurligner));
// Le (mouseenter) est un événement qui est  déclenché lorsqu'un périphérique de pointage est déplacé sur l'élément auquel l'écouteur est connecté.


/* ..................day 23 synthése de la parole ............................*/
  // SpeechSynthesisUtteranceinterface() de l' API Web Speech représente une requête vocale. Il contient le contenu que le service vocal doit lire et des informations sur la façon de le lire (par exemple, la langue, la hauteur et le volume).
  var msg = new SpeechSynthesisUtterance();
  let voices = [];
  var voicesDropdown = document.querySelector('[name="voice"]');
  var options = document.querySelectorAll('[type="range"], [name="text"]');
  var speakButton = document.querySelector('#speak');
  var stopButton = document.querySelector('#stop');
  msg.text = document.querySelector('[name="text"]').value;
// obtenir une liste de voix 
  function populateVoices() {
    voices = this.getVoices();  // getVoice() est une méthode qui renvoie une liste de l'objet SpeechSynthesisVoiceobjets représentant toutes les voix disponibles sur le périphérique en cours.
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('fr')) // on choisie celle avec le mot "fr"
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join(''); 
  }
// coix de la voix 
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle(); 
  }
// mise a jour de la nouvelle voix, et redémarrer avec les nouvelles propériétés, 
  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }
// pour modifier les options, on utilise la variable options 
  function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
  }
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));

/*................... day 24 Navbar fixe.................................. */

var nav = document.querySelector('#main');
var topOfNav = nav.offsetTop; // 
 
function fixNav() {  
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px'
    document.body.classList.add('fixed-nav')
    } else {
    document.body.style.paddingTop = 0
    document.body.classList.remove('fixed-nav')
    }
  }
window.addEventListener('scroll', fixNav);












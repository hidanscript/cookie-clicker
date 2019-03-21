const cookie_spr = document.getElementById('cookie-sprite');
const cookieCounter = document.getElementById('cookie-counter');
const cpsCounter = document.getElementById('cookies-ps-counter');
const gameVersion = "1.0.0";

//Sounds

//Variables
let cookies = 0;
let cookiesEarned = 0;
let cookiesPSecond = 0;
let cookiesPClick = 1;

function increaseCookies(value, isClicked) {

	cookies += value;
	cookiesEarned += value;
	cookieCounter.innerHTML = "Cookies: " + cookies;

	if(isClicked) {
		createGainText();
		const clickSound = new sound(getSound());
		clickSound.stop();
		clickSound.play();
		clickSound.delete();
		cookie_spr.classList.add('cookie-clicked');
		setTimeout(() => cookie_spr.classList.remove('cookie-clicked'), 100);
	}
}

function createGainText() {
	this.createGaintText = document.createElement("h3");
	this.createGaintText.innerHTML = "+" + cookiesPClick;
}

function sound(src) {

  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function(){
    this.sound.play();
  }

  this.stop = function(){
    this.sound.pause();
  }
  this.delete = function(){
  	this.sound = document.removeElement(this);
  }

}

let degrees = 0;

function rotateAnimation(value) {
	degrees += value;
	cookie_spr.style.transform = "rotate("+degrees+"deg) ";
}

function cpsIncreaser() {

	cpsCounter.innerHTML = "CpS: " + cookiesPSecond;
	setTimeout(function() {increaseCookies(cookiesPSecond, false); cpsIncreaser();}, 1000);

}

let lastTime = 0;
function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;
	rotateAnimation(0.2);

	requestAnimationFrame(update);
}

function getSound() {

	const randomSound = Math.floor(Math.random() * 8);
	let selectedSound = "";

	if(randomSound === 0) {
		randomSound++;
		selectedSound = "sounds/clickb" + randomSound + ".mp3";
		console.log(randomSound);
	} else if(randomSound < 8) {
		selectedSound = "sounds/clickb" + randomSound + ".mp3";
		console.log(randomSound);
	} else {
		randomSound--;
		selectedSound = "sounds/clickb" + randomSound + ".mp3";
		console.log(randomSound);
	}
	return selectedSound;
}


cookie_spr.addEventListener('click', function() {
	increaseCookies(cookiesPClick, true);
});

update();
cpsIncreaser();
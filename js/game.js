const cookie_spr = document.getElementById('cookie-sprite');
const cookieCounter = document.getElementById('cookie-counter');
const cpsCounter = document.getElementById('cookies-ps-counter');

//Sounds
let clickSound = new sound("sounds/clickb1.mp3")

//Variables
let cookies = 0;
let cookiesEarned = 0;
let cookiesPSecond = 1;
let cookiesPClick = 1;

function increaseCookies(value, isClicked) {

	cookies += value;
	cookiesEarned += value;
	cookieCounter.innerHTML = "Cookies: " + cookies;

	if(isClicked) {
		clickSound.play();
		cookie_spr.classList.add('cookie-clicked');
		setTimeout(() => cookie_spr.classList.remove('cookie-clicked'), 100);
	}
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


cookie_spr.addEventListener('click', function() {
	increaseCookies(cookiesPClick, true);
});

update();
cpsIncreaser();
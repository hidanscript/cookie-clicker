const cookie_spr = document.getElementById('cookie-sprite');
const cookieCounter = document.getElementById('cookie-counter');
const cpsCounter = document.getElementById('cookies-ps-counter');
const grandmaCounter_div = document.getElementById('grandma-counter');
const grandmaCounter_btn = document.getElementById('addGrandma');

const gameVersion = "1.0.0";

//Variables
let cookies = 0;
let cookiesEarned = 0;
let cookiesPSecond = 0;
let cookiesPClick = 1;
let degreesRotation = 0;
let lastTime = 0;

//Objects
let mouseProps = {
	x: 0,
	y: 0,
};
//Objects - CpS

const cursor = {
	val: 50,
	counter: 0,
	CpS: cookiesPClick / 10,
};

const grandma = {
	val: 100,
	counter: 0,
	CpS: 2,
};

//Cookies Management
function increaseCookies(value, isClicked) {

	cookies += value;
	cookiesEarned += value;
	cookieCounter.innerHTML = "Cookies: " + cookies;

	if(isClicked) {
		createCookieGainText();
		const clickSound = new sound(getSound());
		clickSound.stop();
		clickSound.play();
		cookie_spr.classList.add('cookie-clicked');
		setTimeout(() => cookie_spr.classList.remove('cookie-clicked'), 100);
	}
}

function cpsIncreaser() {

	cpsCounter.innerHTML = "CpS: " + cookiesPSecond;
	setTimeout(function() {increaseCookies(cookiesPSecond, false); cpsIncreaser();}, 1000);

}

function createCookieGainText() {
	let createGainText = document.createElement("p");

	createGainText.innerHTML = "+" + cookiesPClick;
	createGainText.style.position = "absolute";
	createGainText.style.left = mouseProps.x;
	createGainText.style.top = mouseProps.y;
	console.log("Text created! x: " + createGainText.style.left + " y: " + createGainText.style.top);
}

function buyBuilding(object) {

	if(object.val <= cookies) {
		//plays the sound
		const clickSound = new sound('sounds/buy2.mp3');
		clickSound.stop();
		clickSound.play();
		//Apply stats
		cookies -= object.val;
		cookiesPSecond += object.CpS;
		object.val += Math.floor(object.val / 3);
		object.counter++;
		cookieCounter.innerHTML = "Cookies: " + cookies;
		cpsCounter.innerHTML = "CpS: " + cookiesPSecond;
	}

}

//Objects and Sounds

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

function getSound() {

	const randomSound = Math.floor(Math.random() * 8);
	let selectedSound = "";

	if(randomSound === 0) {
		randomSound++;
		selectedSound = "sounds/clickb" + randomSound + ".mp3";
	} else if(randomSound < 8) {
		selectedSound = "sounds/clickb" + randomSound + ".mp3";
	} else {
		randomSound--;
		selectedSound = "sounds/clickb" + randomSound + ".mp3";
	}
	return selectedSound;
}

//Animations
function rotateAnimation(value) {
	degreesRotation += value;
	cookie_spr.style.transform = "rotate("+degreesRotation+"deg) ";
}

//Update
function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;
	rotateAnimation(0.2);

	requestAnimationFrame(update);
}

//Init this thing.
window.addEventListener('mousemove', function(e) {
	mouseProps.x = e.x;
	mouseProps.y = e.y;
});

cookie_spr.addEventListener('click', function() {
	increaseCookies(cookiesPClick, true);
});

grandmaCounter_btn.addEventListener('click', function() {
	buyBuilding(grandma);
	grandmaCounter_div.innerHTML = "Grandmas: "+ grandma.counter;
	grandmaCounter_btn.innerHTML = "Grandma: " + grandma.val + " cookies<br>CpS: +" + grandma.CpS;
});

grandmaCounter_btn.innerHTML = "Grandma: " + grandma.val + " cookies<br>CpS: +" + grandma.CpS;

update();
cpsIncreaser();
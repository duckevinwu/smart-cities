/* This controls the typing animation */
var string = "We post smart city challenges so you can solve them."; /* type your text here */
var array = string.split("");
var timer;

function frameLooper () {
	if (array.length > 0) {
		document.getElementById("text").innerHTML += array.shift();
	} else {
		clearTimeout(timer);
			}
	loopTimer = setTimeout('frameLooper()',60); /* change 70 for speed */

}
frameLooper();

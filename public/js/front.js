let loader = document.querySelector('.loader');
let index_screen = document.querySelector('.index_screen');
let after_login_screen = document.querySelector('.after_login_screen');
let ready_screen = document.querySelector('.ready_screen');
let meet_screen = document.querySelector('.meet_screen');
let bigDiv = document.querySelector('.big_div');
let diff_height = -71;
window.setInterval(() => {
	bigDiv.style.transform = `translateY(${diff_height}px)`;
	diff_height -= 71;
	if (diff_height < -214) {
		diff_height = 0;
	}
}, 3000);

$(document).ready(function () {
	$('#modal1').modal();
	$('#modal2').modal();
	
	let butColCheck = 0;
	$(".theme-switcher").click(function() {
		if (butColCheck == 0) {
			$(this).css("background-color", "black");
			$(this).css("color", "white");
			$(this).html("Dark");
			$(".whiteBoard").css("background-color", "black");
			butColCheck = 1;
		}
		else {
			$(this).css("background-color", "white");
			$(this).css("color", "black");
			$(this).html("Light");
			$(".whiteBoard").css("background-color", "white");
			butColCheck = 0;
		}
	});
});

function loaderOn() {
	loader.classList.remove('fade_out');
	loader.classList.add('fade_in');
}
function loaderOut() {
	loader.classList.remove('fade_in');
	loader.classList.add('fade_out');
}
function show_screen(screen_name) {
	index_screen.classList.add('hidden');
	after_login_screen.classList.add('hidden');
	ready_screen.classList.add('hidden');
	meet_screen.classList.add('hidden');
	loaderOn();
	window.setTimeout(() => {
		loaderOut();
	}, 600);
	screen_name.classList.remove('hidden');
}
function displayMessageIncoming(user)
{
	alert(user);
}
function displayMessageOutgoing(user)
{
	alert(user);
}
function displayRoomUsers(users)
{
	
}
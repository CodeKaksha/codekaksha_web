let loader = document.querySelector('.loader');
let index_screen = document.querySelector('.index_screen');
let after_login_screen = document.querySelector('.after_login_screen');
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
	loaderOn();
	window.setTimeout(() => {
		loaderOut();
	}, 1500);
	screen_name.classList.remove('hidden');
}
document.querySelector('.createRoom').addEventListener("click",(e)=>{
    e.preventDefault();
    
})
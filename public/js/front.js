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
	
	document.addEventListener('DOMContentLoaded', function() {
		var elems = document.querySelectorAll('.fixed-action-btn');
		var instances = M.FloatingActionButton.init(elems, options);
	  });
	
	  // Or with jQuery
	
	  $(document).ready(function(){
		$('.fixed-action-btn').floatingActionButton();
	  });
			
	$('#modal1').modal();
	$('#modal2').modal();
	$('#modal3').modal();
	$('#modal12').modal();
	let butColCheck = 0;
	$(".theme-switcher").click(function () {
		if (butColCheck == 0) {
			$(this).css("background-color", "black");
			$(this).css("color", "white");
			$(this).html("Dark");
			$(".whiteBoard").css("background-color", "black");
			butColCheck = 1;
		} else {
			$(this).css("background-color", "white");
			$(this).css("color", "black");
			$(this).html("Light");
			$(".whiteBoard").css("background-color", "white");
			butColCheck = 0;
		}
	});

	setTimeout(toggle, 3000);
	function toggle(){
		$('.mute-end-cam').fadeOut("slow");
	}

	var timer = null;
	$(window).on('mousemove', function(){
		$('.mute-end-cam').fadeIn("slow");
		clearTimeout(timer);
		timer = setTimeout(toggle, 3000)
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

function displayMessageIncoming(user) {
	// alert(user);
	let div = document.createElement('div');
	div.className = 'notification';
	div.innerHTML = (`${user} has joined the coderence!`)
	document.body.appendChild(div)
}

function displayMessageOutgoing(user) {
	// alert(user);
	let div = document.createElement('div');
	div.className = 'notification';
	div.innerHTML = (`${user} has left the coderence!`)
	document.body.appendChild(div)
}

function displayRoomUsers(users) {

}

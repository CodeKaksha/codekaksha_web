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
	// $('.fixed-action-btn').floatingActionButton();
	var elems=document.querySelectorAll('.fixed-action-btn');
	var instances=M.FloatingActionButton.init(elems,{
		// direction:'right',
		// toolbarEnabled : true
	});

	$('#modal1').modal();
	$('#modal2').modal();
	$('#modal3').modal();
	$('#modal12').modal();

	$(".option-menu").click(function () {
		$(".menu-open").removeClass("visible");
		$(".menu-open").fadeToggle();
	});

	$(".end-meet").click(function() {
		$(".mute-end-cam").removeClass("visible");
		$(".mute-end-cam").fadeToggle();
		$(".menu-open").fadeToggle();
	});

	var vidHide = 0;
	$(".video-hide").click(function() {
		$(".video-table").fadeToggle();
		$(".menu-open").fadeToggle();
		if (vidHide == 0) {
			$(".vid-hid-text").text("Show People");
			vidHide = 1;
		} else {
			$(".vid-hid-text").text("Hide People");
			vidHide = 0;
		}
	});

	$(".chat").click(function() {
		$(".option-menu").fadeToggle();
		$(".menu-open").fadeToggle();
		$(".chat-box").removeClass("visible");
	});

	$(".close-msg").click(function() {
		$(".chat-box").addClass("visible");
		$(".option-menu").fadeToggle();
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
let ready_btn = document.querySelector('.ready');
ready_btn.addEventListener('click', (e) => {
	e.preventDefault();
	show_screen(meet_screen);
	whiteBoard();
	video();
	editor();
});

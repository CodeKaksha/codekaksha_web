function editor() {
	var e = ace.edit('jsEditor');
	e.getSession().setMode('ace/mode/c_cpp');
	e.setTheme('ace/theme/terminal');
}

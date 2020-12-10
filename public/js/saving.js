document.querySelector('.download').addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("hey")
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save('meet.pdf')
    // let meet_screen=document.getElementById('meet_screen');
    // meet_screen.focus();
    // meet_screen.contentWindow.print();
    window.print();
})
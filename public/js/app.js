var socket = io();
document.querySelector('#enterRoom').addEventListener('submit',(e)=>{
    e.preventDefault();
    loaderOn();
    let roomIdEntered=document.querySelector('#roomIdEntered').value;
    socket.emit('checkId',roomIdEntered);
    socket.on('roomIdChecked',(check)=>{
        console.log(check);
        if(check)
        {
            loaderOut();
            ready(roomIdEntered);
            show_screen(ready_screen);
            videoOnlyUser(`videoBeforeJoin`);
        }
        else{
            alert('There is no such room available!');
            loaderOut();    
        }
    })
})
document.querySelector('.createRoom').addEventListener('click', (e) => {
	e.preventDefault();
	socket.emit('give_id');
    loaderOn();
    socket.on('rec_id',(id)=>{
        console.log(id);
        ready(id);
        show_screen(ready_screen);
        videoOnlyUser(`videoBeforeJoin`);
    })
});


var socket = io({transports: ['websocket'], upgrade: false});
let live =0;
document.querySelector('#enterRoom').addEventListener('submit',(e)=>{
    e.preventDefault();
    loaderOn();
    let roomIdEntered=document.querySelector('#roomIdEntered').value;
    socket.emit('checkId',roomIdEntered);
    socket.on('roomIdChecked',(check)=>{
        if(check)
        {
            loaderOut();
            ready(roomIdEntered,0,0);   
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
        ready(id,0,1);
        show_screen(ready_screen);
        videoOnlyUser(`videoBeforeJoin`);
    })
});

document.querySelector('.golive-but').addEventListener('click', (e) => {
	e.preventDefault();
	socket.emit('give_id');
    loaderOn();
    socket.on('rec_id',(id)=>{
        ready(id,0,1);
        live=1;
        show_screen(ready_screen);
        videoOnlyUser(`videoBeforeJoin`);
    })
});
socket.on("user-disconnected", (username) => {
    displayMessageOutgoing(username);
  });



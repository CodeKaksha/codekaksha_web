var socket=io()
const chatBody = document.querySelector('.chat-body');

const chatForm=document.getElementById('chat-form');

// MESSAGE FROM SERVER
socket.on('message',(message)=>{
    console.log(message);
    outputMessage(message);
    // M.toast({html:'You have new messages' , classes:'rounded' , displayLength:3000})
    chatBody.scrollTop=chatBody.scrollHeight;

})



socket.on('toast',(toastMessage)=>{
    M.toast({html:toastMessage , classes:'rounded' , displayLength:3000})
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const userMessage=e.target.elements.msg.value;
    
    // console.log(userMessage)

    // emit message to server
    socket.emit('chatMessage',userMessage)
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})

// DISPLAY OUTPUT MESSAGE TO CHAT BOX
function outputMessage(userMessage)
{
    const div=document.createElement('div')             // meaning of div.classList  
    div.classList.add('message');                       // need to be studied
    div.innerHTML=`<p><b>${userMessage.username} ${userMessage.time}</b></p>         
    <p>
      ${userMessage.text}
    </p>`;  

    document.querySelector('.chat-body').appendChild(div);
}
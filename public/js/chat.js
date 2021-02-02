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



socket.on("roomUsers", (userForRoom) => {
    console.log(userForRoom)
    displayRoomUsers(userForRoom);
  });
  function displayRoomUsers(users) {
    document.querySelector(".user-list").innerHTML='';
    for(let i=0;i<users.length;i++){
    //   if(users[i].id==user_email)
    //   {
    //     giveControls();
    //   }
    //   else if(user[i].isAdmin){
    //     giveAllControls();
    //   }
    //   else{
  
        let div = document.createElement("div");
        div.className = "user-list-row";
        div.innerHTML = `
        <span class="user-pic">
                      <img src="${users[i].displayPic}" class="displayPic user-photo">
                    </span>
                    <span class="user-name">
                    ${users[i].username}
                    </span>
                    <span class="user-mic">
                      <i class="material-icons">
                        mic_off
                      </i>
                    </span>
                    <span class="user-cam">
                      <i class="material-icons">
                        videocam_off
                      </i>
                    </span>
                    <span class="user-kick">
                      <i class="material-icons">
                        person_remove
                      </i>
                    </span>`;
          document.querySelector(".user-list").appendChild(div)
    //   }
    }
  }
  function giveControls()
  {
  
  }
  function giveAllControls(){
  
  }
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
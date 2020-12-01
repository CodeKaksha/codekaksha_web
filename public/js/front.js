let bigDiv=document.querySelector('.big_div');
let diff_height=-71;
window.setInterval(()=>{
    bigDiv.style.transform=`translateY(${diff_height}px)`;
    diff_height-=71;
    if(diff_height<-214)
    {
        diff_height=0;
    }
},3000)

$(document).ready(function(){
    $('#modal1').modal();
    $('#modal2').modal();
  });

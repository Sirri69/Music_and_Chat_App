var ID = '_' + Math.random().toString(36).substr(2, 9);

var socket = io('https://hackathon-code-pranav.shanon333.repl.co');

socket.on('connect', function() {
  socket.emit('my event', {data: 'I\'m connected!'});
	socket.emit('join', r_id);
});

window.onunload = ()=>socket.emit('remove_from_room', r_id)


socket.on('message', function(data){
  var txt_class = ''
  if (data.ID == ID){
    txt_class = 'sent'
  }
  $(".chat-box").append('<div class="'+txt_class+'"><div class="card msg"><div class="card-body '+txt_class+'" "><h6 class="card-subtitle mb-2 text-muted">'+data['u_name']+'</h6><hr><span>'+data.msg+'<span></div></div><div><br>')
  $(".chat-box").scrollTop($(".chat-box")[0].scrollHeight);
});

$("#chat-form").on('submit', function(e){
  e.preventDefault();
  socket.emit('user_msg',{'ID':ID,'u_name':u_name,'msg':$("#text-box").val(), 'room':r_id});
	console.log($("#username").val());
  $("#text-box").val('')
});

socket.on('command', function(handler){
  var player = document.getElementById('song');
  console.log(handler.command)
  if(handler['command'] == '!p'){
    player.src = handler.link;
    player.play();
  }
  else if(handler['command'] == '!ps'){
    if (player.paused){
      player.play();
    }
    else{
      player.pause();
    }
  }

});




// window.addEventListener("beforeunload", function (e) {
//   remove_from_room();

//   (e || window.event).returnValue = null;
//   return null;
// });
var ID = '_' + Math.random().toString(36).substr(2, 9);

var socket = io('https://hackathon-code-pranav.shanon333.repl.co');

socket.on('connect', function() {
  socket.emit('my event', {data: 'I\'m connected!'});
	socket.emit('join', '{{room_id}}');
});

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
  socket.emit('user_msg',{'ID':ID,'u_name':u_name,'msg':$("#text-box").val(), 'room':'{{room_id}}'});
	console.log($("#username").val());
  $("#text-box").val('')
});
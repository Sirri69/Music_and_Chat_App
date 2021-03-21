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
  command = handler['command'].split(' ')
  if(command[0] == '!p'){
    player.src = handler.link;
    player.play();
  }
  else if(command[0] == '!ps'){
    if (player.paused){
      player.play();
    }
    else{
      player.pause();
    }
  }
  else if (command[0] == '!v'){
    console.log(command);
    try{
      if (eval('player.volume + (command[1]/100)')>1.0){
        player.volume = 1;
      }
      else if (eval('player.volume + (command[1]/100)')<0.0){
        player.volume = 0;
      }
    
      else{
      eval('player.volume = player.volume + (command[1]/100)');
      console.log(player.volume);
      }
    }
    catch (e){}
    finally{
    socket.emit('user_msg', {'ID':'BOT', 'u_name':'BOT', 'msg':'Current Volume is:- '+Math.round(player.volume*100,2), 'room':r_id});
    }
  }
  else if(command[0] == '!sk'){
    console.log(command);
    if (eval('player.currentTime + (command[1])')>player.duration){
      player.currentTime = player.duration;
    }
    else if(eval('player.currentTime + (command[1])')<0){
      player.currentTime = 0;
    }
    else{
      console.log(eval('Math.floor(player.currentTime + (command[1]/1))'));
      eval('player.currentTime = Math.floor(player.currentTime + (command[1]/1))');
    }
    console.log(player.currentTime);

  }
});
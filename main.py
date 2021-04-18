from flask import Flask, render_template, Response, request, send_file, url_for, redirect, session
from flask_socketio import SocketIO, emit, join_room
from pytube import YouTube

import html
import os
import requests
import youtube_dl
import glob

ROOMS={}


app = Flask(__name__)
app.config['SECRET_KEY'] = '!S3CReT'

global u_name
u_name = 'Anyonmous'
socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/')
def index():
  return render_template('index.html')


@app.route('/favicon.ico')
def favicon():
	return 'FAVICON'


@app.route('/join_room', methods=['GET'])
def enter_room():
  global u_name
  
  u_name = request.args.get('u_name')
  r_id = request.args.get('r_id')
  
  if len(u_name) == 0:
    u_name = 'ANYONMOUS'
  if len(r_id) == 0:
   r_id = gen_code()
  return redirect('/'+str(r_id))

  if len(r_id) != 8:
    return 'INVALID ROOM ID'
  elif r_id:
    if r_id not in ROOMS:
      ROOMS[r_id] = 0
    ROOMS[r_id] += 1
    print(ROOMS)
    return redirect('/'+str(r_id))



global rid
rid = ''

@app.route('/<room_id>')
def main_page(room_id):
  if len(room_id) != 8:
    return 'INVALID ROOM ID'
  global u_name

  print('U_NAME'+str(u_name))
  return render_template('chat.html', room_id=room_id, u_name=u_name)





def yt_download(link,name):
  '''
  returns URL for the song on the local server
  '''
  
  ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': f'static/songs/{name}.wav',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'wav',
        'preferredquality': '192',
      }],
    }
  with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download([link])
  
  return f'https://hackathon-code-pranav.shanon333.repl.co/static/songs/{name}.wav'



@app.route("/get_song", methods=['GET'])
def something():
	url = request.args.get('link')
	if url == None:
		return ''
  # link = request.args.get('name')
	name = request.args.get('name')
	url=yt_download(url,name)
	range_header = request.headers.get("Range", None)
	print(request.headers)
	MAX_SIZE = int(1024 * 1024 * 3)

	from_bytes, until_bytes = 0, MAX_SIZE

	if range_header:  # Client has requested for partial content
		from_bytes, until_bytes = range_header.replace("bytes=", "").split("-")
		if not until_bytes:
			# This will restrict maximum size
			until_bytes = int(from_bytes) + MAX_SIZE

	headers = {"Range": "bytes=%s-%s" % (from_bytes, until_bytes)}
	r = requests.get(url, headers=headers)
	data = r.content

	rv = Response(data, 206, mimetype="audio/x-wav", direct_passthrough=True)
	rv.headers.add("Content-Range", r.headers.get("Content-Range"))
	print(rv.headers)
	return rv


@app.route("/song")
def song():
	return send_file('song.mp3')

import random, string
def gen_code():
  x = ''.join(random.choices(string.ascii_letters + string.digits,k=8))
  if x not in ROOMS:
    return x

  gen_code()


@app.after_request
def after_request(response):
	response.headers.add('Accept-Ranges', 'bytes')
	return response


@socketio.on('my event')
def handle_my_custom_event(json):
	print('received json: ' + str(json))


@socketio.on('connect')
def c():
	print('New connection')

@socketio.on('disconnect')
def d():
  print('disconnected')

@socketio.on('remove_from_room')
def rem(r_id):
  ROOMS[r_id] -=1 #UNSTABLE CODE


@socketio.on('join')
def on_join(r_id):
  if r_id not in ROOMS.keys():
    ROOMS[r_id] = 0
  join_room(r_id)
  ROOMS[r_id] += 1
  help_msg = f'''
  Your Room ID is:- {r_id}. Share it with your friends so they can join too ! <br> <br>
  <b>COMMANDS:-</b> <br> <hr>
  <i>
  !p <YouTube link> :: Plays the song from the link in the room. <br>
  !ps :: Pause/Play the song <br>
  !v ±<integer> :: Increases or Decreases volume <br>
  !sk ±<interger> :: Seeks song to ahead or behind by given seconds.
  </i>

  '''
  emit('message', {'ID':'BOT', 'u_name':'BOT', 'msg':help_msg, 'room':r_id})



def handle_Commands(data):
  link = ''
  
  if data['msg'].split(' ')[0] == '!p':
    print('COMMAND:---'+data['msg'])
    for filename in glob.glob(f"static/songs/{data['room']}*"):
      os.remove(filename) 
    link = data['msg'][2:].strip()
    emit('message', {'ID':'BOT', 'u_name':'BOT', 'msg':'Now playing:-- <i>'+ YouTube(link).title +'. </i>', 'room':data['room']}, room=data['room'])
    link = yt_download(link,str(data['room'])+'_'+link[len(link)-11:])
  emit('command', {'command':data['msg'].lower(), 'link':link}, room=data['room'])

@socketio.on('user_msg')
def handle(data):
  print('IN HANDLE')
  print('ROOM_ID '+rid)
  data['msg'] = html.escape(data['msg'])
  emit('message', data, room=data['room'])
  if data['msg'][0] == '!':
    handle_Commands(data)
    


socketio.run(app, '0.0.0.0', 8080)

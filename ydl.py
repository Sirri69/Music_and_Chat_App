from __future__ import unicode_literals
import youtube_dl


ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': 'static/songs/song.wav',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'wav',
        'preferredquality': '192',
    }],
}
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(['https://www.youtube.com/watch?v=Fvu74JRhLAs'])



from pydub import AudioSegment

# files
src = "test.mp3"
dst = "test.wav"

# convert wav to mp3
sound = AudioSegment.from_mp3(src)
sound.export(dst, format="wav")










# def yt_download(link,name):
#   ydl_opts = {
#     'format': 'bestaudio/best',
#     'outtmpl': f'static/songs/{name}.wav',
#     'postprocessors': [{
#         'key': 'FFmpegExtractAudio',
#         'preferredcodec': 'wav',
#         'preferredquality': '192',
#       }],
#     }
#   with youtube_dl.YoutubeDL(ydl_opts) as ydl:
#     ydl.download([link])
  
#   return f'https://hackathon-code.shanon333.repl.co/static/songs/{name}.wav'



url = request.args['link']
name = request.args['name']
from random import choice

SOUND_CLIPS = "add_resource_dictionary: here"

IP_API = "https://api.bigdatacloud.net/data/client-ip" 

async def fetch_as(uri, what):
	response = await fetch(uri)
	if what == "json":
		return await response.json()
	elif what == "arrayBuffer":
		return await response.arrayBuffer()
	else:
		assert False

class FemboyMoanMyIp:
	NOT_PLAYING = 0
	PLAYING = 1
	STALLED = 2

	def __init__(self, sound_sequence_gen):
		self.sound_sequence_gen = sound_sequence_gen
		self.sound_sequence = next(self.sound_sequence_gen)
		
		self.ctx = __new__(AudioContext())
		
		self.state = FemboyMoanMyIp.NOT_PLAYING
		self.playback_pos = 0
		self.next_clip = None
		
		self.prefetch(0)
	
	async def prefetch(self, idx):
		uri = self.sound_sequence[idx]
		data = await fetch_as(uri, "arrayBuffer")
		clip = await self.ctx.decodeAudioData(data)
		
		self.on_fetch_complete(clip)
	
	def play_clip(self, clip):
		src = self.ctx.createBufferSource()
		src.buffer = clip
		src.connect(self.ctx.destination)
		src.addEventListener("ended", self.play_next_clip)
		src.start(0)
	
	def advance(self):
		self.playback_pos += 1
		if self.playback_pos < len(self.sound_sequence):
			self.prefetch(self.playback_pos)
		else:
			self.sound_sequence = next(self.sound_sequence_gen)
			self.playback_pos = 0
			self.prefetch(0)
	
	def on_fetch_complete(self, clip):
		if self.state == FemboyMoanMyIp.STALLED:
			self.state = FemboyMoanMyIp.PLAYING
			self.play_clip(clip)
			self.advance()
		else:
			self.next_clip = clip
	
	def play_next_clip(self):
		if self.playback_pos == 0 and self.state != FemboyMoanMyIp.NOT_PLAYING:
			self.state = FemboyMoanMyIp.NOT_PLAYING
			return
		
		if self.next_clip:
			self.state = FemboyMoanMyIp.PLAYING
			self.play_clip(self.next_clip)
			self.next_clip = None
			self.advance()
		else:
			self.state = FemboyMoanMyIp.STALLED
	
	def go(self):
		if self.state == FemboyMoanMyIp.NOT_PLAYING:
			self.play_next_clip()

def sound_sequences(ip):
	while True:
		yield [choice(SOUND_CLIPS[c]) for c in ip]

async def init():
	obj = await fetch_as(IP_API, "json")
	ip = obj["ipString"]
	
	document.getElementById("bind-ip").textContent = ip
	
	sound_sequence_gen = sound_sequences(ip)
	control = FemboyMoanMyIp(sound_sequence_gen)
	document.getElementById("bind-button").addEventListener("click", control.go)

init()
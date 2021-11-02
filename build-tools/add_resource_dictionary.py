from collections import defaultdict
from os import listdir
from sys import argv as args, exit

RESOURCE_DIR = "rsrc/SoundClips"
RESOURCE_URI_PREFIX = "SoundClips/"

NAME_TO_KEY = {
	"zero" : "0",
	"one"  : "1",
	"two"  : "2",
	"three": "3",
	"four" : "4",
	"five" : "5",
	"six"  : "6",
	"seven": "7",
	"eight": "8",
	"nine" : "9",
	"dot"  : ".",
}

INSERTION_FLAG = '"add_resource_dictionary: here"'

def key_for_name(name):
	name = name.lower()
	for key, value in NAME_TO_KEY.items():
		if key in name:
			return value
	return None

def make_resource_dictionary():
	result = defaultdict(list)
	for name in listdir(RESOURCE_DIR):
		key = key_for_name(name)
		if key:
			result[key].append(RESOURCE_URI_PREFIX + name)
	return repr(dict(result))

def main():
	if len(args) < 3:
		print("Usage: add_resource_dictionary <source.py> <target.py>")
		exit(-1)
	
	src_path = args[1]
	tgt_path = args[2]
	
	rsrc = make_resource_dictionary()
	
	with open(src_path) as src:
		with open(tgt_path, "w") as tgt:
			for line in src:
				if INSERTION_FLAG in line:
					line = line.replace(INSERTION_FLAG, rsrc)
				tgt.write(line)

if __name__ == "__main__":
	main()
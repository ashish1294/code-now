#!/usr/bin/env python

# May God Bless Us All

import struct
import sys
import subprocess
import string
# Helper function that sends a message to the chrome-plugin.
def send_message(message):
  sys.stdout.write(struct.pack('I', len(message)))
  sys.stdout.write(message)
  sys.stdout.flush()

# Functiom that reads messages from the chrome-plugin
def read_func():
  while 1:
    text_length_bytes = sys.stdin.read(4)
    if len(text_length_bytes) == 0:
      sys.exit(0)

    text_length = struct.unpack('i', text_length_bytes)[0]

    text = sys.stdin.read(text_length).decode('utf-8')

    text = string.replace(text,"problem_name","")
    text = string.replace(text,"problem_url","")
    text = string.replace(text,"user_name","")
    text = string.replace(text,"lang","")
    text = string.replace(text,"\"\":\"","")
    text = string.replace(text,"{","")
    text = string.replace(text,"}","")
    text = string.replace(text,"\"","")
    info = string.split(text,",")

    try:
      sc_out = subprocess.check_output(['/home/ashish/.config/google-chrome/NativeMessagingHosts/code-now/host_program.sh', info[0], info[1], info[2], info[3]])
    except subprocess.CalledProcessError, e:
      send_message('{"text": "Bad Settings. Please Reinstall !!"}')

def Main():
  read_func()
  sys.exit(0)
if __name__ == '__main__':
  Main()

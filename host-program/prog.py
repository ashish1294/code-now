#!/usr/bin/env python

# May God Bless Us All

import struct
import sys
import subprocess
import string
import re
import os

# Helper function that sends a message to the chrome-plugin.
def send_message(message):
  sys.stdout.write(struct.pack('I', len(message)))
  sys.stdout.write(message)
  sys.stdout.flush()

# Function that reads messages from the chrome-plugin
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

    info[0] = re.sub('[ ]+', ' ', info[0])
    filename = re.sub(' ', '_', info[0])
    filename = "DEFAULT_SOLUTION_PATH" + os.sep + filename + "." + info[3]

    if not os.path.isfile(filename) :
        file_content = "/*\n\tProblem Name = " + info[0] + "\n\tProblem Link = " + info[1] + "\n\tUser = " + info[2] + "\n*/\n"
        with open(os.path.join(os.path.dirname(__file__),info[3] + "_template." + info[3]), "r") as myfile:
            file_content = file_content + myfile.read()
        fp = open(filename, "w")
        fp.write(file_content)
        fp.close()
    
    if info[3] == "java" :
        try:
            exit_code = subprocess.check_output(['JAVA_IDE', filename])
        except subprocess.CalledProcessError, e:
            send_message('{"text": "Bad Settings. Please Reinstall !!"}')

    elif info[3] == "cpp" :
        try:
            exit_code = subprocess.check_output(['CPP_IDE', filename])
        except subprocess.CalledProcessError, e:
            send_message('{"text": "Bad Settings. Please Reinstall !!"}')

    elif info[3] == "c" :
        try:
            exit_code = subprocess.check_output(['C_IDE', filename])
        except subprocess.CalledProcessError, e:
            send_message('{"text": "Bad Settings. Please Reinstall !!"}')

    elif info[3] == "python" :
        try:
            exit_code = subprocess.check_output(['PYTHON_IDE', filename])
        except subprocess.CalledProcessError, e:
            send_message('{"text": "Bad Settings. Please Reinstall !!"}')

def Main():
  read_func()
  sys.exit(0)
if __name__ == '__main__':
  Main()

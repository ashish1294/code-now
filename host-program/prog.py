#!/usr/bin/env python

# May God Bless Us All
import struct
import sys
import subprocess
import re
import os
import json

# Constants
COMMENT_STR = "\n\tProblem Name = {0}\n\tProblem Link = {1}\n\tUser = {2}\n"
PY_COMMENT_START = "'''"
PY_COMMENT_END = "'''"
CPP_JAVA_START = "/*"
CPP_JAVA_END = "*/"
IDE = {
    'c' : 'C_IDE',
    'cpp' : 'CPP_IDE',
    'java' : 'JAVA_IDE',
    'py': 'PYTHON_IDE'
}

def construct_heading_comment(prob):
  '''
    This function constructs the heading comment on the solution file depending
    on the problem parameters
    Args:
      prob: Problem JSON object
    Return:
      A properly formatted comment string
  '''
  # Adding problem parameters to comment
  comment = COMMENT_STR.format(
      prob['problem_name'],
      prob['problem_url'],
      prob['user_name'],
  )

  # Enclosing comments using appropriate syntax depending on langauge
  if prob['lang'] == 'py':
    comment = PY_COMMENT_START + comment + PY_COMMENT_END + '\n\n'
  else:
    comment = CPP_JAVA_START + comment + CPP_JAVA_END + '\n\n'
    print comment
  return comment

# Helper function that sends a message to the chrome-plugin.
def send_message(message):
  '''
    This function writes a message to the stdout which can be read by Chrome
    Args:
      string: The message string to be written
  '''
  message = '{"msg": "%s"}' % message
  sys.stdout.write(struct.pack('I', len(message)))
  sys.stdout.write(message)
  sys.stdout.flush()

# Function that reads messages from the chrome-plugin
def read_func():
  '''
    This function read the message sent by chrome and takes required action
  '''
  # Read Message from stdin
  text_length_bytes = sys.stdin.read(4)
  if len(text_length_bytes) == 0:
    sys.exit(0)

  # Parse the message
  text_length = struct.unpack('i', text_length_bytes)[0]
  text = sys.stdin.read(text_length).decode('utf-8')
  prob = json.loads(text)

  # Format Problem Name so that it's suitable for file name
  prob['problem_name'] = re.sub('[ ]+', ' ', prob['problem_name'])
  filename = re.sub(' ', '_', prob['problem_name'])
  filename = "DEFAULT_SOLUTION_PATH" + os.sep + filename + "." + prob['lang']

  try:
    if not os.path.isfile(filename):
      # Create Solution File
      file_content = construct_heading_comment(prob)
      file_name = '{0}_template.{0}'.format(prob['lang'])
      file_dir = os.path.dirname(__file__)
      with open(os.path.join(file_dir, file_name), "r") as template_file:
        file_content = file_content + template_file.read()
      file_stream = open(filename, "w")
      file_stream.write(file_content)
      file_stream.close()

    # Open the file using the IDE
    subprocess.Popen([IDE[prob['lang']], filename])
    send_message("Subprocess started for %s with file %s" %
                 (IDE[prob['lang']], filename))
  except Exception, err: #pylint: disable=W0703
    send_message("Unable to start Subprocess!" + str(err))

if __name__ == '__main__':
  read_func()
  sys.exit(0)

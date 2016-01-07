#!/usr/bin/env python

# May God Bless Us All
import struct, sys, subprocess, string, re, os, json

# Constants
COMMENT_STR = "{3}\n\tProblem Name = {0}\n\tProblem Link = {1}\n\tUser = {2}\n{4}\n"
PY_COMMENT_START = "'''"
PY_COMMENT_END = "'''"
CPP_JAVA_START = "/*"
CPP_JAVA_END = '*/'
IDE = {'c' : 'C_IDE', 'cpp' : 'CPP_IDE', 'java' : 'JAVA_IDE', 'py': 'PYTHON_IDE'}

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
    prob = json.loads(text)

    prob['problem_name'] = re.sub('[ ]+', ' ', prob['problem_name'])
    filename = re.sub(' ', '_', prob['problem_name'])
    filename = "DEFAULT_SOLUTION_PATH" + os.sep + filename + "." + prob['lang']

    if not os.path.isfile(filename) :
      if prob['lang'] == 'py':
        file_content = COMMENT_STR.format(
          prob['problem_name'],
          prob['problem_url'],
          prob['user_name'],
          PY_COMMENT_START,
          PY_COMMENT_END
        )
      else:
        file_content = COMMENT_STR.format(
          prob['problem_name'],
          prob['problem_url'],
          prob['user_name'],
          CPP_JAVA_START,
          CPP_JAVA_END
        )
      file_name = '{0}_template.{0}'.format(prob['lang'])
      file_dir = os.path.dirname(__file__)
      with open(os.path.join(file_dir, file_name), "r") as template_file:
        file_content = file_content + template_file.read()
      fp = open(filename, "w")
      fp.write(file_content)
      fp.close()

    try:
      exit_code = subprocess.Popen([IDE[prob['lang']], filename])
    except Exception, e:
      send_message('An Error Has Occured !')

if __name__ == '__main__':
  read_func()
  sys.exit(0)

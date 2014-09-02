#!/bin/bash
DEFAULT_FILE_PATH="/home/ashish/Documents"
C_IDE="geany"
CPP_IDE="codeblocks"
JAVA_IDE="gedit"
C_TEMPLATE_FILE="/home/ashish/.config/google-chrome/NativeMessagingHosts/code-now/c_template.c"
CPP_TEMPLATE_FILE="/home/ashish/.config/google-chrome/NativeMessagingHosts/code-now/cpp_template.cpp"
JAVA_TEMPLATE_FILE="/home/ashish/.config/google-chrome/NativeMessagingHosts/code-now/java_template.java"
success=1
problem_name=$1;
problem_link=$2;
user_name=$3;
lang=$4;

problem_name="`echo $problem_name | sed 's/[ ]+/ /g'`"
file_name="$DEFAULT_FILE_PATH/$problem_name.$lang"
file_name="`echo $file_name | tr ' ' '_'`"

if [ $lang = 'java' ]
then
	if [ ! -f $file_name ]
	then
		file_content="/*\n\tProblem Name = $problem_name\n\tProblem Link = $problem_link\n\tUser = $user_name\n*/\n"
		file_content=`echo $file_content; cat $JAVA_TEMPLATE_FILE`
		`echo -e "$file_content" > $file_name`
	fi
	if hash $JAVA_IDE &> /dev/null;
	then
		$JAVA_IDE $file_name &> /dev/null&
	else
		success=0
	fi
elif [ $lang = 'cpp' ]
then
	if [ ! -f $file_name ]
	then
		file_content="/*\n\tProblem Name = $problem_name\n\tProblem Link = $problem_link\n\tUser = $user_name\n*/\n"
		file_content=`echo $file_content; cat $CPP_TEMPLATE_FILE`
		`echo -e "$file_content" > $file_name`
	fi
	if hash $CPP_IDE &> /dev/null;
	then
		$CPP_IDE $file_name &> /dev/null&
	else
		success=0
	fi
elif [ $lang = 'c' ]
then
	if [ ! -f $file_name ]
	then
		file_content="/*\n\tProblem Name = $problem_name\n\tProblem Link = $problem_link\n\tUser = $user_name\n*/\n"
		file_content=`echo $file_content; cat $C_TEMPLATE_FILE`
		`echo -e "$file_content" > $file_name`
	fi
	if hash $C_IDE &> /dev/null;
	then
		$C_IDE $file_name &> /dev/null&
	else
		success=0
	fi
else
	success=0
fi

if [ $success -eq 0 ]
then
	exit 127
fi

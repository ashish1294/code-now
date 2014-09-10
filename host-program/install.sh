#!/bin/bash

ROOT_UID="0"

#Check if run as root
if [ "$UID" -ne "$ROOT_UID" ] ; then
	echo "Please Run the script as sudo !!"
	exit 127
fi

#Checking if Google-Chrome is installed
if hash google-chrome > /dev/null 2>&1;
then
	echo "Google Chrome Detected . . . . . ."
else
	echo "Google Chrome Not found !! Please download and install google chrome from https://www.google.com/chrome/browser/"
	echo "Terminating .........!!"
	exit 127
fi

#Checking if Python is installed
if hash python > /dev/null 2>&1;
then
	echo "Python Detected . . . . . . . . ."
else
	echo "Python Not found !! Please install python and try again"
	echo "Terminating ..........!!"
	exit 127
fi

#At this point as pre-requisites are met. Proceeding with installation

path_dir="$HOME/.config/google-chrome/NativeMessagingHosts"
mkdir -p $path_dir/code-now/
rm -r "$path_dir/code-now"
mkdir -p $path_dir/code-now/
json_file="$path_dir/codenow.json"
json_file2="/etc/opt/chrome/native-messaging-hosts/codenow.json"
mkdir -p /etc/opt/chrome/native-messaging-hosts > /dev/null 2>&1

if [ -f $json_file ]
then
	rm $json_file
fi

if [ -f $json_file2 ]
then
	rm $json_file2
fi

echo "The installation folder comes with 3 template files for C, C++ and Java. All new codes will contain their repective templates. Use these template files to include/import all the required header files and classes. Enter Y or y if you want to continue:"

read choice

if [ $choice != "Y" ] && [ $choice != "y" ]
then
	exit 0
fi

# Reading the settings Parameter Here
ch=1
while [ $ch -eq 1 ]
do
echo "Enter the IDE for C :"
read cide
if hash $cide > /dev/null 2>&1;
then
	echo "$cide was found on your system !! Successfully Configured ..........."
	ch=0
else
	echo "No software named $cide was not found on your system !!"
fi
done

ch=1
while [ $ch -eq 1 ]
do
echo "Enter the IDE for C++ :"
read cppide
if hash $cppide > /dev/null 2>&1;
then
	echo "$cppide was found on your system !! Successfully Configured ..........."
	ch=0
else
	echo "No software named $cppide was not found on your system !!"
fi
done

ch=1
while [ $ch -eq 1 ]
do
echo "Enter the IDE for Java :"
read javaide
if hash $javaide > /dev/null 2>&1;
then
	echo "$javaide was found on your system !! Successfully Configured ..........."
	ch=0
else
	echo "No software named $javaide was not found on your system !!"
fi
done

echo "Enter the path to the solution-folder (It will be created if doesn't exist) : "
read sol_path

if [ ! -d $sol_path ]
then
	mkdir -p $sol_path
fi

# Creating the Json Manifest File
(cat codenow.json | sed -e "s:PATH_TO_REQ_DIR:$path_dir:g") > $path_dir/codenow.json
cp $path_dir/codenow.json /etc/opt/chrome/native-messaging-hosts/
echo "JSON file created .........................."

# Creating the prog.py script
cp prog.py $path_dir/code-now/prog.py
sed "s:PATH_TO_EXEC_SCRIPT:$path_dir/code-now/host_program.sh:g" prog.py > $path_dir/code-now/prog.py
sed "s:DEFAULT_SOLUTION_PATH:$sol_path:g" $path_dir/code-now/prog.py > $path_dir/code-now/prog.py.tmp && mv $path_dir/code-now/prog.py.tmp $path_dir/code-now/prog.py
sed "s:JAVA_IDE:$javaide:g" $path_dir/code-now/prog.py > $path_dir/code-now/prog.py.tmp && mv $path_dir/code-now/prog.py.tmp $path_dir/code-now/prog.py
sed "s:CPP_IDE:$cppide:g" $path_dir/code-now/prog.py > $path_dir/code-now/prog.py.tmp && mv $path_dir/code-now/prog.py.tmp $path_dir/code-now/prog.py
sed "s:C_IDE:$cide:g" $path_dir/code-now/prog.py > $path_dir/code-now/prog.py.tmp && mv $path_dir/code-now/prog.py.tmp $path_dir/code-now/prog.py
chmod +x $path_dir/code-now/prog.py
echo "Python Script Created ......................"

# Copying the template files
cp c_template.c "$path_dir/code-now/"
cp cpp_template.cpp "$path_dir/code-now/"
cp java_template.java "$path_dir/code-now/"
echo "Templates Copied"

echo "Installation Successful !! Please Install the extension"

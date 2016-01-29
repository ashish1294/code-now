#!/bin/bash

#Checking Operating System
OS='None'
case "$OSTYPE" in
  darwin*)  OS='OSX' ;;
  linux*)   OS='Linux' ;;
  *)        OS='Unknown' ;;
esac

if [ "$OS" != "OSX" ] && [ "$OS" != "Linux" ]
then
    echo "Incompatible Operating System."
    echo "Terminating ........!!"
    exit 127
fi

# Check and set if program exist depending on OS
function check_prog() {
    # First Parameter = name of the variable which stores the prog name
    # Second Parameter = name of the variable to switch if successful
    if [ "$OS" == "OSX" ] && [ -x "/Applications/${!1}.app/Contents/MacOS/${!1}" ]
    then
        eval ${2}=$(( ${!2} ^ 1 ))
        eval ${1}='/Applications/${!1}.app/Contents/MacOS/${!1}'
    elif hash ${!1} > /dev/null 2>&1;
    then
        eval ${2}=$(( ${!2} ^ 1 ))
    fi
}

#Check if running as root
ROOT_UID="0"

if [ "$UID" -eq "$ROOT_UID" ] ; then
    echo "Root Privileges Detected....!!"
    echo "Please Run this script without root privileges"
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

#Checking if Google-Chrome is installed
ischrome=0
if [ "$OS" == "OSX" ]
then
    if [ -x /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome ]
    then
        echo "Google Chrome Detected . . . . . ."
        ischrome=1
    fi
elif hash google-chrome > /dev/null 2>&1;
then
    echo "Google Chrome Detected . . . . . ."
    ischrome=1
fi

#Checking if Chromium Browser is installed
ischromium=0
if [ "$OS" == "OSX" ]
then
    if [ -x /Applications/Chromium.app/Contents/MacOS/Chromium ]
    then
        echo "Chromium Browser Detected . . . . . ."
        ischromium=1
    fi
elif hash chromium-browser > /dev/null 2>&1;
then
    echo "Chromium Browser Detected . . . . . ."
    ischromium=1
fi

if [ $ischrome -eq 0 ] && [ $ischromium -eq 0 ]
then
    echo "Neither Google Chrome nor chromium was found !! Please download and install google chrome from https://www.google.com/chrome/browser/"
    echo "Installation Incomplete"
    echo "Terminating ............!!"
    exit 127
fi

echo "The installation folder comes with 4 template files for C, C++, Java and Python. All new codes will contain their repective templates. Use these template files to include/import all the required header files and classes. Enter Y or y if you want to continue:"

read choice

if [[ $choice != "Y" ]] && [[ $choice != "y" ]]
then
    echo "Installation Incomplete .........."
    echo "Terminating ..............!!"
    exit 127
fi

#At this point as pre-requisites are met. Proceeding with installation

# Reading the settings Parameter Here
ch=1
while [ $ch -eq 1 ]
do
    echo "Enter the IDE for C :"
    read cide
    check_prog 'cide' 'ch'
    if [ $ch -eq 0 ]
    then
        echo "$cide was found on your system !! Successfully Configured ..........."
    else
        echo "No software named $cide was not found on your system !!"
    fi
done

ch=1
while [ $ch -eq 1 ]
do
    echo "Enter the IDE for C++ :"
    read cppide
    check_prog 'cppide' 'ch'
    if [ $ch -eq 0 ]
    then
        echo "$cppide was found on your system !! Successfully Configured ..........."
    else
        echo "No software named $cppide was not found on your system !!"
    fi
done

ch=1
while [ $ch -eq 1 ]
do
    echo "Enter the IDE for Java :"
    read javaide
    check_prog 'javaide' 'ch'
    if [ $ch -eq 0 ]
    then
        echo "$javaide was found on your system !! Successfully Configured ..........."
    else
        echo "No software named $javaide was not found on your system !!"
    fi
done

ch=1
while [ $ch -eq 1 ]
do
    echo "Enter the IDE for Python :"
    read pyide
    check_prog 'pyide' 'ch'
    if [ $ch -eq 0 ]
    then
        echo "$pyide was found on your system !! Successfully Configured ..........."
    else
        echo "No software named $pyide was not found on your system !!"
    fi
done

#Reading solution path
loop=1
while [ $loop -eq 1 ]
do
    echo "Enter the path to the solution-folder (It will be created if doesn't exist) : "
    read sol_path

    if [[ -z "$sol_path" ]]
    then
        echo "No Input Found !! Try Again"
    elif [ -f "$sol_path" ]
    then
        echo "The Path Specified is a regular file!! Please enter path to a directory !!"
    else
        mkdir -p "$sol_path"
        ret=$?
        if [ $ret -ne 0 ]
        then
            echo "Error in detecting/creating Directory !!"
        elif [ -w "$sol_path" ]
        then
            loop=0
        else
            echo "The directory should have write permission !!"
        fi
    fi
done

#Creating Required Directories

mkdir -p $HOME/.code-now > /dev/null 2>&1
rm $HOME/.code-now/* > /dev/null 2>&1

#path_dir variable is kept to ensure we can change location in future
path_dir=$HOME

#parent_path stores the relative path to host-program folder from current shell directory
parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
if [ $ischrome -eq 1 ]
then
    #Creating required installation directory for Chrome
    if [ "$OS" == "OSX" ]
    then inst_dir="$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts"
    else inst_dir="$HOME/.config/google-chrome/NativeMessagingHosts"
    fi
    if [ ! -d "$inst_dir" ]; then mkdir -p "$inst_dir"; fi

    # Removing existing JSON file of any
    json_file="$inst_dir/codenow.json"
    if [ -f "$json_file" ]; then rm "$json_file"; fi
    (cat $parent_path/codenow.json | sed -e "s:PATH_TO_REQ_PROG:$path_dir/.code-now/prog.py:g") > "$json_file"
fi

if [ $ischromium -eq 1 ]
then
    #Creating required installation directory for Chromium
    if [ "$OS" == "OSX" ]
    then inst_dir="$HOME/Library/Application Support/Chromium/NativeMessagingHosts"
    else inst_dir="$HOME/.config/chromium/NativeMessagingHosts"
    fi
    if [ ! -d "$inst_dir" ]; then mkdir -p "$inst_dir"; fi

    # Removing existing JSON file of any
    json_file="$inst_dir/codenow.json"
    if [ -f "$json_file" ]; then rm "$json_file"; fi
    (cat $parent_path/codenow.json | sed -e "s:PATH_TO_REQ_PROG:$path_dir/.code-now/prog.py:g") > "$json_file"
fi

echo "Manifest file created .........................."

# Creating the prog.py script
cp $parent_path/prog.py $path_dir/.code-now/prog.py
sed "s:DEFAULT_SOLUTION_PATH:$sol_path:g" "$path_dir/.code-now/prog.py" > "$path_dir/.code-now/prog.py.tmp" && mv "$path_dir/.code-now/prog.py.tmp" "$path_dir/.code-now/prog.py"
sed "s:PYTHON_IDE:$pyide:g" "$path_dir/.code-now/prog.py" > "$path_dir/.code-now/prog.py.tmp" && mv "$path_dir/.code-now/prog.py.tmp" "$path_dir/.code-now/prog.py"
sed "s:JAVA_IDE:$javaide:g" "$path_dir/.code-now/prog.py" > "$path_dir/.code-now/prog.py.tmp" && mv "$path_dir/.code-now/prog.py.tmp" "$path_dir/.code-now/prog.py"
sed "s:CPP_IDE:$cppide:g" "$path_dir/.code-now/prog.py" > "$path_dir/.code-now/prog.py.tmp" && mv "$path_dir/.code-now/prog.py.tmp" "$path_dir/.code-now/prog.py"
sed "s:C_IDE:$cide:g" "$path_dir/.code-now/prog.py" > "$path_dir/.code-now/prog.py.tmp" && mv "$path_dir/.code-now/prog.py.tmp" "$path_dir/.code-now/prog.py"
chmod +x $path_dir/.code-now/prog.py
echo "Python Script Created .........................."

# Copying the template files
cp $parent_path/c_template.c "$path_dir/.code-now/"
cp $parent_path/cpp_template.cpp "$path_dir/.code-now/"
cp $parent_path/java_template.java "$path_dir/.code-now/"
cp $parent_path/py_template.py "$path_dir/.code-now/"
echo "Templates Copied................................"
echo "Installation Successful !! Please Install the extension"

#!/bin/bash

echo "pwd"
pwd
if hash google-chrome &> /dev/null;
then
	echo "Google Chrome Detected . . . . . ."
else
	echo "Google Chrome Not found !! Please download and install google chrome from https://www.google.com/chrome/browser/"
	echo "Terminating .........!!"
	exit 127
fi

if hash python &> /dev/null;
then
	echo "Python Detected . . . . . . . . ."
else
	echo "Python Not found !! Please install python and try again"
	echo "Terminating ..........!!"
	exit 127
fi

path_dir="$HOME/.config/google-chrome/NativeMessagingHosts"
rm -r "$path_dir" &> /dev/null
mkdir -p $path_dir/code-now/
echo "$path_dir/code-now/"
json_file="$path_dir/codenow.json"

if [ -f $json_file ]
then
	rm $json_file
fi

echo "The installation folder comes with 3 template files for C, C++ and Java. All new codes will contain their repective templates. Use these template files to include/import all the required header files and classes. Enter Y or y if you want to exit and edit the template files or else any other key to continue :"

read choice

if [ $choice == 'Y' ]
then
	exit 0
fi
if [ $choice == 'y' ]
then
	exit 0
fi

# Reading the settings Parameter Here
ch=1
while [ $ch -eq 1 ]
do
echo "Enter the IDE for C :"
read cide
if hash $cide &> /dev/null;
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
if hash $cppide &> /dev/null;
then
	echo "$cppide was found on your system !! Successfully Configured ..........."
	ch=0
else
	echo "No softw	are named $cppide was not found on your system !!"
fi
done

ch=1
while [ $ch -eq 1 ]
do
echo "Enter the IDE for Java :"
read javaide
if hash $javaide &> /dev/null;
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
echo "JSON file created .........................."

# Creating the host_program script
echo "#!/bin/bash" > "$path_dir/code-now/host_program.sh"
echo "DEFAULT_FILE_PATH=\"$sol_path\"" >> "$path_dir/code-now/host_program.sh"
echo "C_IDE=\"$cide\"" >> "$path_dir/code-now/host_program.sh"
echo "CPP_IDE=\"$cppide\"" >> "$path_dir/code-now/host_program.sh"
echo "JAVA_IDE=\"$javaide\"" >> "$path_dir/code-now/host_program.sh"
echo "C_TEMPLATE_FILE=\"$path_dir/code-now/c_template.c\"" >> "$path_dir/code-now/host_program.sh"
echo "CPP_TEMPLATE_FILE=\"$path_dir/code-now/cpp_template.cpp\"" >> "$path_dir/code-now/host_program.sh"
echo "JAVA_TEMPLATE_FILE=\"$path_dir/code-now/java_template.java\"" >> "$path_dir/code-now/host_program.sh"
cat "host_program.sh" >> "$path_dir/code-now/host_program.sh"
chmod +x "$path_dir/code-now/host_program.sh"
echo "Host Program Created ......................."

# creating the prog.py script
cp prog.py $path_dir/code-now/prog.py
sed "s:PATH_TO_EXEC_SCRIPT:$path_dir/code-now/host_program.sh:g" prog.py > $path_dir/code-now/prog.py
chmod +x "$path_dir/code-now/prog.py"
echo "Python Script Created ......................"

# Copying the template files
cp c_template.c "$path_dir/code-now/"
cp cpp_template.cpp "$path_dir/code-now/"
cp java_template.java "$path_dir/code-now/"
echo "Templates Copied"

echo "Installation Successful !! Please Install the extension"

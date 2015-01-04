code-now-CodeChef
=================

A chrome/chromium plugin for CodeChef / SPOJ to instantly open your Favorite IDE

What it does !!
---------------

It is a simple chrome/chromium plugin for **Linux Users** which adds 3 button to every CodeChef / SPOJ Problem Page (one for each of C, C++ and Java).
Clicking on each button will open up your favorite IDE for that language instantly with a default template !! It is particularly useful during short contests.

You can choose different IDEs for different Languages. Templates can also be different for different Languages.


Prerequisites
-------------

Any Linux Distro, Google Chrome Browser, Python 2.7 or above and Your favorite IDEs

Google Chrome can be installed from here : https://www.google.com/chrome/browser/
Chromium Browser can be installed via Ubuntu Software or by typing following command :
```sh
sudo apt-get install chromium-browser
```


Installation
------------

Easy 2-step Installation. Download the zip file of the application from here (https://drive.google.com/file/d/0B6A-3_6rwie9OFRJZVFOb1JUWW8/edit?usp=sharing ) and unzip it

1. **Install Plugin** - The archive contains a file called Chrome.crx which can simply be installed by dragging and dropping it to chrome extension page (It can be accessed via chrome://extensions/ or via Settings -> Extensions)

2. **Install Host Program** - A simple script has been provided for installation of the host script on your machine which can communicate with the chrome plugin. Before installing, please edit the template files provided. These templates will be automatically added to all your solutions. After editing Templates you can first set the executable bit of the install.sh script and then execute it.

```sh
cd PATH_TO_INSTALL_FOLDER
chmod +x install.sh
./install.sh
```

You can configure your default IDEs for each of the 3 languages during installation. In case you need to re-configure your templates or IDEs please reinstall the host program by runnning the installation script again.

### IMPORTANT ! ###
### WORK IN PROGRESS, this project is not up to date yet!!!
### IMPORTANT ! ###

# About
<b>Intention of this project</b>: to be able to control the bot and abort failing prints without being near the printer via computer or smartphone

Web based control and surveillance of your makerbot 3D-printer.
With this installed on your Raspberry Pi with a PiCam attached you will be able to:
 - Set what your bot are printing/doing from a browser on your computer or your smart phone
 - See bot statistics such as build time, temperature of tool heads etc
 - be able to abort a print that seems to be failing from the web interface.

# TODO
 - Fix and check that the installer is working as intended
 - test scripts with a printer with dual tool heads and maybe a heated print bed (Replicator 2x)
 - Secure the php shell_exec in www/cmd_bot_pipe.php, atm you can more or less run commandline via $_GET injection
 - Finish installation instructions
 - make some kind of global setting for serial port to be set in all the python scripts
 - uptade the installation script so that www-data gets added to the group dialout and add www-data to sudoers to be able to use python
 - make shutdown button for the RPi on the web interface

# Install
<b>IMPORTANT, the installer is not finished yet, you wont be able to fully install this whithout trail and error, hold up, this will be finished in a few days</b>
1. 	install raspian on your Pi and connect and activate your PiCam
2. 	install the makerbot_driver from https://github.com/makerbot/s3g
3. 	Clone this git and run 
	sudo MakerBot_RPi_CP_installer.sh
4. 	test that communications from your RPi to your Bot is working properly by running this command
	python /var/www/srvcmd/mbot_play_song.py
.... To be continiued

This project is a fork from https://github.com/silvanmelchior/RPi_Cam_Web_Interface and dependent on having https://github.com/makerbot/s3g installed to be able to control your bot. 

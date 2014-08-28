# IMPORTANT !
### WORK IN PROGRESS, this project is far from bug free ATM, be patient!!!

# About
<b>Intention of this project</b>: to be able to control the bot and abort failing prints without being near the printer via computer or smartphone

Web control panel and surveillance of your makerbot 3D-printer.
With this installed on your Raspberry Pi with a PiCam attached you will be able to:
 - Set what your bot are printing/doing from a browser on your computer or your smart phone
 - See bot statistics such as build time, temperature of tool heads etc
 - be able to abort a print that seems to be failing from the web interface.

For the moment I have only tested this on my own Makerbot Replicator2, but this should work (maybe need adjustments) to work with other models from MakerBot. But I only have one Replicator2 at hand, so not able to test it with other models my self.

# TODO
 - Fix and check that the installer is working as intended
 - test scripts (and adopt to) with a printer with dual tool heads and maybe a heated print bed (Replicator 2x)
 - Secure the php shell_exec in www/cmd_bot_pipe.php, atm you can more or less run commandline by injecting the $_GET
 - make some kind of global setting for serial port to be set in all the python scripts
 - make shutdown button for the RPi on the web interface

# Install
<b>IMPORTANT, the installer is not finished yet, you wont be able to fully install this whithout trail and error, hold up, this will be finished in a few days</b>

<b>1.</b> install raspian on your Pi and connect and activate your PiCam and set time zone with
```sudo raspi-config```

<b>2.</b> Update your RPi
```sudo apt-get update && sudo apt-get upgrade```

<b>3.</b> install the makerbot_driver from https://github.com/makerbot/s3g
```
git clone https://github.com/makerbot/s3g
cd s3g
sudo python setup.py install
```

in the s3g documentation, the suggest that you create a virtual environment for makerbots own pyserial, this shouldn't be needed for this, the built in pyserial in raspian works fine.

<b>4.</b> Clone this git and run the installer
```
git clone https://github.com/ndit-dev/MakerBot_RPi_ControlPanel
cd MakerBot_RPi_ControlPanel
sudo ./MakerBot_RPi_CP_installer.sh
```

<b>5.</b> Test that communications from your RPi to your Bot is working properly by running this command
```python /var/www/srvcmd/mbot_play_song.py```
This should make your Bot play a song, if it does... say: - Cool, really cool! out loud

# Sources and Copyright notice
First, this is a fork from Silvan Melchiors git (https://github.com/silvanmelchior/RPi_Cam_Web_Interface). I have just added the ability to control the bot and made som graphical changes to the web interface. Be sure to keep his references if you fork this further.
You are free to copy, share, modify and redistribute my contributions however you see fit, as long as the original creator is respected, and both of us are credited.


For full documentation about the python commands to control the printer, visit the s3g-git.
Or run ```pydoc makerbot_driver.s3g```on your RPi to see the commands available.

For full documentation of the simple and brilliant RPi_Cam_Web_interface, visit silvans git mentioned above.

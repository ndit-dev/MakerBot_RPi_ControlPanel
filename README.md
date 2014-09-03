# About
<b>Intention of this project</b>: to be able to control the bot and abort failing prints without being near the printer via computer or smartphone

Web control panel and surveillance of your makerbot 3D-printer.
With this installed on your Raspberry Pi with a PiCam attached you will be able to:
 - See what your bot are printing/doing from a browser on your computer or your smartphone
 - See bot statistics such as build time, temperature of tool heads etc
 - Be able to abort a print that seems to be failing from the web interface.
 - Record video, take pictures and timelapses from the webinterface

For the moment I have only tested this on my own Makerbot Replicator2, but this should work (maybe need adjustments) to work with other models from MakerBot. But I only have one Replicator2 at hand, so not able to test it with other models my self.

This interface has potential to do alot more things with your bot than i do here. You should in theory be able to make this start prints on the bot via the webinterface to.

# TODO
 - test scripts (and adopt to) with a printer with dual tool heads and maybe a heated print bed (Replicator 2x)
 - make some kind of global setting for serial port to be set in all the python scripts

# Install
<b>1.</b> install raspian on your Pi and connect and activate your PiCam and set time zone with

```sudo raspi-config```

<i> should in theory work with anykind of dist, but installer are made for raspian specificly</i>

<b>2.</b> Update your RPi

```
sudo apt-get update
sudo apt-get upgrade
rpi-update
```

<b>3.</b> install the makerbot_driver from https://github.com/makerbot/s3g

```
git clone https://github.com/makerbot/s3g
cd s3g
sudo python setup.py install
```
<i>in the s3g documentation, they suggest that you create a virtual environment for makerbots own pyserial, this shouldn't be needed for this project.</i>

<b>4.</b> Connect your bot to your RPi with an USB-cable

<b>5.</b> Clone this git and run the installer

```
git clone https://github.com/ndit-dev/MakerBot_RPi_ControlPanel
cd MakerBot_RPi_ControlPanel
sudo ./MakerBot_RPi_CP_installer.sh
```

<b>6.</b> Test that communications from your RPi to your Bot is working properly by running this command
```python /var/www/srvcmd/mbot_play_song.py```
This should make your Bot play a song. If it does, quickly make your best dance move and celebrate your accomplishment.

IF it wont work, first check what Serial port your bot has been given in raspian. If you havn't connected anything special to your RPi, it should be ```/dev/ttyACM0```. If it is something else, you need to edit the variable ```serialportname = '/dev/ttyACM0'``` in the python scripts located in ```/var/www/srvcmd```

<b>Finnished!</b> now you should be able to browse to your RPi's IP adress via your favorite browser to access the MakerBot RPi Control Panel

# Sources and Copyright notice
First, this is a fork from Silvan Melchiors git (https://github.com/silvanmelchior/RPi_Cam_Web_Interface). I have just added the ability to control the bot and made som graphical changes to the web interface. Be sure to keep his references if you fork this further.
You are free to copy, share, modify and redistribute my contributions however you see fit, as long as the original creators is respected, and both of us are credited.


For full documentation about the python commands to control the printer, visit the s3g-git.
Or run ```pydoc makerbot_driver.s3g```on your RPi to see the commands available.
You should be able to use my scripts in /var/www/srvcmd/ as a template.

For full documentation of the simple and brilliant RPi_Cam_Web_interface, visit silvans git mentioned above.

# Screenshots
![](http://i.imgur.com/YmGgxVh.png)
![](http://i.imgur.com/7TxEaoR.png)
![](http://i.imgur.com/woc2r3f.png)
![](http://i.imgur.com/6DpTOkx.png)

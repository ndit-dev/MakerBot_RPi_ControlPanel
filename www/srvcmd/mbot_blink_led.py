#!/usr/bin/python
# -*- coding: UTF-8 -*-

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#							#
#  Script to play a song on the bot			#
#  good to test communication to the bot from the site	#
#							#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #

### Import modules ###
import makerbot_driver
import serial
import optparse
import binascii
import threading
import time
### /end of module import

### Variables ###

serialportname = '/dev/ttyACM0'		#standard for Raspbian

# Set other communication variables (you shouln't need to edit theese)
serialbaud = '115200'			#Baud rate (Default: 115200)
toolheads = 1				#No. of toolheads (Default: 2)
dump_eeprom = False			#Default: False
### /end of variables

### Prepare Communication ###
file = serial.Serial(serialportname, serialbaud, timeout=0)
r = makerbot_driver.s3g()
condition = threading.Condition()
r.writer = makerbot_driver.Writer.StreamWriter(file, condition)
### /end of communications

### Play song ###
r.set_RGB_LED(255,0,0,0)
time.sleep(0.5)
r.set_RGB_LED(255,255,0,0)
time.sleep(0.5)
r.set_RGB_LED(0,255,0,0)
time.sleep(0.5)
r.set_RGB_LED(0,255,255,0)
time.sleep(0.5)
r.set_RGB_LED(0,0,255,0)
time.sleep(0.5)
r.set_RGB_LED(255,255,255,0)
time.sleep(0.5)
r.set_RGB_LED(0,0,0,0)
time.sleep(0.5)
r.set_RGB_LED(255,255,255,0)
time.sleep(0.5)
r.set_RGB_LED(0,0,0,0)
time.sleep(0.5)
r.set_RGB_LED(255,255,255,0)


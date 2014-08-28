#!/usr/bin/python
# -*- coding: UTF-8 -*-

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

### ABORT print ###

### blink red to indicate the abort is in progress
r.set_RGB_LED(255,0,0,0)
time.sleep(0.5)
r.set_RGB_LED(255,0,0,0)
time.sleep(0.5)
r.set_RGB_LED(255,0,0,0)
time.sleep(0.5)
r.set_RGB_LED(255,0,0,0)

# First, abort the the print job
# this command disables the steppers, clears the command buffers and shut downs the toolheads
print "begin abort"
r.abort_immediately()
print "abort done...\n"

time.sleep(5)

# Then lower the build platform and home the x & y axis
# so the nozzle wont glue to the modle
print "max axes"
r.toggle_axes(['x','y'],True)
time.sleep(1)
r.find_axes_maximums(['x', 'y'], 300, 60)	#(axes, speed, timeout) where lower value for speed means faster
print "axes maxed\n"

time.sleep(20)

# last but not least, disable the stepper motors
# and ensure that the toolhead temp is set to zero
print "set toolhead0 temp to zero"
r.set_toolhead_temperature(0,0)
print "toolhead0 set to zero\n"

time.sleep(5)

print "turn off stepper motors"
r.toggle_axes(['x','y','z','a','b'],False)
print "stepper motors off"

# set LEDs back to white
### blink red to indicate the abort is in progress is finnished
r.set_RGB_LED(255,255,255,0)
time.sleep(0.5)
r.set_RGB_LED(255,255,255,0)
time.sleep(0.5)
r.set_RGB_LED(255,255,255,0)

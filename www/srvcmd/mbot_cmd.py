#!/usr/bin/python
# -*- coding: UTF-8 -*-

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#							#
#  Script to collect various statistics about the bot	#
#  and collect it in an array in a php-file		#
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
txtfile = '/var/www/mbot_stats.php'	#path/name.php to dump information in

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

### Other stuff ###
f = open(txtfile, 'w')

# print begining of config.php.inc
f.write("<?php\n\n\t$mbot_stats = array(\n\n")
## /end of other stuff

### Collect all the information ###

# # time stamp this collection
f.write("\t\t'last_collect' => \t'" + str(time.strftime('%a %d %b %H:%M:%S %Y')) + "',\n")

# # Print Firmware version
f.write("\t\t'frmw_ver' => \t\t'" + str((r.get_version())) + "',\n")

# # Print last or current build model
f.write("\t\t'last_buildname' => \t'" + (r.get_build_name()) + "',\n")

# # Print contents on SD-card
try:
    sd_name = r.get_next_filename(True)
    f.write("\t\t'sd_content' => \t'" + sd_name + "<br>")
    while True:
        filename = r.get_next_filename(False)
        if filename == '\x00':
            break
        f.write("\n\t\t\t\t\t " + filename + "<br>")
    f.write("',\n")
except makerbot_driver.SDCardError:
    print "SD Card error"

# # Toolhead info
for tool_index in range(0, toolheads):
    f.write("\t\t'tool%s_ver' => \t\t'"%tool_index + str((r.get_toolhead_version(tool_index))) + "',\n")
    f.write("\t\t'tool%s_temp' => \t'"%tool_index + str((r.get_toolhead_temperature(tool_index))) + "',\n")
    f.write("\t\t'tool%s_target_temp' => \t'"%tool_index + str((r.get_toolhead_target_temperature(tool_index))) + "',\n")
    f.write("\t\t'tool%s_ready' => \t'"%tool_index + str((r.is_tool_ready(tool_index))) + "',\n")

# # Build stats
build_stats = {}
build_stats = r.get_build_stats()

# translate build states
if build_stats['BuildState'] == 1:
    build_stats['BuildState'] = 'No Build'
elif build_stats['BuildState'] == 2:
    build_stats['BuildState'] = 'Build Running'
elif build_stats['BuildState'] == 3:
    build_stats['BuildState'] = 'Build Finished Normally'
elif build_stats['BuildState'] == 4:
    build_stats['BuildState'] = 'Build Canceled'
elif build_stats['BuildState'] == 5:
    build_stats['BuildState'] = 'Sleeping'
elif build_stats['BuildState'] == '0xFF':
    build_stats['BuildState'] = 'Build State Error'

f.write("\t\t'LineNumber' => \t'" + str(build_stats['LineNumber']) + "',\n")
f.write("\t\t'BuildState' => \t'" + str(build_stats['BuildState']) + "',\n")
f.write("\t\t'BuildHours' => \t'" + str(build_stats['BuildHours']) + "',\n")
f.write("\t\t'BuildMinutes' => \t'" + str(build_stats['BuildMinutes']) + "',\n")

### /end collecting information

### Write end of php-file and close the file
f.write("\t)\n\n?>\n")
f.close()

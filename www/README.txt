# # # Just random notes so far

#### Dependencies
1. 	RPi Control Panel
2. 	s3g from github
3. 	pyserial (probably already installed)
4. 	costumited files for the webserver
5a. 	www-data must have this entery in sudoers-file
	"www-data ALL=(ALL) NOPASSWD: /etc/bin/python"
5b.	www-data must be member of dialers to access the port
	"sudo usermod -a -G dialout www-data"
5c.	reboot of pi (or some services) might be required after this


#### Todo
1. make the cmd_bot_pipe.php SECURE (you can now run server commands with it, not good)!!!
2. refresh design of control panel
3. add the abort button and implement some kind of "are you sure you want to..."-msg before its executed
4. write documentation and installation guide
5. make the control panel available to the Internetz

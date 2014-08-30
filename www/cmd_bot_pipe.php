<?php

	/* this will first check to see if the file called in $cmd actually matches a file in the srvcmd-folder.
	   if it doesn't it wont run the command.

	   This is to make sure the end user wont run what ever shell command he wants by injecting the $_GET
	   There is probably better ways to do this, but this was the best i came up with for the moment */

$cmd = $_GET["cmd"];

if (file_exists("srvcmd/$cmd")) {
	$output = shell_exec ("python srvcmd/$cmd");
} else {
    echo "Thats not one of the existing scripts, sorry... wont runt this";
}



?>

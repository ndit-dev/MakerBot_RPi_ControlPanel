<?php

/* 	to make this safer, make an if statement that runs a specific script if $cmd
	matches a certain value, that way an enduser wont be able to execute what ever
	command he or she wants */

  $cmd = $_GET["cmd"];
  $output = shell_exec ("python srvcmd/$cmd");

?>

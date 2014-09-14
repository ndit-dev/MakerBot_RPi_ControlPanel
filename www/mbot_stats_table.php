<?php
	$file = file('mbot_stats.php');
	$lastLine = $file[count($file) - 1];
	if($lastLine == "?>\n"){
		include('mbot_stats.php');
		
		echo '<i>Bot stats updated: ' . $mbot_stats['last_collect'] . '</i><br>';
		echo '<table class="tg">';
		echo '  <tr>';
		echo '    <th colspan="2" class="tg-031e"><h3>Bot Stats</h3></th>';
		echo '  </tr>';
		echo '  <tr>';
		echo '    <td class="tg-031e"><b>Firmware Version:</b></td>';
		echo '    <td class="tg-031e">' . $mbot_stats['frmw_ver'] . '</td>';
		echo '  </tr>';
		echo '  <tr>';
		echo '    <td class="tg-031e"><b>Content on SD-card:</b></td>';
		echo '    <td class="tg-031e">' . $mbot_stats['sd_content'] . '</td>';
		echo '  </tr>';
		echo '</table> ';
		echo '<table class="tg">';
		echo '  <tr>';
		echo '    <th colspan="2" class="tg-031e"><h3>Build Stats</h3></th>';
		echo '  </tr>';
		echo '  <tr>';
		echo '    <td class="tg-031e"><b>Last Buldname:</b></td>';
		echo '    <td class="tg-031e">' . $mbot_stats['last_buildname'] . '</td>';
		echo '  </tr>';
		echo '  <tr>';
		echo '    <td class="tg-031e"><b>Build Time:</b></td>';
		echo '    <td class="tg-031e">' . $mbot_stats['BuildHours']. 'h ' . $mbot_stats['BuildMinutes'] . 'm</td>';
		echo '  </tr>';
		echo '  <tr>';
		echo '    <td class="tg-031e"><b>Nozzel Temp/(Target):</b></td>';
		echo '    <td class="tg-031e">' . $mbot_stats['tool0_temp'] . '&deg;C ( ' . $mbot_stats['tool0_target_temp'] . '&deg;C )</td>';
		echo '  </tr>';
		echo '  <tr>';
		echo '    <td class="tg-031e"><b>Toolhead state:</b></td>';
		echo '    <td class="tg-031e">' . $mbot_stats['tool0_ready'] . '</td>';
		echo '  </tr>';
		echo '  <tr>';
		echo '    <td class="tg-031e"><b>BuildState:</b></td>';
		echo '    <td class="tg-031e">' . $mbot_stats['BuildState'] . '</td>';
		echo '  </tr>';
		echo '</table>';
	}
	else{
		echo '<i>Last update command didn\'t complete succesfully,<br> please run the \'Refresh Stats\' command again</i><br>';
	}

	
?>
//
// Interface
//
function set_preset(value) {

  document.getElementById("video_width").value = value.substr(0, 4);
  document.getElementById("video_height").value = value.substr(5, 4);
  document.getElementById("video_fps").value = value.substr(10, 2);
  document.getElementById("MP4Box_fps").value = value.substr(13, 2);
  document.getElementById("image_width").value = value.substr(16, 4);
  document.getElementById("image_height").value = value.substr(21, 4);
  send_cmd("px " + value);

}

function set_res() {
  
  while(document.getElementById("video_width").value.length < 4) document.getElementById("video_width").value = "0" + document.getElementById("video_width").value;
  while(document.getElementById("video_height").value.length < 4) document.getElementById("video_height").value = "0" + document.getElementById("video_height").value;
  while(document.getElementById("video_fps").value.length < 2) document.getElementById("video_fps").value = "0" + document.getElementById("video_fps").value;
  while(document.getElementById("MP4Box_fps").value.length < 2) document.getElementById("MP4Box_fps").value = "0" + document.getElementById("MP4Box_fps").value;
  while(document.getElementById("image_width").value.length < 4) document.getElementById("image_width").value = "0" + document.getElementById("image_width").value;
  while(document.getElementById("image_height").value.length < 4) document.getElementById("image_height").value = "0" + document.getElementById("image_height").value;
  
  send_cmd("px " + document.getElementById("video_width").value + " " + document.getElementById("video_height").value + " " + document.getElementById("video_fps").value + " " + document.getElementById("MP4Box_fps").value + " " + document.getElementById("image_width").value + " " + document.getElementById("image_height").value);

}

function set_ce() {
  
  while(document.getElementById("ce_u").value.length < 3) document.getElementById("ce_u").value = "0" + document.getElementById("ce_u").value;
  while(document.getElementById("ce_v").value.length < 3) document.getElementById("ce_v").value = "0" + document.getElementById("ce_v").value;
  
  send_cmd("ce " + document.getElementById("ce_en").value + " " + document.getElementById("ce_u").value + " " + document.getElementById("ce_v").value);

}

function set_roi() {
  
  while(document.getElementById("roi_x").value.length < 5) document.getElementById("roi_x").value = "0" + document.getElementById("roi_x").value;
  while(document.getElementById("roi_y").value.length < 5) document.getElementById("roi_y").value = "0" + document.getElementById("roi_y").value;
  while(document.getElementById("roi_w").value.length < 5) document.getElementById("roi_w").value = "0" + document.getElementById("roi_w").value;
  while(document.getElementById("roi_h").value.length < 5) document.getElementById("roi_h").value = "0" + document.getElementById("roi_h").value;
  
  send_cmd("ri " + document.getElementById("roi_x").value + " " + document.getElementById("roi_y").value + " " + document.getElementById("roi_w").value + " " + document.getElementById("roi_h").value);

}

//
// MJPEG
//
var mjpeg_img;
var halted = 0;

function reload_img () {
  if(!halted) mjpeg_img.src = "cam_pic.php?time=" + new Date().getTime();
  else setTimeout("reload_img()", 500);
}

function error_img () {
  setTimeout("mjpeg_img.src = 'cam_pic.php?time=' + new Date().getTime();", 100);
}

//
// Ajax Status
//
var ajax_status;
var bot_alert_msg;

if(window.XMLHttpRequest) {
  ajax_status = new XMLHttpRequest();
}
else {
  ajax_status = new ActiveXObject("Microsoft.XMLHTTP");
}


ajax_status.onreadystatechange = function() {
  if(ajax_status.readyState == 4 && ajax_status.status == 200) {
		document.getElementById("bot_play_song_button").disabled = false;
		document.getElementById("bot_play_song_button").value = "Play a song";
		document.getElementById("bot_play_song_button").onclick = function() {
			send_bot_cmd("mbot_play_song.py");
		};
		document.getElementById("bot_blink_led").disabled = false;
		document.getElementById("bot_blink_led").value = "Blink LEDs";
		document.getElementById("bot_blink_led").onclick = function() {
	  	send_bot_cmd("mbot_blink_led.py");
		};
		document.getElementById("bot_abort_button").disabled = false;
		document.getElementById("bot_abort_button").value = "Abort Print";
		document.getElementById("bot_abort_button").onclick = function() {
			bot_alert_msg="Are you sure you want to\nABORT THE CURRENT PRINT JOB?";
			send_bot_cmd_alert("mbot_abort.py");
		};
		document.getElementById("bot_refresh_stats_button").disabled = false;
		document.getElementById("bot_refresh_stats_button").value = "Refresh stats";
		document.getElementById("bot_refresh_stats_button").onclick = function() {send_bot_cmd("mbot_cmd.py");};
		document.getElementById("pi_reboot").disabled = false;
		document.getElementById("pi_reboot").value = "Reboot RPi";
		document.getElementById("pi_reboot").onclick = function() {
			bot_alert_msg="This will reboot the Raspberry,\nare you sure?";
			send_bot_cmd_alert("pi_reboot.py");
		};
		document.getElementById("pi_shutdown").disabled = false;
		document.getElementById("pi_shutdown").value = "Shutdown RPi";
		document.getElementById("pi_shutdown").onclick = function() {
			bot_alert_msg="This will SHUTDOWN the Raspberry,\nARE YOU SURE?";
			send_bot_cmd_alert("pi_shutdown.py");
		};

    if(ajax_status.responseText == "ready") {
      document.getElementById("video_button").disabled = false;
      document.getElementById("video_button").value = "Record Video Start";
      document.getElementById("video_button").onclick = function() {send_cmd("ca 1");};
      document.getElementById("image_button").disabled = false;
      document.getElementById("image_button").value = "Record Image";
      document.getElementById("image_button").onclick = function() {send_cmd("im");};
      document.getElementById("timelapse_button").disabled = false;
      document.getElementById("timelapse_button").value = "Timelapse Start";
      document.getElementById("timelapse_button").onclick = function() {send_cmd("tl " + (document.getElementById("tl_interval").value*10));};
      document.getElementById("md_button").disabled = false;
      document.getElementById("md_button").value = "Motion Detection Start";
      document.getElementById("md_button").onclick = function() {send_cmd("md 1");};
      document.getElementById("halt_button").disabled = false;
      document.getElementById("halt_button").value = "Stop Camera";
      document.getElementById("halt_button").onclick = function() {send_cmd("ru 0");};
      halted = 0;
    }
    else if(ajax_status.responseText == "md_ready") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "Record Video Start";
      document.getElementById("video_button").onclick = function() {};
      document.getElementById("image_button").disabled = true;
      document.getElementById("image_button").value = "Record Image";
      document.getElementById("image_button").onclick = function() {};
      document.getElementById("timelapse_button").disabled = true;
      document.getElementById("timelapse_button").value = "Timelapse Start";
      document.getElementById("timelapse_button").onclick = function() {};
      document.getElementById("md_button").disabled = false;
      document.getElementById("md_button").value = "motion detection stop";
      document.getElementById("md_button").onclick = function() {send_cmd("md 0");};
      document.getElementById("halt_button").disabled = true;
      document.getElementById("halt_button").value = "Stop Camera";
      document.getElementById("halt_button").onclick = function() {};
      halted = 0;
    }
    else if(ajax_status.responseText == "video") {
      document.getElementById("video_button").disabled = false;
      document.getElementById("video_button").value = "record video stop";
      document.getElementById("video_button").onclick = function() {send_cmd("ca 0");};
      document.getElementById("image_button").disabled = true;
      document.getElementById("image_button").value = "Record Image";
      document.getElementById("image_button").onclick = function() {};
      document.getElementById("timelapse_button").disabled = true;
      document.getElementById("timelapse_button").value = "Timelapse Start";
      document.getElementById("timelapse_button").onclick = function() {};
      document.getElementById("md_button").disabled = true;
      document.getElementById("md_button").value = "Motion Detection Start";
      document.getElementById("md_button").onclick = function() {};
      document.getElementById("halt_button").disabled = true;
      document.getElementById("halt_button").value = "Stop Camera";
      document.getElementById("halt_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "timelapse") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "Record Video Start";
      document.getElementById("video_button").onclick = function() {};
      document.getElementById("image_button").disabled = true;
      document.getElementById("image_button").value = "Record Image";
      document.getElementById("image_button").onclick = function() {};
      document.getElementById("timelapse_button").disabled = false;
      document.getElementById("timelapse_button").value = "timelapse stop";
      document.getElementById("timelapse_button").onclick = function() {send_cmd("tl 0");};
      document.getElementById("md_button").disabled = true;
      document.getElementById("md_button").value = "Motion Detection Start";
      document.getElementById("md_button").onclick = function() {};
      document.getElementById("halt_button").disabled = true;
      document.getElementById("halt_button").value = "Stop Camera";
      document.getElementById("halt_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "md_video") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "Record Video Start";
      document.getElementById("video_button").onclick = function() {};
      document.getElementById("image_button").disabled = true;
      document.getElementById("image_button").value = "Record Image";
      document.getElementById("image_button").onclick = function() {};
      document.getElementById("timelapse_button").disabled = true;
      document.getElementById("timelapse_button").value = "Timelapse Start";
      document.getElementById("timelapse_button").onclick = function() {};
      document.getElementById("md_button").disabled = true;
      document.getElementById("md_button").value = "recording video...";
      document.getElementById("md_button").onclick = function() {};
      document.getElementById("halt_button").disabled = true;
      document.getElementById("halt_button").value = "Stop Camera";
      document.getElementById("halt_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "image") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "Record Video Start";
      document.getElementById("video_button").onclick = function() {};
      document.getElementById("image_button").disabled = true;
      document.getElementById("image_button").value = "recording image";
      document.getElementById("image_button").onclick = function() {};
      document.getElementById("timelapse_button").disabled = true;
      document.getElementById("timelapse_button").value = "Timelapse Start";
      document.getElementById("timelapse_button").onclick = function() {};
      document.getElementById("md_button").disabled = true;
      document.getElementById("md_button").value = "Motion Detection Start";
      document.getElementById("md_button").onclick = function() {};
      document.getElementById("halt_button").disabled = true;
      document.getElementById("halt_button").value = "Stop Camera";
      document.getElementById("halt_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "boxing") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "video processing...";
      document.getElementById("video_button").onclick = function() {};
      document.getElementById("image_button").disabled = true;
      document.getElementById("image_button").value = "Record Image";
      document.getElementById("image_button").onclick = function() {};
      document.getElementById("timelapse_button").disabled = true;
      document.getElementById("timelapse_button").value = "Timelapse Start";
      document.getElementById("timelapse_button").onclick = function() {};
      document.getElementById("md_button").disabled = true;
      document.getElementById("md_button").value = "Motion Detection Start";
      document.getElementById("md_button").onclick = function() {};
      document.getElementById("halt_button").disabled = true;
      document.getElementById("halt_button").value = "Stop Camera";
      document.getElementById("halt_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "md_boxing") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "Record Video Start";
      document.getElementById("video_button").onclick = function() {};
      document.getElementById("image_button").disabled = true;
      document.getElementById("image_button").value = "Record Image";
      document.getElementById("image_button").onclick = function() {};
      document.getElementById("timelapse_button").disabled = true;
      document.getElementById("timelapse_button").value = "Timelapse Start";
      document.getElementById("timelapse_button").onclick = function() {};
      document.getElementById("md_button").disabled = true;
      document.getElementById("md_button").value = "video processing...";
      document.getElementById("md_button").onclick = function() {};
      document.getElementById("halt_button").disabled = true;
      document.getElementById("halt_button").value = "Stop Camera";
      document.getElementById("halt_button").onclick = function() {};
    }
    else if(ajax_status.responseText == "halted") {
      document.getElementById("video_button").disabled = true;
      document.getElementById("video_button").value = "Record Video Start";
      document.getElementById("video_button").onclick = function() {};
      document.getElementById("image_button").disabled = true;
      document.getElementById("image_button").value = "Record Image";
      document.getElementById("image_button").onclick = function() {};
      document.getElementById("timelapse_button").disabled = true;
      document.getElementById("timelapse_button").value = "Timelapse Start";
      document.getElementById("timelapse_button").onclick = function() {};
      document.getElementById("md_button").disabled = true;
      document.getElementById("md_button").value = "Motion Detection Start";
      document.getElementById("md_button").onclick = function() {};
      document.getElementById("halt_button").disabled = false;
      document.getElementById("halt_button").value = "start camera";
      document.getElementById("halt_button").onclick = function() {send_cmd("ru 1");};
      halted = 1;
    }
    else if(ajax_status.responseText.substr(0,5) == "Error") alert("Error in RaspiMJPEG: " + ajax_status.responseText.substr(7) + "\nRestart RaspiMJPEG (./RPi_Cam_Web_Interface_Installer.sh start) or the whole RPi.");
    
    reload_ajax(ajax_status.responseText);

  }
}

function reload_ajax (last) {
  ajax_status.open("GET","status_mjpeg.php?last=" + last,true);
  ajax_status.send();
}

//
// BOT-related
//

// Start the refresh table function when the page loads
$(document).ready(function(){
  refreshTable();
});

// Update mbot_stats_holder div with the stats  
// printed in mbot_stats_table.php
function refreshTable(){
  $('.mbot_stats_holder').load('mbot_stats_table.php', function(){
    setTimeout(refreshTable, 5000);
  });
}

//
// Ajax Commands
//
var ajax_cmd;

if(window.XMLHttpRequest) {
  ajax_cmd = new XMLHttpRequest();
}
else {
  ajax_cmd = new ActiveXObject("Microsoft.XMLHTTP");
}

function send_cmd (cmd) {
  ajax_cmd.open("GET","cmd_pipe.php?cmd=" + cmd,true);
  ajax_cmd.send();
}

// Send BOT CMD
function send_bot_cmd (cmd) {
  ajax_cmd.open("GET","cmd_bot_pipe.php?cmd=" + cmd,true);
  ajax_cmd.send();
}

function send_bot_cmd_alert (cmd) {
  if (confirm(bot_alert_msg) == true) {
    ajax_cmd.open("GET","cmd_bot_pipe.php?cmd=" + cmd,true);
    ajax_cmd.send();
  } else {
  }
}

//
// Init
//
function init() {

  // mjpeg
  mjpeg_img = document.getElementById("mjpeg_dest");
  mjpeg_img.onload = reload_img;
  mjpeg_img.onerror = error_img;
  reload_img();
  // status
  reload_ajax("");

}

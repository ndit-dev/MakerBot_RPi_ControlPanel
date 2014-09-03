<!DOCTYPE html>
<html>
	<head>
		<title>MBot RPi CP Download</title>
		<script src="script.js"></script>
		<link rel="stylesheet" type="text/css" href="style.css" media="screen" />
	</head>
	<body>
		<div class="pageWrapper">
			<div class="main">
				<div class="header">
					<h1>NDBot RPi CP</h1>
				</div>
				<p><a href="./" style="margin-left:10px;"><input type="button" value="Back to ccp" class="btn-style" /></a></p>
				<center>

				<?php
					if(isset($_GET["delete"])) {
						unlink("media/" . $_GET["delete"]);
					}
					if(isset($_GET["delete_all"])) {
						$files = scandir("media");
						foreach($files as $file) unlink("media/$file");
					}
					else if(isset($_GET["file"])) {
						echo "<table class=\"tg\">";
						echo "<tr>";
						echo "<th class=\"tg-031e\"><h2>Preview</h2></th>";
						echo "</tr>";
						echo "<tr>";
						echo "<td class=\"tg-031e\" style=\"padding:0px;\">";
						if(substr($_GET["file"], -3) == "jpg") echo "<img src='media/" . $_GET["file"] . "' width='640'>";
						else echo "<video width='640' controls><source src='media/" . $_GET["file"] . "' type='video/mp4'>Your browser does not support the video tag.</video>";
						echo "<p><input type='button' value='Download' class='btn-style' onclick='window.open(\"download.php?file=" . $_GET["file"] . "\", \"_blank\");'> ";
						echo "<input type='button' value='Delete' class='btn-style' onclick='window.location=\"preview.php?delete=" . $_GET["file"] . "\";'></p>";
						echo "</td>";
						echo "</tr>";
						echo "</table>";
					}
				?>
				<br><br>
				<table class="tg">
					<tr>
						<th class="tg-031e"><h2>Files</h2></th>
					</tr>
					<tr>
						<td class="tg-031e">
							<div class="files">
								<?php
									$files = scandir("media");
									if(count($files) == 2) echo "<p>No videos/images saved</p>";
									else {
										foreach($files as $file) {
											if(($file != '.') && ($file != '..')) {
												$fsz = round ((filesize("media/" . $file)) / (1024 * 1024));
												echo "<a href='preview.php?file=$file'>$file</a> ($fsz MB)<br>";
											}
										}
										echo "<p><input type='button' value='Delete all' class='btn-style' onclick='if(confirm(\"Delete all?\")) {window.location=\"preview.php?delete_all\";}'></p>";
									}
								?>
							</div>
						</td>
					</tr>
				</table>
				</center>
			</div>
		</div>
	</body>
</html>

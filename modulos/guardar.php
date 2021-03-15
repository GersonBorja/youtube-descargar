<?php
$baseFromJavascript = $_POST["url"];
$base_to_php = explode(',', $baseFromJavascript);
$data = base64_decode($base_to_php[1]);
$filepath = "img/image.png";
file_put_contents($filepath, $data);

?>
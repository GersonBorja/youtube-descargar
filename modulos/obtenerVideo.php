<?php

require_once 'descargaYoutube.php';


$url = $_POST["url"];
$n = new descargarYoutube();
echo $n->datosDeYoutube($url);
?>
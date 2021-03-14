<?php
class descargarYoutube {

    public function filtrar_url($urlFiltro){
        
        if(strpos($urlFiltro, "https://youtu.be") !== false){
            return true;
        }else{
            return false;
        }

    }

    public function datosDeYoutube($url){

        if(self::filtrar_url($url)){
            $respuestaJson = shell_exec('youtube-dl -j ' . $url);
            $json = json_encode($respuestaJson);
            return $json;
        }else {
            return "No es valida tu url";
        }

    }

}

?>
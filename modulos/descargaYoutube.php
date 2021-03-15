<?php
class descargarYoutube {

    public function filtrar_url($urlFiltro){
        
        if(strpos($urlFiltro, "https://youtu.be") !== false){
            return true;
        }else{
            return false;
        }

    }

    private function conseguirIp(){
        $ip = shell_exec('python python/ip.py');
        $limpiarIp = str_replace("\n", "", $ip);
        return $limpiarIp;
    }
    private function descargarVideo($url){
        $fecha = date("d_m_Y_g:i:sa");
        $idUnico = "Descargas/youtuDown_" . $fecha . "_" . uniqid() . ".mp4";
        $comandoDescarga = shell_exec('youtube-dl -o ../' . $idUnico . ' -f mp4 ' . $url);
        return $idUnico;
    }

    public function datosDeYoutube($url){

        if(self::filtrar_url($url)){
            $respuestaJson = shell_exec('youtube-dl -j ' . $url);
            $enlace = self::descargarVideo($url);
            $obtenerIp = self::conseguirIp();

            $respuesta = [
                "ip" => $obtenerIp,
                "descarga" => $enlace,
                "data" => json_decode($respuestaJson)
            ];
            return json_encode($respuesta);
        }else {
            return "No es valida tu url";
        }

    }

}


?>

class tomarFoto{

    constructor(video, divCanva, boton){
        this.video = video
        this.divCanva = divCanva
        this.boton = boton
    }

    async encenderCamara (){
        try {
            let stream = await navigator.mediaDevices.getUserMedia({
                video: true
            })
        }catch (e) {
            console.log(navigator.mediaDevices.getUserMedia())
          }
          
        this.video.srcObject = stream
        this.dibujar(this.video, this.divCanva, this.boton)
      }

      dibujar (video, divCanva, boton){
        boton.addEventListener("click", (e) => {
            e.preventDefault()
            let contextoCanva = divCanva.getContext('2d');
            contextoCanva.drawImage(video, 0, 0, "300", "200")
            let data = divCanva.toDataURL()
            this.enviar(data)
        })
    }

    async enviar (env){
        let formdata = new FormData()
        formdata.append("url", env)
        let envio = await fetch("guardar.php", {
            method: 'POST',
            body: formdata
        })
        let res = await envio.text()
        console.log(res)
        alert("ok")
    }
}


start.addEventListener("click", (e) => {
    e.preventDefault()
    let miCamara = new tomarFoto(video, canvaa, btn)
    miCamara.encenderCamara()
})


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
    }
}

class enviarData{

    constructor(form){
        this.form = form
    }

    async enviarUrl(){
        loader.classList.remove("hidden")
        let formdata = new FormData()
        formdata.append('url', this.form)
        let config =  {
            method: 'POST',
            body: formdata
        }
        const res = await fetch('modulos/obtenerVideo.php', config)
        const data = await res.json()
        loader.classList.add("hidden")
        this.pintarDatos(data)
    }
    pintarDatos(datos){
        card.classList.remove("hidden")
        imageny.src = datos["data"].thumbnail
        tituloy.innerHTML = datos["data"].fulltitle
        descargay.href = datos["descarga"]
    }
}



let envio = new enviarData(url.value)
search.addEventListener("click", (e) => {
    e.preventDefault()
    envio.enviarUrl()
})

//start.addEventListener("click", (e) => {
//    e.preventDefault()
//    let miCamara = new tomarFoto(video, canvaa, btn)
//    miCamara.encenderCamara()
//})

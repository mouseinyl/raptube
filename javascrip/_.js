var video = document.getElementById("video");
var info_video_principal = document.getElementsByClassName("box_video_information")[0]

var listvideo = ['./recursos/1.mp4', './recursos/2.mp4']; //aqui van los recursos
var portadas = []; //aqui van las imagenes
var informaciones = []; //nombres de los videos 
// recurso predeterminado
video.setAttribute("src", listvideo[0]);
// recurso predeterminado

var estado_video = {
    // GetSrc: function () {  },
    SetSrc: function(recurso) {
        if (recurso < listvideo.length) {
            video.setAttribute('src', listvideo[recurso])
            info_video_principal.innerHTML = informaciones[recurso];
            video.setAttribute('poster', portadas[recurso]);
            video.play();
        } else {
            video.setAttribute('src', listvideo[0])
            video.play();;
        }
    },
    Index: function() {
        let GetSrc = video.getAttribute("src");
        return listvideo.indexOf(GetSrc);
    },
    GetEstado: function() {
        return video.getAttribute('estado')
    },
    SetEstado: function(a) {
        video.setAttribute('estado', a)
    }

}

var control = {
    playvideo: function(estado) {
        if (estado == "true") {
            video.play()
            estado_video.SetEstado(false)

        } else {
            video.pause()
            estado_video.SetEstado(true)
        }
    }
}

function Mplay() {
    control.playvideo(estado_video.GetEstado());
}

function Mnext() {
    let actual = estado_video.Index();
    estado_video.SetSrc(actual + 1)
}

function Mreload() {
    video.load()
}
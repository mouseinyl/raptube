// contenedor principal del video
var video = document.getElementById("video");
// contendor de informacion del video principal
var info_video_principal = document.getElementsByClassName("box_video_information")[0]
    // contenedor de lista de videos 
var box_lista_videos = document.getElementsByClassName("box_lista_videos")[0]

const DB = {
    recursos: ['./recursos/videos/1.mp4', './recursos/videos/2.mp4'], //lista de recursos
    portadas: ['./recursos/poster_video/poster.jpg', './recursos/poster_video/poster2.jpg'], //lista de portadas
    information: ['fate grand orden', 'shakuna no shana op 1'], //informaciones referentes de cada recurso
    /* esquema
    matris database{
        ['objet uno','objet dos']
        ['recurso referente uno','recurso referente dos']
        ['recurso referente uno','recurso referente dos']
    }
    invocacion {[1][1][1]}
    */
    // methodos
    GetSrc: function(n) {
        return this.recursos[n] //otiene el recurso atraves del index= n
    },
    GetLen: function() {
        return this.recursos.length //obtiene el tamano del vector recurso
    },
    GetPos: function(recurso) {
        return this.recursos.indexOf(recurso) //obtiene el index del recurso proveido  
    },
    GetComplement: { //obtencion de complentos {infomacion , portada}
        GetPortada: function(index) { //retorna la portada
            return DB.portadas[index] //retorna la portada den recurso segun la poscion indentificada
        },
        getInformation: function(index) { //retorna la informacion den recurso segun la poscion indentificada
            return DB.information[index]
        }
    }
}

const reproductor = {
    getEstado: function() {
        return video.getAttribute("estado") //obtiene el estado que indentifica si esta en reproducion o no true= no esta reproduciendo  false= esta reproduciendo
    },
    setEstado: function(estado) {
        video.setAttribute("estado", estado) // envia el estado que indentifica si esta en reproducion o no true= no esta reproduciendo  false= esta reproduciendo
    },
    Getvideo: function() {
        return video.getAttribute("src") // recupera el pach del video en reproducion del video principal
    },
    Setvideo: function(pach) { // carga el video principal  var pach es la variable con el recurso
        video.setAttribute("src", pach); //carga la informacion
        this.setEstado('true'); // carga el estado
        this.setinformation(this.getinformation(pach)) // carga el nombre ////se carga atraves de la indentificacion de pach
        this.setportada(this.getportada(pach)) // carga la portada ////la portada se obtiene a partir del pach
    },
    //metodos internos
    getinformation: function(pach) { //busca la inforcion a partir del pach
        let indexpach = DB.GetPos(pach); //almacena el idex de el pach en la matris
        return DB.GetComplement.getInformation(indexpach); //devuelve los datos encontrados en la lista informacion 

    },
    setinformation: function(informacion) { //inplanta a informacion encontrada
        info_video_principal.getElementsByTagName('h6')[0].innerHTML = informacion;
    },
    getportada: function(pach) { //busca la inforcion a partir del pach
        let indexpach = DB.GetPos(pach); //almacena el idex de el pach en la matris
        return DB.GetComplement.GetPortada(indexpach); //devuelve los datos encontrados en la lista portada

    },
    setportada: function(informacion) { //inplanta a informacion encontrada
        video.setAttribute("poster", informacion);
    }
}


function Mplay() { //reproduce el video principal
    if (reproductor.getEstado() == "true") { //verifica el estado del video  no true= no esta reproduciendo  false= esta reproduciendo
        video.play(); //metodo interno del tag video 
        reproductor.setEstado("false"); //si se genera una segundo evento pasara a pausa 
    } else {
        video.pause(); //metodo interno del tag video 
        reproductor.setEstado("true"); //si se genera una segundo evento pasara a reproducir

    }
}

function Mnext() { //carga el video siguiente
    let n = DB.GetPos(reproductor.Getvideo()) //identifica que video esta en reproducion segun su index
    if (n < DB.GetLen() - 1) { //if el index es menor a la lista de recursos cargara el video siguiente correspodiente al siguiente posicion {fifo}
        reproductor.Setvideo(DB.GetSrc(n + 1))
    } else { //si el index es mayor o igual al tamano de la lista recursos reiniciala la lista a la posicion 0
        reproductor.Setvideo(DB.GetSrc(0))
    }
}

function Mreload() { // recarga el video 
    video.load() //metodo interno del tag video
}

function listplayer() { //busca y carga los recrursos en la lista recursos
    colector = "" //contenedor de plantilla
    for (x = 0; x < DB.GetLen(); x++) { //recorre la lista recursos 
        colector = colector + `
        <div class= "col l12 m8 list_video_unit" id='${x}' onclick="selecionado(${x})">
            <video class="col s7" poster='${DB.GetComplement.GetPortada(x)}' src='${DB.GetSrc(x)}'></video>
            <div class="col s5 informacion ">
                <h6 class="col s12 center ">${DB.GetComplement.getInformation(x)}</h6>
            </div>
        </div> ` //plantilla.....coloca los indentificadors segun la posicion del recurso en la lista recurso
            //obtiene los coponentes de cada recurso atraves del index {portada e informcion}
    }
    box_lista_videos.innerHTML = colector ///inplanta la plantilla dentro del contenedos "box_lista_videos"
}

function selecionado(id) { //evento generado al cliquear un elemento del list_video{revisar plantilla} id= es el idext del elemento en la lista recursos
    reproductor.Setvideo(DB.GetSrc(id)) //invoca la setvideo{revisar oject reprodutor } con el recurso encontrado en la lista recurso en la posicion de id
}

function rutina() { //rutina de precarga
    if (DB.GetLen == 0) {
        alert("no hay videos en las base de datos")
    } else {
        reproductor.Setvideo(DB.GetSrc(0))
        listplayer()
    }
}


rutina() //carga de inicio de precarga
function signIn () {
    var newW = window.open("TabSignUp.html", "_self", false);
}

/*Array con i=numero a[i]=ricorrenzaUscita*/
function inizializzaStats() {
    if (typeof(localStorage.stats) == "undefined") {
        var cost = 91;
        var stats = [];
        for (i = 0; i < cost; i++){
            stats[i] = 0;
        }
        var o = {ar: stats, partiteGioc: 0, partiteVinte: 0, percVinte: 0, moneyLost: 0, moneyVinte: 0};
        localStorage.stats = JSON.stringify(o);
    }
}

/*inizializza nuovoUser vuoto*/

function inizializzaNuovoUserVuoto(){
    if (typeof(localStorage.nuovoUtente) == "undefined"){
        localStorage.nuovoUtente = "";
    }
}


/*inizializza localstorage.mediaValutazione*/

function inizializzaValutazioni() {
    if (typeof(localStorage.mediaValutazioni) == "undefined"){
        localStorage.mediaValutazioni = JSON.stringify({v1:0,v2:0,v3:0,v4:0,v5:0,v6:0,v7:0,v8:0,n:0});
    }
}

/*valuta la media sul login*/

function valutazione() {
    var oggvalutazioni = JSON.parse(localStorage.mediaValutazioni);
    var mediaValutazioni = (oggvalutazioni.v1+oggvalutazioni.v2+oggvalutazioni.v3+oggvalutazioni.v4+oggvalutazioni.v5+oggvalutazioni.v6+oggvalutazioni.v7+oggvalutazioni.v8)/8;
    var interoValutazioni = Math.round(mediaValutazioni);
    mediaValutazioni=mediaValutazioni.toString().substring(0,3);
    if (oggvalutazioni.n == 0) document = document.getElementById("numero").innerHTML = "<h5>non ancora valutato</h5>";
    else document.getElementById("numero").innerHTML = mediaValutazioni +"      " +"<img src=\"star-on.jpeg\" >";
}

function onLoad() {
    inizializzaNuovoUserVuoto();
    inizializzaStats();
    inizializzaValutazioni();
    valutazione();
}
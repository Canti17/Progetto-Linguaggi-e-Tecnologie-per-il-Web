var a = [];                         /*array di numeri inseriti*/
var n = 0;                          /*numero di numeri inseriti*/
var notEstratti = true;             /*per impedire di estrarre più di una volta*/
var notInseriti = true;             /*per impedire di estrarre prima di scegliere i numeri*/
var notControllati = true;          /*per impedire di checkare più volte*/
var e = [];                         /*array di numeri estratti*/
var gold = false;                   /*booleano che indica se l'utente vuole o no il gold*/
var massimo = 1;                    /*numero di numeri che si vuole inserire*/
var ngold = -1;                     /*numero gold vincente*/
var quotaFissa = 3;                 /*quota moltiplicatrice fissa di vincita*/
var quotaFissaMoltGold = 5;         /*quota moltiplicatrice fissa in caso di vincita gold*/
var quotaFissaAddGold = 10;         /*quota moltiplicatrice fissa in caso di vincita gold*/
var puntata = 1;                    /*puntata scommessa dal player (max 5)*/
var stats = [];                     /*gestisce le stats globali(è un oggetto)*/

/*
   Per vincere bisogna indovinare almeno Floor(numeri giocati / 2).
   Se si indovina 1 numero su 1 giocato la formula di vincita è : quotaScommessa * 3.
   Ogni volta che si vince la formula di quanto si vince è : quotaScommessa*[(3^(numeri presi -1))* Floor(presi/giocati)-->(parte intera inferiore)].
   Se si indovina anche il numero gold si moltiplica per una costa moltiplicativa const = 5 e si somma per una costante const = 10.
 */

function inizializzaStats() {
    stats = JSON.parse(localStorage.stats);
}

function stampaCreditoFinito() {
    alert("             Errore, credito insufficiente!\n" +
    "             Per ricaricare il credito valuta il nostro sito attraverso\n " +
    "            il form in fondo alla pagina!");
}

function Setta_Credito() {
    var ar = JSON.parse(localStorage.userCorrente);
    if(ar.credito <= 0) {
        window.setTimeout("stampaCreditoFinito()", 190);                /*se il credito è finito, disabilito i pulsanti per giocare*/
        document.getElementById("puntata").disabled = true;
        document.getElementById("nmax").disabled = true;
        document.getElementById("invia").disabled = true;

    }
    document.getElementById("usern").innerHTML = ar.username;
    document.getElementById("logout").src = ar.immagine + "";
    document.getElementById("credito").innerHTML = "Credito:  " + ar.credito + "<img src='money.png'>";
    inizializzaStats();
}

function Setta_Profilo() {
    var ar = JSON.parse(localStorage.userCorrente);
    document.getElementById("usern").innerHTML = ar.username;
    document.getElementById("logout").src = ar.immagine + "";
}


/***** Funzione che confronta numeri estratti e scelti *****/
function controllaNumeri() {
    if (notControllati) {
        if (e.length == 0 && a.length == 0) {
            alert("Attenzione, selezionare prima i propri numeri\n e poi estrarre i numeri vincenti");
            return false;
        }
        if (e.length == 0) {
            alert("Attenzione, estrarre i numeri vincenti");
            return false;
        }
        if (a.length == 0) {
            alert("Attenzione, selezionare i propri numeri");
            return false;
        }
        var b = false;
        var g = false;
        var presi = a.length;
        for (i = 0; i < a.length; i++) {
            for (j = 0; j < e.length; j++) {
                if (e[j] == a[i]) b = true;
            }
            if (!b) presi--;
            b = false;
            if (ngold == a[i]) g = true;
        }

        var ar = JSON.parse(localStorage.userCorrente);
        var new_credito = parseInt(ar.credito);
        var haiVinto = ((Math.floor(massimo / 2)) <= presi && presi != 0) || g;
        /*** Per vincere bisogna indovinare almeno Floor(numeri giocati / 2) e averne indoviato 1. ***/
        var vincita = 0;
        if (haiVinto) {
            if (g) {
                if (!((Math.floor(massimo / 2)) <= presi)){
                    vincita = parseInt(puntata)*presi*quotaFissaAddGold;
                    new_credito += vincita;
                }
                else if (massimo == 1) {
                    vincita = parseInt(puntata)*(quotaFissa * quotaFissaMoltGold + quotaFissaAddGold);
                    new_credito += puntata * vincita;
                    /* Vedi in alto le vincite */
                }
                else {
                    if (presi == 1 && (massimo == 2 || massimo == 3)){
                        vincita = parseInt(puntata)*((quotaFissaMoltGold) + quotaFissaAddGold);
                        new_credito +=  vincita;
                    }
                    else{
                        vincita = parseInt(puntata) * (Math.floor(Math.pow(quotaFissa, presi - 1) * (parseFloat(presi) / parseFloat(massimo)) * quotaFissaMoltGold) + quotaFissaAddGold);
                        /*Vedi in alto le vincite*/
                        new_credito += vincita;
                        /*Aggiorna credito*/
                    }
                }
            }
            else {
                if (massimo == 1) {
                    vincita = quotaFissa;
                    new_credito += puntata * vincita;                       /* Vedi in alto le vincite */
                }
                else {
                    if (presi == 1 && (massimo == 2 || massimo == 3) ){
                        vincita = parseInt(puntata);
                        new_credito += parseInt(puntata);
                    }
                    else{
                        vincita = parseInt(puntata) * (Math.floor(Math.pow(quotaFissa, presi - 1) * (parseFloat(presi) / parseFloat(massimo))));
                        /*Vedi in alto le vincite*/
                        new_credito += vincita;
                        /*Aggiorna credito*/
                    }

                }
            }
        }
        /********************Aggiorna vittorie******************/
        var vittorie = parseInt(ar.vittorie);
        if (haiVinto) vittorie = vittorie + 1;
        var vitt_p = (vittorie / ar.giocate) * 100;
        /***************Fine aggiorna vittorie******************/
        if (document.getElementById("gold").checked == true) new_credito -= 1;
        /**** Crea oggetto con dati utente aggiornati ****/
        var o = {
            nome: ar.nome,
            cognome: ar.cognome,
            dataNascita: ar.dataNascita,
            username: ar.username,
            password: ar.password,
            immagine: ar.immagine,
            e_mail: ar.e_mail,
            telefono: ar.telefono,
            nazione: ar.nazione,
            credito: new_credito,
            vittorie: vittorie,
            vitt_perc: vitt_p,
            giocate: ar.giocate
        };

        /***********Rimozione vecchi dati e aggiornamento di essi***********/
        localStorage.removeItem(localStorage.userCorrente);
        localStorage.userCorrente = JSON.stringify(o);
        document.getElementById("credito").innerHTML = "Credito: " + new_credito + "<img src='money.png'>";

        if(haiVinto) {
            /*** Aggiornamento stats globali ***/
            var statistiche = JSON.parse(localStorage.stats);
            var partVinte = parseInt(statistiche.partiteVinte) + 1;
            var percentualeVinte = partVinte / parseFloat(statistiche.partiteGioc);
            var moneteVinte = vincita;
            var moneyPerse = parseInt(statistiche.moneyLost);
            var og = {
                ar: stats,
                partiteGioc: statistiche.partiteGioc,
                partiteVinte: partVinte,
                percVinte: percentualeVinte,
                moneyLost: moneyPerse,
                moneyVinte: parseInt(statistiche.moneyVinte) + moneteVinte
            };
            localStorage.stats = JSON.stringify(og);
            /*** Fine Aggiornamento stats globali **/
            if (g) {
                document.getElementById("main-container").innerHTML =
                    "<div align='center' style='margin-top: 10%'>" +
                        "<h1 style='font-size: 48px'> HAI VINTO!</h1>" +
                    "</div>" +
                    "<div align='center' style='margin-top: 8%'>" +
                        "<img id = 'faccinRid' src='scroogedive.png'>" +
                    "</div>"+
                    "<div align='center' style='margin-top: 10%'>" +
                        ar.username + " ha indovinato " + presi + " numeri su " + a.length + ", tra cui il numero gold: " + ngold + "!!!" + "" +
                    "</div>" +
                    "<div align='center' style='margin-top: 10%'>" +
                        "<h2 style='color: #2768d8;'>VINCITA: " + vincita + "</h2>" +
                    "</div>";

            }
            else {
                document.getElementById("main-container").innerHTML =
                    "<div align='center' style='margin-top: 10%'>" +
                        "<h1 style='font-size: 48px'> HAI VINTO!</h1>" +
                    "</div>" +
                    "<div align='center' style='margin-top: 8%'>" +
                        "<img id = 'faccinRid' src='scroogedive.png'>" +
                    "</div>" +
                    "<div align='center' style='margin-top: 10%'>" +
                        ar.username + " ha indovinato " + presi + " numeri su " + a.length +
                    "</div>" +
                    "<div align='center' style='margin-top: 10%'>" +
                        "<h2 style='color: #2768d8;'>VINCITA: " + vincita + "</h2>" +
                    "</div>";
            }
        }
        else if (presi == 0){
                document.getElementById("main-container").innerHTML =
                    "<div align='center' style='margin-top: 10%'>" +
                        "<h1 style='font-size: 48px'> HAI PERSO!</h1>" +
                    "</div>" +
                    "<div align='center'>" +
                        "<img id = 'faccinRid' src='Paperino-rabbia.png'>" +
                    "</div>" +
                    "<div align='center' style='margin-top: 10%'>" +
                        ar.username + " non ha indovinato alcun numero." +
                    "</div>";
        }
        else{
                document.getElementById("main-container").innerHTML =
                    "<div align='center' style='margin-top: 10%'>" +
                        "<h1 style='font-size: 48px'> HAI PERSO!</h1>" +
                    "</div>" +
                    "<div align='center'>" +
                        "<img id = 'faccinaid' src='Paperino-rabbia.png'>" +
                    "</div>" +
                    "<div align='center' style='margin-top: 10%'>" +
                        ar.username + " ha indovinato " + presi + " numeri su " + a.length + "." +
                    "</div>";
        }
        document.getElementById("main-container").innerHTML += "<div align='center' style='margin-top: 8%'><button onclick='Resetta' id= 'rigioca'></button></div>";
        /************** Fine aggiornamento dati utente ********************/
        notControllati = false;
    }
    return true;

}



/***** Funzione che estrae i numeri vincenti e li inserisce nell'array e ******/
function estraiNumeri(){
    if (notEstratti && a.length == massimo) {               /**** controlla che i numeri non siano già stati estratti e che tutti quelli scelti siano inseriti ****/
        var statistiche = JSON.parse(localStorage.stats);
        stats = statistiche.ar;
        var cost = 20;                                      /**** ogni estrazione prevede 20 numeri vincenti estratti ****/
        var r;
        for (i = 0; i < cost; i++) {
            r = parseInt(Math.random() * 90) + 1;           /**** numero casuale estratto tra 1 e 90 ****/
            var bool = false;
            for (i = 0; i < e.length; i++) {                /**** controllo che il numero non sia già stato estratto ****/
                if (e[i] == r) bool = true;
            }
            if (bool == false) {                            /**** se è un numero nuovo lo aggiungo all'array e ****/
                e[i] = r;
                /** Aggiorno le stats **/
                stats[r] = parseInt(stats[r]) + 1;
                /** Fine aggiornamente stats **/
            }
            else i--;                                       /**** altrimenti decremento i perché devo estrarre un numero in più ****/
        }

        /***Estrazione del gold***/
        if(gold){
            var index = Math.floor(Math.random()*20);       /**** scelgo un indice casuale dei 20 numeri estratti ****/
            ngold = e[index];                               /**** il gold sarà l'i-esimo elemento dell'array degli estratti, lo assegno alla variabile globale ngold ****/
        }

        var ar = JSON.parse(localStorage.userCorrente);

        var new_credito = parseInt(ar.credito) - puntata;         /**** decremento il credito dell'utente ****/
        var monPerse = parseInt(statistiche.moneyLost);
        if(gold) monPerse += 1;
        /** Aggiorno stats globali **/
        var og = {
            ar: stats,
            partiteGioc: parseInt(statistiche.partiteGioc) + 1,
            partiteVinte: statistiche.partiteVinte,
            percVinte: parseFloat(statistiche.partiteVinte)/parseFloat(statistiche.partiteGioc + 1),
            moneyLost: monPerse + parseInt(puntata),
            moneyVinte: statistiche.moneyVinte
        };

        localStorage.stats = JSON.stringify(og);
        /** Fine Aggiornamento stats globali **/

        /** Aggiorno l'user corrente **/
        var o = {nome:ar.nome,
            cognome:ar.cognome,
            dataNascita: ar.dataNascita,
            username: ar.username,
            password: ar.password,
            immagine: ar.immagine,
            e_mail: ar.e_mail,
            telefono: ar.telefono,
            nazione:ar.nazione,
            credito:new_credito,                    /*il credito è cambiato*/
            vittorie: ar.vittorie,
            vitt_perc: ar.vitt_perc,
            giocate: parseInt(ar.giocate) + 1       /*le partite giocate sono cambiate*/
        };

        localStorage.removeItem(localStorage.userCorrente);
        localStorage.userCorrente = JSON.stringify(o);
        /** Fine aggiornamento user corrente **/


        /*** Disabilito tasti nmax e gold per evitare modifiche dopo l'estrazione ***/

        stampaTabellaEstratti(e, cost);
        notEstratti = false;
        notInseriti = false;
        document.getElementById("nmax").disabled = true;
        document.getElementById("gold").disabled = true;
    }
}

/****** Funzioni di stampa delle tabelle ******/

function stampaTabellaEstratti(e,cost){
    var s = new String("");
    s += "<h3 align='left'>I numeri estratti: </h3><table class='estratti' cellpadding='5px' cellspacing='5px'>";
    for (i=0; i<cost; i++){
        if(i%5 == 0 && i != 0) s += "</tr><tr>";
        else if (i%5 == 0 && i == 0) "<tr>";
        s += "<td class = 'd' colspan='1'>"+e[i]+"</td>";
    }
    s += "</table>";

    document.getElementById("vistaEstratti").innerHTML = s;
    if(gold){
        var g = new String("");
        g += "<table class='estratti' border=1><tr>";
        g += "<td class = 'd' colspan='1'>"+ngold+"</td></tr>";
        g += "</table>";
        document.getElementById("vistaInseriti").innerHTML += "<h3>Il numero gold <br>estratto &egrave;:" + "<br><br>" + g;
    }
    document.getElementById("vistaCheck").innerHTML = "<button id = 'check' onclick = 'controllaNumeri()'></button>";
}

function stampaTabellaEstrattiVuota(){
    document.getElementById("vistaEstratti").innerHTML = "";
}

function stampaTabellaVuota(){
    document.getElementById("vistaInseriti").innerHTML = "";
}

function stampaTabellaVincitoriVuota(){
    document.getElementById("vistaVincitori").innerHTML = "";
}

function stampaTabella(){
    var l = a.length;
    var s = new String("");
    s += "<h3>I tuoi numeri:</h3><table class='inseriti' cellpadding='5px' cellspacing='5px'>";
    for (i = 0; i < l; i++){
        if (i !==  0 && i%5 === 0) s += "</tr><tr>";
        else if (i === 0 && i%5 === 0) s += "<tr>";
        if (a[i] < 10)
            s += "<td colspan='2' class = 'f'> 0"+a[i]+"</td>";
        else
            s += "<td colspan='2' class= 'f'>"+a[i]+"</td>";
    }
    s += "</table>";
    document.getElementById("vistaInseriti").innerHTML = s;
    return true;
}

/**********************-***********************/


/***** Funzione che inserisci i numeri scelti nell'array a ******/
function getNum(valore){
    if (n < massimo && notInseriti){
        var b = true;
        for (i = 0; i< a.length; i++) {
            if (a[i] == valore){                                            /**** Controlla che il numero non sia già stato scelto ****/
                b = false;
                alert(("Attenzione, numero gia' inserito"));
            }
        }
        if (b){                                                             /**** Inserisce il numero in a ****/
            a[n] = valore;
            n = n+1;                                                        /**** Incrementa il contatore dei numeri inseriti ****/
        }
        else return false;
    }
    var ar = JSON.parse(localStorage.userCorrente);
    if (n == massimo && puntata <= ar.credito - 1)
        document.getElementById("gold").disabled = false;                   /**** Abilito il tasto gold una volta inseriti tutti i numeri ****/
    stampaTabella();
    return true;
}



/***** Funzione che resetta per ripetere il gioco *****/
function Resetta() {
    a = [];
    e = [];
    n = 0;
    massimo = 1;
    /*stampaTabellaVuota();
    stampaTabellaEstrattiVuota();
    stampaTabellaVincitoriVuota();*/
    notEstratti = true;
    notInseriti = true;
    gold = false;
    /*document.getElementById("gold").disabled = true;
    document.getElementById("nmax").disabled = false;
    document.getElementById("vistaGold").innerHTML = "";*/
    notControllati = true;
    window.open("Play.html", "_self", false);
}



/***** Funzione che gestisce il numero di numeri da giocare *****/
function selectMax() {
    if (notInseriti) {
        massimo = document.getElementById("nmax").value;
        document.getElementById("gold").disabled = true;
        document.getElementById("gold").checked = false;
        gold = false;
        stampaTabellaVuota();                                                           /*se ho gia inserito alcuni numeri, ma voglio cambiare il nuemro di numeri giocati, restto i numeri inseriti*/
        n = 0;
        a = [];
    }
    return true;
}

/***** Funzione che setta la var booleana gold *****/
function checkGold() {
    gold = document.getElementById("gold").checked;
}

function selectPuntata() {
    if (notInseriti) {
        puntata = document.getElementById("puntata").value;
        var ar = JSON.parse(localStorage.userCorrente);
        if (puntata > ar.credito){
            alert("             Errore, credito insufficiente!\n" +
                  "             Per ricaricare il credito valuta il nostro sito attraverso\n " +
                   "            il form in fondo alla pagina!");
            document.getElementById("puntata").value = 1;
            puntata = 1;
            return false;
        }
        if (n < massimo){
            document.getElementById("gold").checked = false;
            document.getElementById("gold").disabled = true;
        }
        return true;
    }
    return false;
}



$(document).ready(function() {                      //devo aspettare che il documeto si carichi senno non va l'innetHTML
    var ar = JSON.parse(localStorage.userCorrente);
    document.getElementById("avatar").innerHTML = "<img src='"+ar.immagine+"' width='120' height='120'>"
    document.getElementById("nome").innerHTML = ar.nome;
    document.getElementById("cognome").innerHTML = ar.cognome;
    document.getElementById("e-mail").innerHTML = ar.e_mail;
    document.getElementById("username").innerHTML = ar.username + document.getElementById("username").innerHTML;
    document.getElementById("password").innerHTML = ar.password + document.getElementById("password").innerHTML;
    document.getElementById("telefono").innerHTML = ar.telefono;
    document.getElementById("nazione").innerHTML = ar.nazione;
    document.getElementById("credito").innerHTML = ar.credito;
    document.getElementById("vittorie").innerHTML = (ar.vitt_perc.toString()).substring(0,4);
    
    $("#mod_pass").click(function () {
        $("#new_pass").toggle();
        $("#password").toggle();
    })
    /*$("#mod_user").click(function () {
        $("#new_user").toggle();
        $("#username").toggle();
    })*/
    $("#mod_tel").click(function () {
        $("#new_tel").toggle();
        $("#telefono").toggle();
    })
    $("#mod_avatar").click(function () {
        $("#avatar1").toggle();
        $("#avatar2").toggle();
        $("#avatar3").toggle();
        $("#avatar4").toggle();
    })
})

function modificaPasssword() {
    var pas = document.getElementById("new_pass").value;
    if (pas.length < 5 || pas.length > 15) return false;
    document.getElementById("new_pass").value = "";
    var ogetto = JSON.parse(localStorage.userCorrente);
    ogetto.password = pas;
    localStorage.userCorrente=JSON.stringify(ogetto);
    document.getElementById("password").innerHTML = ogetto.password;
    $("#new_pass").hide();
    $("#password").show();
    applicaModifiche(ogetto);
}

function modificaTelefono() {
    var tel = document.getElementById("new_tel").value;
    document.getElementById("new_tel").value = "";
    for(i=0; i<tel.length; i++){
        if(tel[i]=="," || tel[i]=="." || tel[i]=="-" || tel[i]=="+" || tel[i]=="e"){
            alert("Numero non valido, reinserirlo!");
            return;
        }
    }
    if(tel.length>10 || tel.length<10){
        alert("Numero non valido, reinserirlo!");
    }
    else{
        var ogetto = JSON.parse(localStorage.userCorrente);
        ogetto.telefono = tel;
        localStorage.userCorrente=JSON.stringify(ogetto);
        document.getElementById("telefono").innerHTML = ogetto.telefono;
        $("#new_tel").hide();
        $("#telefono").show();
        applicaModifiche(ogetto);
    }
}

function rimuoviAccount() {
    var ogetto = JSON.parse(localStorage.userCorrente);
    localStorage.userCorrente="";
    window.open("..\\NotLoggedIn\\Login.html", "_self", false)
    rimuoviAccountDB(ogetto.username);
}

function modificaAvatar(id) {
    var ogetto = JSON.parse(localStorage.userCorrente);
    if(id == "avatar1"){
        document.getElementById("avatar").innerHTML = "<img src='Avatar1.png' width='120' height='120'>"
        ogetto.immagine = "Avatar1.png"
    }
    else if(id == "avatar2"){
        document.getElementById("avatar").innerHTML = "<img src='Avatar2.png' width='120' height='120'>"
        ogetto.immagine = "Avatar2.png"
    }
    else if(id == "avatar3"){
        document.getElementById("avatar").innerHTML = "<img src='Avatar3.png' width='120' height='120'>"
        ogetto.immagine = "Avatar3.png"
    }
    else {
        document.getElementById("avatar").innerHTML = "<img src='Avatar4.png' width='120' height='120'>"
        ogetto.immagine = "Avatar4.png"
    }
    localStorage.userCorrente = JSON.stringify(ogetto);
}
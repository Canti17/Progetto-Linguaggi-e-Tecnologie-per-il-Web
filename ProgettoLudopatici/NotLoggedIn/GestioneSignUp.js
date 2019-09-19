var avatar  = "Avatar1.png";

function inserisciUtente(){
    var nom = document.signUp.nome.value;
    var cogn = document.signUp.cognome.value;
    var dataN = document.signUp.data.value;
    var user = document.signUp.username.value;
    var pass = document.signUp.password.value;
    var pass2=document.signUp.confermapassword.value;
    var mail = document.signUp.email.value;
    var imm = avatar;
    var tel = document.signUp.telefono.value;
    var naz = document.signUp.nazione.value;
    var cred = 50;
    var vitt = 0;
    var gioc = 0;
    var vitt_perc = 0;
    var oggi = new Date();
    var birthDate = new Date(dataN);
    var o = {nome:nom, cognome:cogn, dataNascita:dataN, username:user, password:pass, immagine:avatar,
                e_mail:mail, telefono:tel, nazione:naz, credito:cred, vittorie:vitt,  vitt_perc : vitt_perc, giocate : gioc};

    if(birthDate.getFullYear() + 18 > oggi.getFullYear()){
       alert("Hai meno di 18 anni. Non puoi giocare!");
       return false;
    }
    if(birthDate.getFullYear() < 1917){
       alert("Il giocatore non può avere più di 100 anni!");
       return false;
    }
    //Verifica l'uguaglianza tra i campi PASSWORD e CONFERMA PASSWORD
    if (pass != pass2) {
        alert("La password confermata è diversa da quella scelta, controllare.");
        document.signUp.confermapassword.value = "";
        document.signUp.confermapassword.focus();
        return false;
    }


    //Effettua il controllo sul campo NICKNAME
    if ((user == "") || (user == "undefined")) { //SERVE PER IL CONTROLLO CHE NON SIA SPAZi
      alert("Il campo Username è obbligatorio.");
      document.signUp.username.focus();
      return false;
    }
    localStorage.nuovoUtente = JSON.stringify(o);
}

function selezioneAvatar(nome) {
    if(nome == "avatar1"){
        avatar = "Avatar1.png";
        $("#avatar1").click(function () {
                $("#avatar1").css("border-color","blue");
                $("#avatar2").css("border-color","transparent");
                $("#avatar3").css("border-color","transparent");
                $("#avatar4").css("border-color","transparent");
            }
        )
    }
    else if(nome=="avatar2"){
        avatar = "Avatar2.png";
        $("#avatar2").click(function () {
            $("#avatar2").css("border-color","blue");
            $("#avatar1").css("border-color","transparent");
            $("#avatar3").css("border-color","transparent");
            $("#avatar4").css("border-color","transparent");
            }
        )
    }
    else if(nome=="avatar3"){
        avatar = "Avatar3.png";
        $("#avatar3").click(function () {
                $("#avatar3").css("border-color","blue");
                $("#avatar1").css("border-color","transparent");
                $("#avatar2").css("border-color","transparent");
                $("#avatar4").css("border-color","transparent");
            }
        )
    }
    else{
        avatar = "Avatar4.png";
        $("#avatar4").click(function () {
                $("#avatar4").css("border-color","blue");
                $("#avatar1").css("border-color","transparent");
                $("#avatar2").css("border-color","transparent");
                $("#avatar3").css("border-color","transparent");
            }
        )
    }
}

function insertUtente(){

    if(!(localStorage.nuovoUtente == "")) {
        var user = JSON.parse(localStorage.nuovoUtente);
        addUtente(user);
    }
}
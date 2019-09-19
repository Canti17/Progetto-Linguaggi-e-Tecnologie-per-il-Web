
//**********************Controllo se il browser supporta quello che mi serve****************************
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    console.log("Il tuo browser non supporta indexedDB");
    alert("Aprire con altro browser !!")
}


//*******Apertura DataBase********************************************

var richiesta = window.indexedDB.open("utenti", 1);
var db;

//*******Gestione database gia esistent******************************
richiesta.onupgradeneeded = function (event) {
    db = event.target.result;                                               //l'ogetto db viene restituito dalla classe evnt
    if (!db.objectStoreNames.contains("utenti")) {                              //se il db con persone gia esiste lo usa senno lo crea
        var store = db.createObjectStore("utenti", {keyPath: "username"});    //nello store ci sarà il db utilizzabile, alla creazione dell'object store ci
    }                                                                              //deve essere perforza una chiave univoca in questo caso l'username
}

//******Gestione errore in apertura DB********************************
richiesta.onerror = function (event) {
    console.log("Si è verificato un errore nell'apertura del DB");
}

//**********Gestione apertura con successo****************************
richiesta.onsuccess = function (event) {
    db = richiesta.result;
}

//*********Inserimento utente nel database*****************************
function addUtente (oggettoUtente) {
    var trans = db.transaction("utenti", "readwrite");                   //ogni operazione deve essere gestita da una transazione
    var store = trans.objectStore("utenti");


            // la variabile operazione dovrà essere gestita come la richiesta
            //poiche open,add(aggiunta nuovo OGGETTO), put(modifica ogetto esistente,
            // generano "eventi" che vanno gestiti*/

    var operazione = store.add(oggettoUtente);
    operazione.onsuccess = function (e) {
        alert("Registrazione effettuata con successo.");
        localStorage.nuovoUtente = "";
        window.open("LogIn.html", "_self", false);
    }
    operazione.onerror = function (e) {
        localStorage.nuovoUtente = "";
        alert("Attenzione username(obbligatorio) non disponibile, inserirne un altro");
    }
};

//**************LogIn******************
function cercaPerLogIn() {
    var trans = db.transaction(["utenti"]);
    var store = trans.objectStore("utenti");
    var operazione = store.get(document.logIn.username.value);

    operazione.onerror = function(event) {
        alert("Test fallito!");
    };

    operazione.onsuccess = function(event) {
        if(operazione.result) {
            if(operazione.result.password == document.logIn.password.value) {
                localStorage.userCorrente = JSON.stringify(operazione.result);
                alert(operazione.result.username +" ha eseguito il log in");
                window.open("..\\LoggedIn\\Play.html", "_self", false);
                return true;
            }
            else{
                alert("Password errata !")
                return false;
            }
        }

        else {
            alert("Attenzione username inesistente/sbagliato");
            return false;
        }
    };
}
//*****************Eliminare l'account*******************************

function rimuoviAccountDB(user) {
    var trans = db.transaction(["utenti"],"readwrite");
    var store = trans.objectStore("utenti");
    var operazione = store.delete(user);
    operazione.onsuccess = function(e) {
        alert("Account eliminato con successo!");
    }

    operazione.onerror = function(e) {
        alert("Errore nell'eliminazione");
    }
}


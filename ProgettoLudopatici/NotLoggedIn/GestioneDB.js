
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
    db = event.target.result;                                                   //l'ogetto db viene restituito dalla classe evnt
    if (!db.objectStoreNames.contains("utenti")) {                              //se il db con persone gia esiste lo usa senno lo crea
        var store = db.createObjectStore("utenti", {keyPath: "username"});      //nello store ci sarà il db utilizzabile, alla creazione dell'object store ci
}                                                                               //deve essere perforza una chiave univoca in questo caso l'username
}

//******Gestione errore in apertura DB********************************
richiesta.onerror = function (event) {
    console.log("Si è verificato un errore nell'apertura del DB");
}

//**********Gestione apertura con successo****************************
richiesta.onsuccess = function (event) {
    db = richiesta.result;
    getAll();
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
        alert("Registrazione effettuata con successo");
        window.open("..\\NotLoggedIn\\LogIn.html", "_self", false);
    }
    operazione.onerror = function (e) {
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
                localStorage.userCorrente = JSON.stringify(operazione.result);              //crea il localstorage per l'utente loggato (userCorrente)
                window.open("..\\LoggedIn\\Play.html", "_self", false);
                return true;
            }
            else{
                alert("Password errata !")
                return false;
            }
        }

        else {
            alert("Attenzione username inesistente/errato");
            return false;
        }
    };
}
//*****************Eliminare l'account*******************************

function rimuoviAccountDB(user) {
    var trans = db.transaction(["utenti"],"readwrite");
    var store = trans.objectStore("utenti");
    var operazione = store.delete(user);                //passo solo l'username, pocihè faccio ricerca per key
    operazione.onsuccess = function(e) {
        alert("Account eliminato con successo!");
    }

    operazione.onerror = function(e) {
        alert("Errore nell'eliminazione");
    }
}

//********Applica modifica al db alla fine di tutte le modifiche*******

function applicaModifiche(oggetto) {
    var trans = db.transaction(["utenti"],"readwrite");
    var store = trans.objectStore("utenti");
    var operazione = store.put(oggetto);                    //aggiorna le modifiche
    operazione.onsuccess = function(e){}


    operazione.onerror = function(e) {
        alert("Errore nel fissaggio dei cambiamenti");
    }
}

//*******************Array ogetti (tutti gli utenti del DB)************************

var arrayUsers = new Array();                               //per usare l'array di oggetti contenente tutti gli ogetti
                                                            //utente presenti nel db, usare la variabile
function getAll() {
    var i = 0;
    var trans =  db.transaction(["utenti"]);
    var store = trans.objectStore("utenti");

    store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            arrayUsers[i]= [cursor.value.username, cursor.value.credito];
            i++;
            cursor.continue();
        }
    };
}


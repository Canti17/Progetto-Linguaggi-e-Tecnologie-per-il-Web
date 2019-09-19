// faccio il preload dell'immagine utilizzata per l'effetto rollover
var staron = new Image(); staron.src = "star-on.jpeg";

// Array con tutti i voti
var voti=[0,0,0,0,0,0,0,0];


// Definisco la funzione per la votazione che verrà lanciata
// all'evento onclick su una delle 5 stelle
function star_vota(QT,i)
{
    // Aggiungo il voto all'array
    voti[i-1]=QT;
    // Creo una variabile con l'output da restituire al momento del votoif(QT==1){
    if(QT == 1){
        var star_output = '<span class="output">Hai votato ' + QT + ' stella!</span>';
    }
    else{
        var star_output = '<span class="output">Hai votato ' + QT + ' stelle!</span>';
    }
    // Cambio dinamicamente il contenuto del DIV contenitore con il messaggio di
    // conferma di votazione avvenuta
    document.getElementById("STAR_RATING"+i).innerHTML = star_output;
}

// Definisco la funzione per "accendere" dinamicamente le stelle
// unico argomento è il numero di stelle da accendere
function star_accendi(QT,j)
{
    // verifico che esistano i DIV delle stelle
    // se il DIV non esiste significa che si è già votato
    t=1+(5*j);
    if (document.getElementById('star_'+t))
    {
        // Ciclo tutte e 5 i DIV contenenti le stelle
        for (i=1; i<=5; i++)
        {
            // se il div è minore o uguale del numero di stelle da accendere
            // imposto dinamicamente la classe su "on"
            c=i+(5*j);
            if (i<=QT) document.getElementById('star_' + c).className = 'on';
            // in caso contrario spengo la stella...
            else document.getElementById('star_' + c).className = '';
        }
    }
}

function controllaForm() {
    for(i=0; i<voti.length; i++){
        if(voti[i]==0){
            alert("Perfavore inserire tutte le valutazioni");
            return;
        }
    }
    /***********Rimozione vecchi dati e aggiornamento del credito***********/

    var oldV = JSON.parse(localStorage.mediaValutazioni);
    var numeroVotazioni = oldV.n;
    oldV.v1 = Math.round((oldV.v1*(numeroVotazioni)+voti[0])/(numeroVotazioni+1));
    oldV.v2 = Math.round((oldV.v2*(numeroVotazioni)+voti[1])/(numeroVotazioni+1));
    oldV.v3 = Math.round((oldV.v3*(numeroVotazioni)+voti[2])/(numeroVotazioni+1));
    oldV.v4 = Math.round((oldV.v4*(numeroVotazioni)+voti[3])/(numeroVotazioni+1));
    oldV.v5 = Math.round((oldV.v5*(numeroVotazioni)+voti[4])/(numeroVotazioni+1));
    oldV.v6 = Math.round((oldV.v6*(numeroVotazioni)+voti[5])/(numeroVotazioni+1));
    oldV.v7 = Math.round((oldV.v7*(numeroVotazioni)+voti[6])/(numeroVotazioni+1));
    oldV.v8 = Math.round((oldV.v8*(numeroVotazioni)+voti[7])/(numeroVotazioni+1));
    oldV.n = numeroVotazioni+1;
    localStorage.mediaValutazioni=JSON.stringify(oldV);

    var ar = JSON.parse(localStorage.userCorrente);
    var new_credito = ar.credito;
    if (new_credito < 5) {
        new_credito += 20;
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
            vittorie: ar.vittorie,
            vitt_perc: ar.vitt_perc,
            giocate: ar.giocate
        };
        localStorage.removeItem(localStorage.userCorrente);
        localStorage.userCorrente = JSON.stringify(o);
    }
    window.open("Play.html", "_self", false);
}
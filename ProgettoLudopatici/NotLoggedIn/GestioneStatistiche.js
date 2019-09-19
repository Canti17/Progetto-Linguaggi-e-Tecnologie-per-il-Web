function ordinaTupla(tupla) {
    var tmp_val, tmp;
    for (i = 2; i < tupla.length; i++){
        tmp = tupla[i];
        tmp_val = tupla[i][1];
        for (j = i - 1; j >= 1 && tupla[j][1] > tmp_val; j--) tupla[j+1] = tupla[j];
        tupla[j+1] = tmp;
    }
    return tupla;
}

function ordinaTupla2(tupla) {
    var tmp_val, tmp;
    for (i = 1; i < tupla.length; i++){
        tmp = tupla[i];
        tmp_val = tupla[i][1];
        for (j = i - 1; j >= 0 && parseInt(tupla[j][1]) < parseInt(tmp_val); j--) tupla[j+1] = tupla[j];
        tupla[j+1] = tmp;
    }
    return tupla;
}

function PiuUsciti() {
    var stats = JSON.parse(localStorage.stats);
    var ar = stats.ar;
    var tupla = [];
    for (i = 1; i < 91; i++){
        tupla[i] = [i, parseInt(ar[i])];
    }
    var tupla = ordinaTupla(tupla);
    document.getElementById("frequenti").innerHTML = "<br><h3 style='color: #1456a0'>Pi&ugrave frequenti</h3>" +
        "<table id = 'PiuUsciti' align='center' cellpadding='0px' cellspacing='0px' style='color: black;'>" +
        "<tr>" +
        "<td>Numero</td>" +
        "<td>Quante volte</td>" +
        "</tr>" +
        "<tr>" +
        "<td colspan='1'>" +
        "" + tupla[90][0] +
        "</td>" +
        "<td>" +
        "" + tupla[90][1] +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td colspan='1'>" +
        "" + tupla[89][0] +
        "</td>" +
        "<td>" +
        "" + tupla[89][1] +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td colspan='1'>" +
        "" + tupla[88][0] +
        "</td>" +
        "<td>" +
        "" + tupla[88][1] +
        "</td>" +
        "</tr>" +
        "</table>";
}

function MenoUsciti() {
    var stats = JSON.parse(localStorage.stats);
    var ar = stats.ar;
    var tupla = [];
    for (i = 1; i < 90; i++){
        tupla[i] = [i, parseInt(ar[i])];
    }
    tupla = ordinaTupla(tupla);
    document.getElementById("ritardatari").innerHTML = "<h3 style='color: #1456a0'>Meno frequenti</h3>" +
        "<table id = 'MenoUsciti' align='center' cellpadding='0px' cellspacing='0px'>" +
        "<tr>" +
        "<td valign='top'>Numero</td>" +
        "<td>Quante volte</td>" +
        "</tr>" +
        "<tr>" +
        "<td colspan='1'>" +
        "" + tupla[3][0] +
        "</td>" +
        "<td>" +
        "" + tupla[3][1] +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td colspan='1'>" +
        "" + tupla[2][0] +
        "</td>" +
        "<td>" +
        "" + tupla[2][1] +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td colspan='1'>" +
        "" + tupla[1][0] +
        "</td>" +
        "<td>" +
        "" + tupla[1][1] +
        "</td>" +
        "</tr>" +
        "</table>";}

function PercVinte() {
    var stats = JSON.parse(localStorage.stats);
    var pv = (stats.percVinte*100).toString();
    document.getElementById("percvincite").innerHTML += "<tr><td>Perc. Vittorie</td><td>" + pv.substring(0,4)+ "</td></tr>";
}

function MoneyVinte() {
    var stats = JSON.parse(localStorage.stats);
    document.getElementById("percvincite").innerHTML += "<tr><td>Monete vinte </td><td>" + stats.moneyVinte + "</td></tr>";
}

function MoneyPerse() {
    var stats = JSON.parse(localStorage.stats);
    document.getElementById("percvincite").innerHTML += "<tr><td>Monete perse </td><td>" + stats.moneyLost + "</td></tr>";
}

function Campioni() {
    var array = ordinaTupla2(arrayUsers);
    arrayUsers = array;
    var s = new String("");
    if (arrayUsers.length == 0){
        s += "";
    }
    else if (arrayUsers.length == 1){
        s += "<h3 style='color: #1456a0'>Campioni</h3>" +
            "<table align='center' id = 'tcampioni' cellpadding='0px' cellspacing='0px'>" +
            "<tr>" +
            "<td>" +
            "Posizione" +
            "</td>" +
            "<td>" +
            "Nome" +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            1 +
            "</td>" +
            "<td>" +
            arrayUsers[0][0] +
            "</td>" +
            "</tr>" +
            "</table>";
    }
    else if (arrayUsers.length == 2) {
        s += "<h3 style='color: #1456a0'>Campioni</h3>" +
            "<table align='center' id = 'tcampioni' cellpadding='0px' cellspacing='0px'>" +
            "<tr>" +
            "<td>" +
            "Posizione" +
            "</td>" +
            "<td>" +
            "Nome" +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            1 +
            "</td>" +
            "<td>" +
            arrayUsers[0][0] +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            2 +
            "</td>" +
            "<td>" +
            arrayUsers[1][0] +
            "</td>" +
            "</tr>" +
            "</table>";
    }
    else{
        s += "<h3 style='color: #1456a0'7>Campioni</h3>" +
            "<table align='center' id = 'tcampioni' cellpadding='0px' cellspacing='0px' >" +
            "<tr>" +
            "<td>" +
            "Posizione" +
            "</td>"+
            "<td>" +
            "Nome" +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            1 +
            "</td>"+
            "<td>" +
            arrayUsers[0][0] +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            2 +
            "</td>" +
            "<td>" +
            arrayUsers[1][0] +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            3 +
            "</td>"+
            "<td>" +
            arrayUsers[2][0] +
            "</td>" +
            "</tr>" +
            "</table>";
    }
    document.getElementById("campioni").innerHTML +=  s;
}

function CaricamentoStats() {
    PiuUsciti();
    MenoUsciti();
    PercVinte();
    MoneyVinte();
    MoneyPerse();
    window.setTimeout("Campioni()", 200);
}


$(document).ready(function(){
    CaricamentoStats();
});




function aux(n) {
    if (n%2 == 0)
        return n/2;
    else
        return (n/2 - 1);
}

function aux2(n, j, i) {
    if (j%i == 0)
        return n;
    else
        return n + 1;
}
var quotaFissa = 3;

function creaTabVincite(){
    var s = String("");
    document.getElementById("10").innerHTML = "";
    for (i = 10; i >= 1; i--){
        s = "<h3 class=\"titolo\">" + i + "numeri giocati</h3>\n" +
            "\n" +
            "\t<table style=\"width:100%; background-color:#CCC; border-collapse:collapse; border-color:#999\" align=\"center\" border=\"1\">\n" +
            "\t<thead>\n" +
            "\t<tr>\n" +
            "\t<td rowspan=\"2\">Numeri vincenti</td>\n" +
            "\t<td colspan=\"3\"><strong>Premi</strong></td>\n" +
            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t<td>10eLotto</td>\n" +
            "\t<td>Numero Oro</td>\n" +
            "\t</thead>\n" +
            "\t<tbody>";
        for(j = i; j >= 0 ; j--){
            if(j == 0){
                s += "<tr><td>" + j + "</td><td>" + "-" + "</td><td>" + "-" + "</td>"
            }
            else if (j >= aux(i)){
                var vincita =  aux2(Math.floor(Math.pow(quotaFissa, j - 1)*(parseFloat(j)/parseFloat(i))), j , i);
                var vincitaGold =  aux2(Math.floor(Math.pow(quotaFissa, j - 1)*(parseFloat(j)/parseFloat(i))), j , i)*5;
                s += "<tr><td>" + j + "</td><td>" + vincita + "</td><td>" + vincitaGold + "</td>"
            }
            else{
                var vincitaGold =  aux2(Math.floor(Math.pow(quotaFissa, j - 1)*(parseFloat(j)/parseFloat(i))), j , i)*5 + 10*j;
                s += "<tr><td>" + j + "</td><td>" + "-" + "</td><td>" + vincitaGold + "</td>"
            }
        }
        document.getElementById("10").innerHTML += s;
    }
}
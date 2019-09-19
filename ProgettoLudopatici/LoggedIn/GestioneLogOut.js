function logOut() {
    var oggetto = localStorage.userCorrente;
    applicaModifiche(JSON.parse(oggetto));
    var newW = window.open("..\\NotLoggedIn\\LogIn.html", "_self", false);
    localStorage.userCorrente="";
}
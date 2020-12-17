const url = "https://weavup.osc-fr1.scalingo.io"  

const authentificationUrl = "/authentification"  //chemin pour tester le token de connexion

//Meteo
var API_KEY = '84f4d8a124e56e3296afc40d310b36fc'
var icoMeteo ='http://openweathermap.org/img/w/' // + example.png

//function qui fait la requete des information meteorologique en fonction de la position de la personne
function meteo()
{
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log("latitude=" +position.coords.latitude)
    //     console.log("longitude=" +position.coords.longitude)

    let ville = document.getElementById("ville").value;

        var url = "http://api.openweathermap.org/data/2.5/weather?q="+ ville +"&units=metric&APPID=" + API_KEY
           
        $.get(url, function(data) {
            document.getElementsByClassName("widgetMeteo")[0].innerHTML = generateHtmlMeteo(data)
        })

        setTimeout(function(){
            meteo();
        },(60000))
}

//fonction qui genere le html en fonction des informations que retourne l'api
function generateHtmlMeteo(data){
    let MeteoTemplate = '<h1 class="text-center">'+ data.name +'</h1>'+
    '<div class="container">'+
        '<div class="row">'+
            '<div class="col-md-6 text-center detail-ville">'+
                '<div>'+
                    '<p>➜ Temperature: '+ data.main.temp +'°C</p>'+
                    '<p>➜ Humidité: '+ data.main.humidity +'%</p>'+
                    '<p>➜ Vitesse vent: '+ data.wind.speed +' m/s</p>'+
                    '<p>➜ Pression: '+ data.main.pressure +' Hpa</p>'+
                '</div>'+
            '</div>'+
            '<div class="col-md-6 text-center"><img alt="title" src="' + icoMeteo + data.weather[0].icon +'.png" style="border: medium none; width: 300px; height: 300px; background: url(&quot;http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png&quot;) repeat scroll 0% 0% transparent;" width="300" height="300">'+
            '<p>'+ data.weather[0].main +' </p>'+
            '</div>'+
        '</div>'+
    '</div>'
    
    return MeteoTemplate
}

//function qui verifie si utilisteur et connecter grace au token (executer des que la page html et chargé)
function authentification(){
    const tokenConnexion = {
        "token":getCookie("token"),
    }

    var settings = {
        "url": url + authentificationUrl,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(tokenConnexion),
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response)
        if(response.code == "200")
        {   
            console.log("connexion OK");

            Deconnexion()

        }
        else if(response.code == "400")
        {
            console.log("connexion automatique Impossible")
        }
    });
}

function Deconnexion()
{
    $("#boutonConnexion").html('<a id="boutonDeconnexion" class="btn btn-danger" role="button" style="margin-left: 2%;margin-top: 1%;">Deconnexion</a>')
    
    $("#boutonDeconnexion").click(() =>{
        console.log("Deconnexion")
        deconnexionCompte();
    })
}

function deconnexionCompte()
{
    supprimerCookie();
    $("#boutonConnexion").html('<a class="btn btn-primary" href="login.html" role="button" style="margin-left: 2%;margin-top: 1%;">Connexion</a>')

    $("#boutonDeconnexion").click(() =>{
        console.log("Deconnexion")
        deconnexionCompte();
    })
}

//methode qui supprime le cookie avec son nom
var supprimerCookie = function(){
    rmCookie("nom")
    rmCookie("prenom")
    rmCookie("email")
    rmCookie("username")
    rmCookie("token")
}

//recuperer valeur cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//supprimer cookie de connexion en le ciblant par son nom
function rmCookie(name){
    document.cookie = name + "=" + ";"  + 'expires=Thu, 01 Jan 1970 00:00:00 UTC' + "; path=/";
}

$(document).ready(function(){

    $("#choixVille").click(() =>{
        meteo();
    })

    authentification();
});
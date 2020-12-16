const url = "https://weavup.osc-fr1.scalingo.io"  

const connexionUrl = "/login"       //Chemin pour tester si l'utilisateur peut se connecter

//Verifie si la connexion est OK
var Connexion = function(){

    console.log("je suis la")

    if($("#inputIdentifiant").val() != "" && $("#inputPassword").val() != "")
    {
        const connexion = {
            "userName": $("#inputIdentifiant").val(),
            "password": $("#inputPassword").val() ,
        }

        var settings = {
            "url": url + connexionUrl,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(connexion),
        };
          
        $.ajax(settings).done(function (response) {
            console.log(response)
            if(response.code == "200")
            {   

                setCookie("nom",response.rowse[0].nom,3);
                setCookie("prenom",response.rowse[0].prenom,3);
                setCookie("email",response.rowse[0].mail,3);
                setCookie("token",response.token,3);
                setCookie("username",response.rowse[0].username,3);

                document.location.href="index.html";

            }
            else if(response.code == "400")
            {
                $(".connexionInfo").html('<p class="text-center" ><code>'+response.erreur+'</code></p>');
            }
        });
    }
    else
    {
        $(".connexionInfo").html('<p class="text-center"><code>⟼ Un champ et incorrect ⟻</code></p>');
    }
}

//crée cookie
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//supprimer cookie de connexion en le ciblant par son nom
function rmCookie(name){
    document.cookie = name + "=" + ";"  + 'expires=Thu, 01 Jan 1970 00:00:00 UTC' + "; path=/";
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

$(document).ready(function() {

    $("#buttonConnexion").click(() =>{
        Connexion()
    })
})
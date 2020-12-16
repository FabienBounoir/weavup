const url = "https://weavup.osc-fr1.scalingo.io"     //server Adresse + port

const registerUrl = "/register"         //Chemin pour s'enregistrer

//function qui verifie que le formulaire et valide
function VerifRegister(){

    //test si les champ Entrer sont valides
    if(checkEmail($("#inputEmail").val()) && $("#inputFirstName").val().trim() != "" && $("#inputLastName").val().trim() != "" && $("#inputUsername").val().trim() != "" && $("#inputPassword").val().trim() != "" && $("#inputPassword").val() == $("#inputConfirmPassword").val())
    {
        const user = {
            "prenom": $("#inputFirstName").val().trim(),
            "nom": $("#inputLastName").val().trim(),
            "email": $("#inputEmail").val(),
            "tel": $("#inputPhone").val(),
            "userName": $("#inputUsername").val(),
            "password": $("#inputPassword").val(),
        }

        var settings = {
            "url": url + registerUrl,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(user),
        };
          
        $.ajax(settings).done(function (response) {
            console.log(response)
            if(response.code == "200")
            {   
                document.location.href="login.html";
            }
        });
    }
    else
    {
        $("#messageRegister").html('<p class="text-center"><code>⟼ Un champ et incorrect ⟻</code></p>');
    }
}

//Test si l'email rentré est valide
function checkEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}


$(document).ready(function() {

    $("#buttonRegister").click(() =>{
        VerifRegister()
    })
})
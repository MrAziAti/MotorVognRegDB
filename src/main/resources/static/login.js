function validerOgLogInn(){
    const okBrukernavn = validerBrukernavn($("#brukernavn").val());
    const okPassord = validerBrukernavn($("#passord").val());

    if(okBrukernavn && okPassord){
        login();
    }
}
function logout(){
    const url = "/logout";
    $.get(url, function (){
        window.location.href = "index.html";
    })
}

function login(){
    const bruker = {
        brukernavn : $("#brukernavn").val(),
        passord : $("#passord").val()

    };

    const url = "/login";
    $.get(url, bruker, function (inlogget){
        if(inlogget){
            window.location.href = "loggetInn.html";
        }
        else{
            S("#feil").html("Feil brukernavn eller passord");
        }
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        })
}
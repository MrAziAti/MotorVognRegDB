

function login(){
    const bruker = {
        brukernavn : $("#brukernavn").val(),
        passord : $("#passord").val()

    };

    const url = "/login";
    $.get(url, function (inlogget){
        if(inlogget){
            //send til alle der man kan registrere.
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
function validerOgRegistrer() {
    const okBrukerNavn = validerBrukernavn($("#brukernavn").val());
    const okPassord = validerPassord($("#passord").val());

    if (okBrukerNavn && okPassord) {

        regBruker();
        console.log("I valider og registrer");
    }
}

function regBruker() {
    const bruker = {
        brukernavn: $("#brukernavn").val(),
        passord: $("#passord").val()
    };

    $.post("/lagreBruker", bruker, function () {
        window.location.href = "registrerBruker.html";
        console.log("I post metoden");
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}
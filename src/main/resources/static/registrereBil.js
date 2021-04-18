$(function () {
    hentAlleBiler();
});

let cars = [];

function hentAlleBiler() {
    $.get("/hentBiler", function (biler) {
        cars = biler;
        formaterBiler(biler);
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        })
}

function formaterBiler(biler) {
    let merkeliste = [];
    let ut = "<select id='valgtMerke' onchange='finnTyper()'>";
    ut += "<option>Velg merke</option>";
    for (const bil of biler) {
        if (!merkeliste.includes(bil.merke)) {
            ut += "<option>" + bil.merke + "</option>";
        }
        merkeliste.push(bil.merke);
    }
    ut += "</select>";
    $("#merke").html(ut);
}

function finnTyper() {
    const valgtMerke = $("#valgtMerke").val();
    let ut = "<select id='valgtType'>";
    ut += "<option>--Velg Type--</option>"
    for (const bil of cars) {
        if (bil.merke === valgtMerke) {
            ut += "<option>" + bil.type + "</option>";
        }
    }
    console.log("I finn typer")
    ut += "</select>";
    $("#type").html(ut);
}
function validerOgLagre(){
    const okPers = validerPersonnr($("#personnr").val());
    const okNavn = validerNavn($("#navn").val());
    const okAdresse = validerAdresse($("#adresse").val());
    const okKjennetegn = validerKjennetegn($("#kjennetegn").val());

    if(okPers && okNavn && okAdresse && okKjennetegn){
        regMotorvogn();
    }
}

function regMotorvogn() {
    const motorvogn = {
        personnr: $("#personnr").val(),
        navn: $("#navn").val(),
        adresse: $("#adresse").val(),
        kjennetegn: $("#kjennetegn").val(),
        merke: $("#valgtMerke").val(),
        type: $("#valgtType").val(),
    };
    $.post("/lagre", motorvogn, function () {
        //hentAlle();
        window.location.href = "index.html";
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        })

}

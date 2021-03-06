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
    let ut = "<select id='valgtMerke' onchange='finnTyper()' >";
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
    let ut = "<select id='valgtType' >";
    ut += "<option>Velg Type</option>"
    for (const bil of cars) {
        if (bil.merke === valgtMerke) {
            ut += "<option>" + bil.type + "</option>";
        }
    }
    console.log("I finn typer")
    ut += "</select>";
    $("#type").html(ut);
}

$(function () {
    const id = window.location.search.substring(1);
    const url = "/hentEn?" + id;
    hentAlleBiler();


    $.get(url, function (biler) {
        $("#id").val(biler.id);
        $("#personnr").val(biler.personnr);
        $("#navn").val(biler.navn);
        $("#adresse").val(biler.adresse);
        $("#kjennetegn").val(biler.kjennetegn);
        $("#merke").val(biler.merke);
        $("#type").val(biler.type);
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
});
function validerOgLagre(){
    const okPers = validerPersonnr($("#personnr").val());
    const okNavn = validerNavn($("#navn").val());
    const okAdresse = validerAdresse($("#adresse").val());
    const okKjennetegn = validerKjennetegn($("#kjennetegn").val());

    if(okPers && okNavn && okAdresse && okKjennetegn){
        endre();
    }
}


function endre() {
    const biler = {
        id: $("#id").val(),
        personnr: $("#personnr").val(),
        navn: $("#navn").val(),
        adresse: $("#adresse").val(),
        kjennetegn: $("#kjennetegn").val(),
        merke: $("#valgtMerke").val(),
        type: $("#valgtType").val(),
    };

    $.post("/endreEn", biler, function () {
        window.location.href = "loggetInn.html";
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });

}
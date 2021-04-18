$(function () {
    hentAlle();
});


function hentAlle() {
    $.get("/hentAlle", function (biler) {
        formaterData(biler);
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function formaterData(biler) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Personnr</th><th>Navn</th><th>Adresse</th>" +
        "<th>Kjennetegn</th><th>Merke</th><th>Type</th><th>Endre</th><th>Slette</th>" +
        "</tr>";
    for (let bil of biler) {
        let link = "endre.html?id=" + bil.id;
        console.log(link);
        ut += "<tr>" +
            "<td>" + bil.personnr + "</td>" +
            "<td>" + bil.navn + "</td>" +
            "<td>" + bil.adresse + "</td>" +
            "<td>" + bil.kjennetegn + "</td>" +
            "<td>" + bil.merke + "</td>" +
            "<td>" + bil.type + "</td>" +
            `<td> <a class='btn btn-primary' href="${link}">Endre</a></td>` +
            "<td> <button class='btn btn-danger' onclick='slettEnKunde(" + bil.id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#bilene").html(ut);
}

function slettEnKunde(id) {
    const url = "/slettEn?id=" + id;
    $.get(url, function () {
        //window.location.href = "registrerbil.html";
        hentAlle();
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function slettAlle() {
    $.get("/slettAlle", function () {
        //window.location.href = "registrerbil.html";
        hentAlle();
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

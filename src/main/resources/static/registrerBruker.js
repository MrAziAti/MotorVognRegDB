function regBruker() {
    const bruker = {
        brukernavn: $("#brukernavn").val(),
        passord: $("#passord").val()
    };

    $.post("/lagreBruker", bruker, function () {
       // window.location.href = "index.html";
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}
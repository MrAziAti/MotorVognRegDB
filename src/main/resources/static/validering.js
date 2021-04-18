function validerPersonnr(personnr) {
    const regexp = /^[0-9]{11}$/;
    const ok = regexp.test(personnr);

    if (!ok) {
        $("#feilPersonnr").html("Personnr må bestå av kun 11 siffer");
        return false;
    } else {
        $("#feilPersonnr").html("");
        return true;
    }
}

function validerNavn(navn) {
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regexp.test(navn);

    if (!ok) {
        $("#feilNavn").html("Navn må bestå av 2 til 20 bokstaver");
        return false;
    } else {
        $("#feilNavn").html("");
        return true;
    }
}

function validerAdresse(adresse) {
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regexp.test(adresse);

    if (!ok) {
        $("#feilAdresse").html("Adresse må bestå av 2 til 20 bokstaver");
        return false;
    } else {
        $("#feilAdresse").html("");
        return true;
    }
}

function validerKjennetegn(kjennetegn) {
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regexp.test(kjennetegn);

    if (!ok) {
        $("#feilKjennetegn").html("Kjennetegn må bestå av 2 bokstaver og 5 tall");
        return false;
    } else {
        $("#feilKjennetegn").html("");
        return true;
    }
}

function validerBrukernavn(brukernavn) {
    const regexp = /^[a-zA-ZæøåÆØÅ0-9]{2,20}$/;
    const ok = regexp.test(brukernavn);

    if (!ok) {
        $("#feilBrukernavn").html("Brukernavn må bestå av ..... Finn på noe")
        return false;
    } else {
        $("#feilBrukernavn").html("");
        return true;
    }
}

function validerPassord(passord) {
    const regexp = /(?=.*[a-zA-ZæøåÆØÅ])(?=.*\d)[a-zA-ZæøåÆØÅ\d]{8,}/;
    const ok = regexp.test(passord);

    if(!ok){
        $("#feilPassord").html("Passord må bestå av minumum 8 tegn, et av de en bokstav og et tall");
        return false;
    }else{
        $("#feilPassord").html("");
        return true;
    }
}
package motorvognregdb.demo;

import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MotorvognController {

    @Autowired
    MotorvognRepository rep;
    private Logger logger = LoggerFactory.getLogger(MotorvognController.class);

    private boolean validerVogn(Motorvogn vogn) {
        String regexPers = "[0-9]{11}";
        String regexNavn = "[a-zA-ZæøåÆØÅ. \\-]{2,20}";
        String regexAdresse = "[a-zA-ZæøåÆØÅ. \\-]{2,20}";
        String regexKjennetegn = "[a-zA-ZæøåÆØÅ. \\-]{2,20}";

        boolean okPers = vogn.getPersonnr().matches(regexPers);
        boolean okNavn = vogn.getNavn().matches(regexNavn);
        boolean okAdresse = vogn.getAdresse().matches(regexAdresse);
        boolean okKjennetegn = vogn.getKjennetegn().matches(regexKjennetegn);

        if (okPers && okNavn && okAdresse && okKjennetegn) {
            return true;
        }
        logger.error("valideringsfeil");
        return false;

    }

    private boolean validerBruker(Bruker bruker) {
        String regexBrukerNavn = "[a-zA-ZæøåÆØÅ0-9]{2,20}";
        String regexPassord = "(?=.*[a-zA-ZæøåÆØÅ])(?=.*\\d)[a-zA-ZæøåÆØÅ\\d]{8,}";
        boolean okBrukerNavn = bruker.getBrukernavn().matches(regexBrukerNavn);
        boolean okPassord = bruker.getPassord().matches(regexPassord);

        if (okBrukerNavn && okPassord) {
            System.out.println("I validerBrtuker");
            return true;
        }
        logger.error("Valideringsfeil");
        return false;
    }

    @PostMapping("/lagre")
    public void lagreKunde(Motorvogn bil, HttpServletResponse response) throws IOException {

        if (!validerVogn(bil)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i validering - prøv igjen senere");
        } else {
            if (!rep.lagreMotorvogn(bil)) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB, Prøv igjen senere");
            }
        }


    }

    @PostMapping("/lagreBruker")
    public void lagreBruker(Bruker bruker, HttpServletResponse response) throws IOException {

        if (!validerBruker(bruker)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i validering - prøv igjen senere");
        } else {

            if (!rep.lagreBruker(bruker)) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB, Prøv igjen senere");
            }
        }

    }

    @GetMapping("/hentBiler")
    public List<Biler> hentBiler(HttpServletResponse response) throws IOException {
        List<Biler> alleBiler = rep.hentBiler();

        if (alleBiler == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB, Prøv igjen senere");
        }
        return alleBiler;
    }

    @GetMapping("/hentAlle")
    public List<Motorvogn> hentAlle(HttpServletResponse response) throws IOException {
        List<Motorvogn> alleVogner = rep.hentAlle();

        if (alleVogner == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB, Prøv igjen senere");
        }
        return rep.hentAlle();
    }

    @GetMapping("/slettAlle")
    public void slettAlle(HttpServletResponse response) throws IOException {
        if (!rep.slettAlle()) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB, Prøv igjen senere");
        }
    }

    @GetMapping("/slettEn")
    public void slettEnKunde(int id, HttpServletResponse response) throws IOException {
        if (!rep.slettEnbil(id)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB, Prøv igjen senere");
        }

    }

    @GetMapping("/hentEn")
    public Motorvogn hentEn(int id, HttpServletResponse response) throws IOException {
        Motorvogn vogn = rep.hentEn(id);
        if (vogn == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB, Prøv igjen senere");
        }
        return vogn;
    }

    @PostMapping("/endreEn")
    public void endreEn(Motorvogn vogn, HttpServletResponse response) throws IOException {

        if (!rep.endreBil(vogn)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB, Prøv igjen senere");
        }
    }
    @Autowired private HttpSession session;

    @GetMapping("/login")
    public boolean login(Bruker bruker){
        if(rep.sjekkBrukerOgPassord(bruker)){
            session.setAttribute("Innlogget", bruker);
            return true;
        }
        return false;
    }

    @GetMapping("/logout")
    public void logout(){
        session.removeAttribute("Innlogget");
    }
}

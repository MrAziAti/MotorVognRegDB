package motorvognregdb.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class MotorvognRepository {

    private Logger logger = LoggerFactory.getLogger(MotorvognRepository.class);

    @Autowired
    private JdbcTemplate db;

    public boolean lagreMotorvogn(Motorvogn motorvogn){
        String sql = "INSERT INTO Motorvogn (personnr, navn, adresse, kjennetegn, merke, type) VALUES(?,?,?,?,?,?)";
        try{
            db.update(sql,motorvogn.getPersonnr(),motorvogn.getNavn(),motorvogn.getAdresse(),motorvogn.getKjennetegn(), motorvogn.getMerke(), motorvogn.getType());
            return true;
        }catch (Exception e){
            logger.error("Feil i lagre motorvogn" + e);
            return false;
        }


    }
    public boolean lagreBruker(Bruker bruker){
        String sql = "INSERT INTO Bruker (brukernavn, passord) VALUES (?,?)";

        try{
            db.update(sql, bruker.getBrukernavn(),bruker.getPassord());
            return true;
        }catch (Exception e){
            logger.error("feil i lagre bruker" +e);
            return false;
        }
    }
    public List<Biler> hentBiler(){
        String sql = "SELECT * FROM Biler;";
        try{
            List<Biler> biler = db.query(sql, new BeanPropertyRowMapper(Biler.class));
            return biler;
        }catch (Exception e){
            logger.error("feil i hent alle biler " + e);
            return null;
        }

    }


    public List<Motorvogn> hentAlle(){
        String sql = "SELECT * FROM Motorvogn;";

        try {
            List<Motorvogn> motorvogns = db.query(sql, new BeanPropertyRowMapper(Motorvogn.class));
            return motorvogns; //db.query(sql, new BeanPropertyRowMapper<>(Motorvogn.class));
        }catch(Exception e){
            logger.error("Feil i hent alle motorvogn" + e);
            return null;
        }
    }
    public boolean slettAlle(){
        String sql = "DELETE FROM Motorvogn";
        try{
            db.update(sql);
            return true;
        }catch(Exception e){
            logger.error("Feil i slett alle");
            return false;
        }

    }
    public boolean slettEnbil(int id) {
        String sql = "DELETE FROM Motorvogn WHERE id=?;";
        try{
            db.update(sql,id);
            return true;
        }catch (Exception e){
            logger.error("Feil i slett en bil" + e);
            return false;
        }
    }
    public Motorvogn hentEn(int id){
        //Object[] param = new Object[1];
        //param[0] = id;

        String sql = "SELECT * FROM Motorvogn WHERE id=?";
        try {
            //Motorvogn enVogn = db.queryForObject(sql,param, BeanPropertyRowMapper.newInstance(Motorvogn.class));
            List<Motorvogn> enVogn = db.query(sql, new BeanPropertyRowMapper<>(Motorvogn.class), id);
            return enVogn.get(0);
        }catch (Exception e){
            logger.error("Feil i hent en" +e);
            return null;
        }

    }

    public boolean endreBil(Motorvogn vogn){
        String sql = "UPDATE Motorvogn SET personnr=?, navn=?, adresse=?, kjennetegn=?, merke=?, type=? where id=?";
        try {
            db.update(sql, vogn.getPersonnr(), vogn.getNavn(), vogn.getAdresse(), vogn.getKjennetegn(), vogn.getMerke(), vogn.getType(), vogn.getId());
            return true;
        }catch (Exception e){
            logger.error("Feil i endre bil");
            return false;
        }
    }

    public boolean sjekkBrukerOgPassord(Bruker bruker){
        Object[] param = new Object[]{bruker.getBrukernavn(), bruker.getPassord()};
        String sql = "SELECT COUNT(*) FROM Bruker WHERE brukernavn=? AND passord=?";
        try{
            int antall = db.queryForObject(sql,param,Integer.class);
            if(antall >0){
                return true;
            }
            return false;

        }catch(Exception e){
            logger.error("Feill i sjekk brukernavn og passord" + e);
            return false;
        }
    }
}

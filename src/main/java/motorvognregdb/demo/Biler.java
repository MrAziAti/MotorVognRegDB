package motorvognregdb.demo;

public class Biler {
    private String merke;
    private String type;

    public Biler(String merke, String type) {
        this.merke = merke;
        this.type = type;
    }
    public Biler(){

    }

    public String getMerke() {
        return merke;
    }

    public void setMerke(String merke) {
        this.merke = merke;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

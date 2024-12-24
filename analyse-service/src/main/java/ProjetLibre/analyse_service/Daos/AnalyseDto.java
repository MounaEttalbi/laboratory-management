package ProjetLibre.analyse_service.Daos;

public class AnalyseDto {

    private Long id;
    private String laboratoire;// ID du laboratoire, pas une relation directe

    // ID du laboratoire, pas une relation directe


    private String nom;
    private String description;
    private String type;

    // Getters and Setters



    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLaboratoire() {
        return laboratoire;
    }

    public void setLaboratoire(String laboratoire) {
        this.laboratoire = laboratoire;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

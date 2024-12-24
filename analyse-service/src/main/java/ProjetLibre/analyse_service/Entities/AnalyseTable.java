package ProjetLibre.analyse_service.Entities;


import ProjetLibre.analyse_service.Classes.Laboratoire;
import jakarta.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class AnalyseTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long IdLaboratoire;
    @Transient
    private Laboratoire labo;
    private String nom;
    private String description;
    private String type;
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


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

    public Long getIdLaboratoire() {
        return IdLaboratoire;
    }

    public void setIdLaboratoire(Long idLaboratoire) {
        IdLaboratoire = idLaboratoire;
    }

    public Laboratoire getLabo() {
        return labo;
    }

    public void setLabo(Laboratoire labo) {
        this.labo = labo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

package com.backend.adresse_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "adresse")
public class Adresse {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String numVoie;
    private String  nomVoie;
    private String codePostal;
    private String ville;
    private String commune;

    //setters and getters

    public Adresse() { super();}

    public Adresse(Long id , String numVoie, String nomVoie,String codePostal,String ville,String commune) {
        this.id = id;
        this.numVoie = numVoie;
        this.nomVoie = nomVoie;
        this.codePostal = codePostal;
        this.ville = ville;
        this.commune = commune;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumVoie() {
        return numVoie;
    }

    public void setNumVoie(String numVoie) {
        this.numVoie = numVoie;
    }

    public String getNomVoie() {
        return nomVoie;
    }

    public void setNomVoie(String nomVoie) {
        this.nomVoie = nomVoie;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    @Override
    public String toString() {
        return "Adresse{" +
                "id=" + id +
                ", numVoie='" + numVoie + '\'' +
                ", nomVoie='" + nomVoie + '\'' +
                ", codePostal='" + codePostal + '\'' +
                ", ville='" + ville + '\'' +
                ", commune='" + commune + '\'' +
                '}';
    }
}

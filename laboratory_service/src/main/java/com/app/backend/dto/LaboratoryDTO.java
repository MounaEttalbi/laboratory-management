package com.app.backend.dto;

import com.app.backend.entities.Statut;

import java.util.Date;

public class LaboratoryDTO {

    private long id;
    private String nom;
    private byte[] logo;
    private Long nrc;
    private Statut statut;
    private Date dateActivation;

    // Constructeur sans paramètres
    public LaboratoryDTO() {}

    // Constructeur avec paramètres pour simplifier la conversion
    public LaboratoryDTO(long id, String nom, byte[] logo, Long nrc, Statut statut, Date dateActivation) {
        this.id = id;
        this.nom = nom;
        this.logo = logo;
        this.nrc = nrc;
        this.statut = statut;
        this.dateActivation = dateActivation;
    }

    // Getters et Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public Long getNrc() {
        return nrc;
    }

    public void setNrc(Long nrc) {
        this.nrc = nrc;
    }

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public Date getDateActivation() {
        return dateActivation;
    }

    public void setDateActivation(Date dateActivation) {
        this.dateActivation = dateActivation;
    }
}

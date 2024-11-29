package com.backend.contact_service.model;

import java.util.Date;

public class Laboratory {

    private Long id;
    private String nom;
    private Long  nrc;
    private Date dateActivation;


    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getNrc() {
        return nrc;
    }

    public void setNrc(Long nrc) {
        this.nrc = nrc;
    }

    public Date getDateActivation() {
        return dateActivation;
    }

    public void setDateActivation(Date dateActivation) {
        this.dateActivation = dateActivation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

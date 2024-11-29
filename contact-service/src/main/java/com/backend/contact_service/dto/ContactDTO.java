package com.backend.contact_service.dto;

import com.backend.contact_service.model.Adresse;
import com.backend.contact_service.model.Laboratory;
import jakarta.persistence.Transient;

public class ContactDTO {
    private Long id;
    private Long fkIdLaboratoire;
    private Laboratory laboratory;
    private Long fkIdAdresse;
    private Adresse adresse;
    private String numTel;
    private String  fax;
    private String  email;

    public ContactDTO(){super();}

    public ContactDTO(Long id, Long fkIdLaboratoire,Long fkIdAdresse,String numTel,String fax,String email) {
        this.id = id;
        this.fkIdLaboratoire = fkIdLaboratoire;
        this.fkIdAdresse = fkIdAdresse;
        this.numTel =numTel;
        this.fax = fax;
        this.email=email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFkIdLaboratoire() {
        return fkIdLaboratoire;
    }

    public void setFkIdLaboratoire(Long fkIdLaboratoire) {
        this.fkIdLaboratoire = fkIdLaboratoire;
    }

    public Laboratory getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(Laboratory laboratory) {
        this.laboratory = laboratory;
    }

    public Long getFkIdAdresse() {
        return fkIdAdresse;
    }

    public void setFkIdAdresse(Long fkIdAdresse) {
        this.fkIdAdresse = fkIdAdresse;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public String getNumTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

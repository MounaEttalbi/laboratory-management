package com.backend.contact_service.dto;

import com.backend.contact_service.model.Adresse;
import com.backend.contact_service.model.Laboratory;
import jakarta.persistence.Transient;

public class ContactDTO {
    private Long id;
    private Long fkIdLaboratoire;
    private Laboratory laboratory;
    private Long fkIdAdresse;

    private String numTel;
    private String  fax;
    private String  email;
    private String laboratoryName;  // Nom du laboratoire
    private String adresse;         // Adresse formatée

    public String getLaboratoryName() {
        return laboratoryName;
    }

    public void setLaboratoryName(String laboratoryName) {
        this.laboratoryName = laboratoryName;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public ContactDTO(){super();}

    public ContactDTO(Long id, Long fkIdLaboratoire,Long fkIdAdresse,String numTel,String fax,String email,String laboratoryName) {
        this.id = id;
        this.fkIdLaboratoire = fkIdLaboratoire;
        this.fkIdAdresse = fkIdAdresse;
        this.numTel =numTel;
        this.fax = fax;
        this.email=email;
        this.laboratoryName=laboratoryName;
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

    public Long getFkIdAdresse() {
        return fkIdAdresse;
    }

    public void setFkIdAdresse(Long fkIdAdresse) {
        this.fkIdAdresse = fkIdAdresse;
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

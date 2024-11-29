package com.backend.contact_service.entity;

import com.backend.contact_service.model.Adresse;
import com.backend.contact_service.model.Laboratory;
import jakarta.persistence.*;

@Entity
@Table(name = "contact")
public class Contact {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long fkIdLaboratoire;
    @Transient
    private Laboratory laboratory;

    private Long fkIdAdresse;
    @Transient
    private Adresse adresse;

    private String numTel;
    private String  fax;
    private String  email;

    public Contact(){super();}

    public Contact(Long id, Long fkIdLaboratoire,Long fkIdAdresse,String numTel,String fax,String email) {
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

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", fkIdLaboratoire=" + fkIdLaboratoire +
                ", laboratory=" + laboratory +
                ", fkIdAdresse=" + fkIdAdresse +
                ", adresse=" + adresse +
                ", numTel='" + numTel + '\'' +
                ", fax='" + fax + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

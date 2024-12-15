package com.app.backend.dto;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;

import com.app.backend.entities.Statut;


public class LaboratoryDTO {
	
     private long id;
    
    private String nom;
    
    private String logo;
    
    private Long  nrc;
    private Statut statut;
    private Date dateActivation;
    
    public LaboratoryDTO() {
		super();
	}
	public LaboratoryDTO(long id, String nom, String logo, Long nrc, Statut statut, Date dateActivation) {
		super();
		this.id = id;
		this.nom = nom;
		this.logo = logo;
		this.nrc = nrc;
		this.statut = statut;
		this.dateActivation = dateActivation;
	}
	
	public LaboratoryDTO(String nom2, Long nrc2, Statut statut2, Date activationDate, String logoUrl) {
		super();
		this.nom = nom2;
		this.logo = logoUrl;
		this.nrc = nrc2;
		this.statut = statut2;
		this.dateActivation = activationDate;
	}
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
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
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
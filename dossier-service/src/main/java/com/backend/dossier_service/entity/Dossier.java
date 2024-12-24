package com.backend.dossier_service.entity;

import java.util.Date;

import com.backend.dossier_service.model.Patient;
import com.backend.dossier_service.model.Utilisateur;

import jakarta.persistence.*;


@Entity
public class Dossier {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int numDossier;

	    private Date date;
	    
	    @Transient
	    private Utilisateur utilisateur;
	    private String fkEmailUtilisateur;
	    
	    @Transient
	    private Patient patient;
	    private String fkIdPatient;
	    
	    private String status;
    
	public Dossier() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Dossier(int numDossier, Date date, Utilisateur utilisateur, String fkEmailUtilisateur, Patient patient,
			String fkIdPatient) {
		super();
		this.numDossier = numDossier;
		this.date = date;
		this.utilisateur = utilisateur;
		this.fkEmailUtilisateur = fkEmailUtilisateur;
		this.patient = patient;
		this.fkIdPatient = fkIdPatient;
	}

	public int getNumDossier() {
		return numDossier;
	}
	public void setNumDossier(int numDossier) {
		this.numDossier = numDossier;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Utilisateur getUtilisateur() {
		return utilisateur;
	}
	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}
	public String getFkEmailUtilisateur() {
		return fkEmailUtilisateur;
	}
	public void setFkEmailUtilisateur(String fkEmailUtilisateur) {
		this.fkEmailUtilisateur = fkEmailUtilisateur;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public String getFkIdPatient() {
		return fkIdPatient;
	}
	public void setFkIdPatient(String fkIdPatient) {
		this.fkIdPatient = fkIdPatient;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
package com.backend.dossier_service.dto;

import java.util.Date;

public class DossierDTO {
    private int numDossier;
    private Date date;
    private String fkEmailUtilisateur;  // Email de l'utilisateur
    private String fkIdPatient;         // ID du patient
    private String utilisateurNom;      // Nom de l'utilisateur (optionnel)
    private String patientNom;
    
	public DossierDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public DossierDTO(int numDossier, Date date, String fkEmailUtilisateur, String fkIdPatient, String utilisateurNom,
			String patientNom) {
		super();
		this.numDossier = numDossier;
		this.date = date;
		this.fkEmailUtilisateur = fkEmailUtilisateur;
		this.fkIdPatient = fkIdPatient;
		this.utilisateurNom = utilisateurNom;
		this.patientNom = patientNom;
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
	public String getFkEmailUtilisateur() {
		return fkEmailUtilisateur;
	}
	public void setFkEmailUtilisateur(String fkEmailUtilisateur) {
		this.fkEmailUtilisateur = fkEmailUtilisateur;
	}
	public String getFkIdPatient() {
		return fkIdPatient;
	}
	public void setFkIdPatient(String fkIdPatient) {
		this.fkIdPatient = fkIdPatient;
	}
	public String getUtilisateurNom() {
		return utilisateurNom;
	}
	public void setUtilisateurNom(String utilisateurNom) {
		this.utilisateurNom = utilisateurNom;
	}
	public String getPatientNom() {
		return patientNom;
	}
	public void setPatientNom(String patientNom) {
		this.patientNom = patientNom;
	}  
    
    
}

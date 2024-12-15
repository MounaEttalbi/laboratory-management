package com.backend.dossier_service.entity;

import java.util.Date;

import com.backend.dossier_service.model.Patient;
import com.backend.dossier_service.model.Utilisateur;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Dossier {
	@Id
	private int numDossier;
	private Date date;
	
	@Transient
    private Utilisateur utilisateur;
    private String fkEmailUtilisateur;
    @Transient
    private Patient patient;
    private String fkIdPatient;
    
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
	
	
}
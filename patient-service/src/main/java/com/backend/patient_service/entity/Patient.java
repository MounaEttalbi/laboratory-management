package com.backend.patient_service.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idPatient;
	private String nomcomplet;
	private Date dateNaissance;
	private String lieuDeNaissance;
	private String sexe;
	private String typePieceIdentite;
	private String numPieceIdentite;
	private String adresse;
	private String numTel;
	private String email;
	private String visible_pour;
	
	public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Patient(int idPatient, String nomcomplet, Date dateNaissance, String lieuDeNaissance, String sexe,
			String typePieceIdentite, String numPieceIdentite, String adresse, String numTel, String email,
			String visible_pour) {
		super();
		this.idPatient = idPatient;
		this.nomcomplet = nomcomplet;
		this.dateNaissance = dateNaissance;
		this.lieuDeNaissance = lieuDeNaissance;
		this.sexe = sexe;
		this.typePieceIdentite = typePieceIdentite;
		this.numPieceIdentite = numPieceIdentite;
		this.adresse = adresse;
		this.numTel = numTel;
		this.email = email;
		this.visible_pour = visible_pour;
	}

	public int getIdPatient() {
		return idPatient;
	}
	public void setIdPatient(int idPatient) {
		this.idPatient = idPatient;
	}
	public String getNomcomplet() {
		return nomcomplet;
	}
	public void setNomcomplet(String nomcomplet) {
		this.nomcomplet = nomcomplet;
	}
	public Date getDateNaissance() {
		return dateNaissance;
	}
	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}
	public String getLieuDeNaissance() {
		return lieuDeNaissance;
	}
	public void setLieuDeNaissance(String lieuDeNaissance) {
		this.lieuDeNaissance = lieuDeNaissance;
	}
	public String getSexe() {
		return sexe;
	}
	public void setSexe(String sexe) {
		this.sexe = sexe;
	}
	public String getTypePieceIdentite() {
		return typePieceIdentite;
	}
	public void setTypePieceIdentite(String typePieceIdentite) {
		this.typePieceIdentite = typePieceIdentite;
	}
	public String getNumPieceIdentite() {
		return numPieceIdentite;
	}
	public void setNumPieceIdentite(String numPieceIdentite) {
		this.numPieceIdentite = numPieceIdentite;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public String getNumTel() {
		return numTel;
	}
	public void setNumTel(String numTel) {
		this.numTel = numTel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getVisible_pour() {
		return visible_pour;
	}
	public void setVisible_pour(String visible_pour) {
		this.visible_pour = visible_pour;
	}
	
	
}
package com.app.backend.entities;

import com.app.backend.model.Laboratory;

import jakarta.persistence.*;


@Entity
public class User {
	@Id
	private String cin;
	private String email;
	private String nomComplet;
	private String numTel;
	private String profession;
	
	@Lob
	@Column(length = 100000)
	private byte[] signature;

	@Transient
	private Laboratory laboratoire;
	private Long fkIdLaboratoire;

	@OneToOne
	private Login login;

	public Login getLogin() {
		return login;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public void setLogin(Login login) {
		this.login = login;
	}

	public User() {
		super();
	}

	public User(String email, String nomComplet, String numTel, String profession, byte[] signature,
			Laboratory laboratoire, Long fkIdLaboratoire) {
		super();
		this.email = email;
		this.nomComplet = nomComplet;
		this.numTel = numTel;
		this.profession = profession;
		this.signature = signature;
		this.laboratoire = laboratoire;
		this.fkIdLaboratoire = fkIdLaboratoire;
	}

	//Getters and Setters
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNomComplet() {
		return nomComplet;
	}

	public void setNomComplet(String nomComplet) {
		this.nomComplet = nomComplet;
	}

	public String getNumTel() {
		return numTel;
	}

	public void setNumTel(String numTel) {
		this.numTel = numTel;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public byte[] getSignature() {
		return signature;
	}

	public void setSignature(byte[] signature) {
		this.signature = signature;
	}

	public Laboratory getLaboratoire() {
		return laboratoire;
	}

	public void setLaboratoire(Laboratory laboratoire) {
		this.laboratoire = laboratoire;
	}

	public Long getFkIdLaboratoire() {
		return fkIdLaboratoire;
	}

	public void setFkIdLaboratoire(Long fkIdLaboratoire) {
		this.fkIdLaboratoire = fkIdLaboratoire;
	}
	
	
	
}

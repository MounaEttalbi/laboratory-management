package com.app.backend.controller;

import java.util.List;

import com.app.backend.dtos.InscriptionUtilisateur;
import com.app.backend.dtos.UtilisateurDto;
import com.app.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.backend.repository.UserRepository;
import com.app.backend.client.LaboratoryRestClient;
import com.app.backend.entities.User;
import com.app.backend.model.Laboratory;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {
	@Autowired
	LaboratoryRestClient laboratoireRestClient;
	@Autowired
	UserService utilisateurService;

	@GetMapping("labo")
	public List<Laboratory> accountList(){
		System.out.println("labusr");
		return laboratoireRestClient.allLaboratory();
	}
	@GetMapping("utilisateurs")
	public List<UtilisateurDto> getAllUtilisateurs(){
		System.out.println("labusr");
		return utilisateurService.getAllUtilisateurs();
	}
	@PostMapping("/ajouUtilisateur")
	public void ajouUtilisateur(@RequestBody InscriptionUtilisateur inscription) {
		utilisateurService.ajouterUtilisateur(inscription);
	}
}
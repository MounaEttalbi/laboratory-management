package com.app.backend.controller;

import java.util.List;
import java.util.Optional;

import com.app.backend.dto.LaboratoryDTO;
import com.app.backend.service.LaboratoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.entities.Laboratory;
import com.app.backend.repository.LaboratoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/laboratory")
@CrossOrigin(origins = "http://localhost:4200")
public class LaboratoryController {

	private LaboratoryService laboratoryService;

	public LaboratoryController(LaboratoryService laboratoryService) {
		this.laboratoryService = laboratoryService;
	}

	// Récupérer tous les laboratoires
	@GetMapping("/all")
	public ResponseEntity<List<Laboratory>> getAllLaboratories() {
		List<Laboratory> laboratories = laboratoryService.getAllLaboratories();
		return ResponseEntity.ok(laboratories);
	}

	// Récupérer un laboratoire par ID
	@GetMapping("/{id}")
	public ResponseEntity<Laboratory> getLaboratoireById(@PathVariable Long id) {
		Optional<Laboratory> laboratoire = laboratoryService.getLaboratoryById(id);
		return laboratoire.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/ajouterLaboratoire")
	public ResponseEntity<Laboratory> addLaboratory(@RequestBody LaboratoryDTO laboratoryDTO) {
	    Laboratory laboratory = new Laboratory();
	    laboratory.setNom(laboratoryDTO.getNom());
	    laboratory.setNrc(laboratoryDTO.getNrc());
	    laboratory.setStatut(laboratoryDTO.getStatut());
	    laboratory.setDateActivation(laboratoryDTO.getDateActivation());
	    laboratory.setLogo(laboratoryDTO.getLogo()); // Associe l'URL du logo

	    laboratory = laboratoryService.addLaboratory(laboratory);
	    return ResponseEntity.status(HttpStatus.CREATED).body(laboratory);
	}

	// Mettre à jour un laboratoire existant
	@PutMapping("/modifierLabo/{id}")
	public ResponseEntity<Laboratory> updateLaboratory(@PathVariable Long id, @RequestBody LaboratoryDTO updatedLaboratoryDTO) {
		try {
			Laboratory updatedLab = laboratoryService.updateLaboratory(id, updatedLaboratoryDTO);
			return ResponseEntity.ok(updatedLab);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	// Supprimer un laboratoire
	@DeleteMapping("/supprimerLabo/{id}")
	public ResponseEntity<Void> deleteLaboratory(@PathVariable Long id) {
		try {
			laboratoryService.deleteLaboratory(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
}

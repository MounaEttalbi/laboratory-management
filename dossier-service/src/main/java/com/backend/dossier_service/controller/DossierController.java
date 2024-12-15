package com.backend.dossier_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.dossier_service.entity.Dossier;
import com.backend.dossier_service.service.DossierService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/dossiers")
public class DossierController {

    @Autowired
    private DossierService dossierService;

    // Création d'un nouveau dossier
    @PostMapping
    public ResponseEntity<Dossier> createDossier(@RequestBody Dossier dossier) {
        Dossier newDossier = dossierService.createDossier(dossier);
        return ResponseEntity.ok(newDossier);
    }

    // Récupération d'un dossier par ID
    @GetMapping("/{numDossier}")
    public ResponseEntity<Dossier> getDossierById(@PathVariable int numDossier) {
        Dossier dossier = dossierService.getDossierById(numDossier);
        return ResponseEntity.ok(dossier);
    }

    // Récupération de tous les dossiers
    @GetMapping
    public ResponseEntity<List<Dossier>> getAllDossiers() {
        List<Dossier> dossiers = dossierService.getAllDossiers();
        return ResponseEntity.ok(dossiers);
    }

    // Récupération des dossiers par date
    @GetMapping("/by-date")
    public ResponseEntity<List<Dossier>> getDossiersByDate(@RequestParam("date") Date date) {
        List<Dossier> dossiers = dossierService.getDossiersByDate(date);
        return ResponseEntity.ok(dossiers);
    }

    // Mise à jour d'un dossier
    @PutMapping("/{numDossier}")
    public ResponseEntity<Dossier> updateDossier(@PathVariable int numDossier, @RequestBody Dossier dossierDetails) {
        Dossier updatedDossier = dossierService.updateDossier(numDossier, dossierDetails);
        return ResponseEntity.ok(updatedDossier);
    }

    // Suppression d'un dossier
    @DeleteMapping("/{numDossier}")
    public ResponseEntity<Void> deleteDossier(@PathVariable int numDossier) {
        dossierService.deleteDossier(numDossier);
        return ResponseEntity.noContent().build();
    }
}
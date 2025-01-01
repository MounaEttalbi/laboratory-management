package com.backend.resultat_service.controller;

import com.backend.resultat_service.dto.ResultatDTO;
import com.backend.resultat_service.entity.Resultat;
import com.backend.resultat_service.service.ResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resultats")
public class ResultatController {

    @Autowired
    private ResultatService resultatService;

    // Ajouter un résultat
    @PostMapping
    public ResponseEntity<Resultat> addResultat(@RequestBody ResultatDTO resultatDTO) {
        Resultat createdResultat = resultatService.addResultat(resultatDTO);
        return ResponseEntity.ok(createdResultat);
    }

    // Mettre à jour un résultat
    @PutMapping("/{id}")
    public ResponseEntity<Resultat> updateResultat(@PathVariable Long id, @RequestBody ResultatDTO resultatDTO) {
        Resultat updatedResultat = resultatService.updateResultat(id, resultatDTO);
        return ResponseEntity.ok(updatedResultat);
    }

    // Supprimer un résultat
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResultat(@PathVariable Long id) {
        resultatService.deleteResultat(id);
        return ResponseEntity.noContent().build();
    }

    // Obtenir tous les résultats
    @GetMapping
    public ResponseEntity<List<Resultat>> getAllResultats() {
        List<Resultat> resultats = resultatService.getAllResultats();
        return ResponseEntity.ok(resultats);
    }

    // Obtenir un résultat par ID
    @GetMapping("/{id}")
    public ResponseEntity<Resultat> getResultatById(@PathVariable Long id) {
        Optional<Resultat> resultat = resultatService.getResultatById(id);
        return resultat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Générer le PDF du rapport de résultat
    @GetMapping("/rapport/{id}")
    public ResponseEntity<byte[]> generateRapportPDF(@PathVariable Long id) {
        byte[] pdfContent = resultatService.generateRapportPDF(id);
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=rapport_" + id + ".pdf")
                .body(pdfContent);
    }

    // Mettre à jour le statut d'un résultat
    @PutMapping("/{id}/status")
    public ResponseEntity<Resultat> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Resultat updatedResultat = resultatService.updateStatus(id, status);
        return ResponseEntity.ok(updatedResultat);
    }
}

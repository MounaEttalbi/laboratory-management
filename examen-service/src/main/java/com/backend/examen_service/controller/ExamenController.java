package com.backend.examen_service.controller;

import com.backend.examen_service.dto.ExamenDTO;
import com.backend.examen_service.entity.Examen;
import com.backend.examen_service.service.ExamenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/examens")
@CrossOrigin(origins = "http://localhost:4200")
public class ExamenController {

    private final ExamenService examenService;

    public ExamenController(ExamenService examenService) {
        this.examenService = examenService;
    }

    @PostMapping
    public ResponseEntity<Examen> createExamen(@RequestBody Examen examen) {
        return ResponseEntity.ok(examenService.addExamen(examen));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Examen> updateExamen(
            @PathVariable Long id,
            @RequestBody ExamenDTO examenDTO) {
        return ResponseEntity.ok(examenService.updateExamen(id, examenDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Examen>> getAllExamens() {
        return ResponseEntity.ok(examenService.getAllExamen());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Examen> getExamenById(@PathVariable Long id) {
        return examenService.getExamenById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamen(@PathVariable Long id) {
        examenService.deleteExamen(id);
        return ResponseEntity.noContent().build();
    }
}

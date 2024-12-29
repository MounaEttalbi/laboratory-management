package com.backend.examen_service.service.impl;

import com.backend.examen_service.dto.ExamenDTO;
import com.backend.examen_service.entity.Examen;
import com.backend.examen_service.mapper.ExamenMapper;
import com.backend.examen_service.repository.ExamenRepository;
import com.backend.examen_service.service.ExamenService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamenServiceImpl implements ExamenService {

    private final ExamenRepository examenRepository;
    private final ExamenMapper examenMapper;

    public ExamenServiceImpl(ExamenRepository examenRepository, ExamenMapper examenMapper) {
        this.examenRepository = examenRepository;
        this.examenMapper = examenMapper;
    }

    @Override
    public Examen addExamen(Examen examen) {
        return examenRepository.save(examen);
    }

    @Override
    public Examen updateExamen(Long id, ExamenDTO examenDTO) {
        Optional<Examen> existingExamenOptional = examenRepository.findById(id);

        if (existingExamenOptional.isEmpty()) {
            throw new RuntimeException("Examen with ID " + id + " not found.");
        }

        Examen existingExamen = existingExamenOptional.get();

        // Mettre à jour les champs de l'entité existante à partir du DTO
        existingExamen.setFkNumDossier(examenDTO.getFkNumDossier());
        existingExamen.setFkIdEpreuve(examenDTO.getFkIdEpreuve());
        existingExamen.setFkIdTestAnalyse(examenDTO.getFkIdTestAnalyse());
        existingExamen.setDate(examenDTO.getDate());
        existingExamen.setStatus(examenDTO.getStatus());
        existingExamen.setCommentaires(examenDTO.getCommentaires());

        return examenRepository.save(existingExamen);
    }

    @Override
    public List<Examen> getAllExamen() {
        return examenRepository.findAll();
    }

    @Override
    public Optional<Examen> getExamenById(long id) {
        return examenRepository.findById(id);
    }

    @Override
    public void deleteExamen(Long id) {
        if (!examenRepository.existsById(id)) {
            throw new RuntimeException("Examen with ID " + id + " not found.");
        }
        examenRepository.deleteById(id);
    }
}

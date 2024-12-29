package com.backend.examen_service.service;

import com.backend.examen_service.dto.ExamenDTO;
import com.backend.examen_service.entity.Examen;

import java.util.List;
import java.util.Optional;

public interface ExamenService {

    Examen addExamen (Examen examen);

    Examen updateExamen(Long id, ExamenDTO ExamenDTO);

    List<Examen> getAllExamen();

    Optional<Examen> getExamenById(long id);

    void deleteExamen(Long id);
}

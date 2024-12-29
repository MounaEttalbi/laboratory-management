package com.backend.examen_service.mapper;


import com.backend.examen_service.dto.ExamenDTO;
import com.backend.examen_service.entity.Examen;
import org.springframework.stereotype.Component;

@Component
public class ExamenMapper {

    // Convertit une entité Examen en DTO ExamenDTO
    public ExamenDTO toDto(Examen examen) {
        if (examen == null) {
            return null;
        }

        ExamenDTO dto = new ExamenDTO();
        dto.setId(examen.getId());
        dto.setFkNumDossier(examen.getFkNumDossier());
        dto.setFkIdEpreuve(examen.getFkIdEpreuve());
        dto.setFkIdTestAnalyse(examen.getFkIdTestAnalyse());
        dto.setDate(examen.getDate());
        dto.setStatus(examen.getStatus());
        dto.setCommentaires(examen.getCommentaires());

        return dto;
    }

    // Convertit un DTO ExamenDTO en entité Examen
    public Examen toEntity(ExamenDTO dto) {
        if (dto == null) {
            return null;
        }

        Examen examen = new Examen();
        examen.setId(dto.getId());
        examen.setFkNumDossier(dto.getFkNumDossier());
        examen.setFkIdEpreuve(dto.getFkIdEpreuve());
        examen.setFkIdTestAnalyse(dto.getFkIdTestAnalyse());
        examen.setDate(dto.getDate());
        examen.setStatus(dto.getStatus());
        examen.setCommentaires(dto.getCommentaires());

        return examen;
    }
}


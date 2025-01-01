package com.backend.resultat_service.mapper;

import com.backend.resultat_service.dto.ResultatDTO;
import com.backend.resultat_service.entity.Resultat;
import org.springframework.stereotype.Component;

@Component
public class ResultatMapper {

    // Convertit une Entity en DTO
    public static ResultatDTO toDTO(Resultat resultat) {
        if (resultat == null) {
            return null;
        }

        ResultatDTO resultatDTO = new ResultatDTO();
        resultatDTO.setId(resultat.getId());
        resultatDTO.setFkIdExamen(resultat.getFkIdExamen());
        resultatDTO.setValeursMesurees(resultat.getValeursMesurees());
        resultatDTO.setObservations(resultat.getObservations());
        resultatDTO.setCommentaires(resultat.getCommentaires());
        resultatDTO.setStatus(resultat.getStatus());
        resultatDTO.setRapportPDF(resultat.getRapportPDF());
        return resultatDTO;
    }

    // Convertit un DTO en Entity
    public static Resultat toEntity(ResultatDTO resultatDTO) {
        if (resultatDTO == null) {
            return null;
        }

        Resultat resultat = new Resultat();
        resultat.setId(resultatDTO.getId());
        resultat.setFkIdExamen(resultatDTO.getFkIdExamen());
        resultat.setValeursMesurees(resultatDTO.getValeursMesurees());
        resultat.setObservations(resultatDTO.getObservations());
        resultat.setCommentaires(resultatDTO.getCommentaires());
        resultat.setStatus(resultatDTO.getStatus());
        resultat.setRapportPDF(resultatDTO.getRapportPDF());
        return resultat;
    }

    // Met à jour une Entity existante à partir d'un DTO
    public static void updateEntityFromDTO(ResultatDTO resultatDTO, Resultat resultat) {
        if (resultatDTO == null || resultat == null) {
            return;
        }

        if (resultatDTO.getFkIdExamen() != null) {
            resultat.setFkIdExamen(resultatDTO.getFkIdExamen());
        }
        if (resultatDTO.getValeursMesurees() != null) {
            resultat.setValeursMesurees(resultatDTO.getValeursMesurees());
        }
        if (resultatDTO.getObservations() != null) {
            resultat.setObservations(resultatDTO.getObservations());
        }
        if (resultatDTO.getCommentaires() != null) {
            resultat.setCommentaires(resultatDTO.getCommentaires());
        }
        if (resultatDTO.getStatus() != null) {
            resultat.setStatus(resultatDTO.getStatus());
        }
        if (resultatDTO.getRapportPDF() != null) {
            resultat.setRapportPDF(resultatDTO.getRapportPDF());
        }
    }
}


package com.app.backend.mapper;

import com.app.backend.entities.Laboratory;
import com.app.backend.dto.LaboratoryDTO;

public class Mapper {

    private Mapper() {
        super();
    }

    // Méthode pour convertir l'entité Laboratory en LaboratoryDTO
    public static LaboratoryDTO toDTO(Laboratory laboratory) {
        if (laboratory == null) {
            return null;
        }

        LaboratoryDTO dto = new LaboratoryDTO();
        dto.setId(laboratory.getId());
        dto.setNom(laboratory.getNom());
        dto.setLogo(laboratory.getLogo());
        dto.setNrc(laboratory.getNrc());
        dto.setStatut(laboratory.getStatut());
        dto.setDateActivation(laboratory.getDateActivation());

        return dto;
    }

    // Méthode pour convertir LaboratoryDTO en entité Laboratory
    public static Laboratory toEntity(LaboratoryDTO laboratoryDTO) {
        if (laboratoryDTO == null) {
            return null;
        }

        Laboratory laboratory = new Laboratory();
        laboratory.setId(laboratoryDTO.getId());
        laboratory.setNom(laboratoryDTO.getNom());
        laboratory.setLogo(laboratoryDTO.getLogo());
        laboratory.setNrc(laboratoryDTO.getNrc());
        laboratory.setStatut(laboratoryDTO.getStatut());
        laboratory.setDateActivation(laboratoryDTO.getDateActivation());

        return laboratory;
    }
}

package com.backend.dossier_service.mapper;

import com.backend.dossier_service.dto.DossierDTO;
import com.backend.dossier_service.entity.Dossier;

public class Mapper {

    // Mapper de Dossier vers DossierDTO
    public static DossierDTO toDossierDTO(Dossier dossier) {
        if (dossier == null) {
            return null;
        }
        
        DossierDTO dto = new DossierDTO();
        dto.setNumDossier(dossier.getNumDossier());
        dto.setDate(dossier.getDate());
        dto.setFkEmailUtilisateur(dossier.getFkEmailUtilisateur());
        dto.setFkIdPatient(dossier.getFkIdPatient());
        
        // Ajouter des champs supplémentaires si nécessaire
        if (dossier.getUtilisateur() != null) {
            dto.setUtilisateurNom(dossier.getUtilisateur().getNomComplet()); // suppose que Utilisateur a un champ 'nom'
        }
        if (dossier.getPatient() != null) {
            dto.setPatientNom(dossier.getPatient().getNomcomplet());  // suppose que Patient a un champ 'nomcomplet'
        }

        return dto;
    }

    // Mapper de DossierDTO vers Dossier
    public static Dossier toDossier(DossierDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Dossier dossier = new Dossier();
        dossier.setNumDossier(dto.getNumDossier());
        dossier.setDate(dto.getDate());
        dossier.setFkEmailUtilisateur(dto.getFkEmailUtilisateur());
        dossier.setFkIdPatient(dto.getFkIdPatient());
        
        // Note : Les champs Utilisateur et Patient sont des objets Transient et doivent être gérés séparément
        return dossier;
    }
}

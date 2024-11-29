package com.backend.adresse_service.mapper;

import com.backend.adresse_service.dto.AdresseDTO;
import com.backend.adresse_service.entity.Adresse;

public class Mapper {

    private Mapper() {super();}

    // convert address entity to dto
    public static AdresseDTO toDTO(Adresse adresse) {
        if (adresse == null) {
            return null;
        }
        AdresseDTO dto = new AdresseDTO();
        dto.setId(adresse.getId());
        dto.setNumVoie(adresse.getNumVoie());
        dto.setNomVoie(adresse.getNomVoie());
        dto.setVille(adresse.getVille());
        dto.setCommune(adresse.getCommune());
        dto.setCodePostal(adresse.getCodePostal());

        return dto;
    }

    //convert dto address to entity address
    public static Adresse toEntity (AdresseDTO adresseDTO){
        if (adresseDTO == null){
            return null;
        }
        Adresse adresse = new Adresse();
        adresse.setId(adresseDTO.getId());
        adresse.setNumVoie(adresseDTO.getNumVoie());
        adresse.setNomVoie(adresseDTO.getNomVoie());
        adresse.setVille(adresseDTO.getVille());
        adresse.setCommune(adresseDTO.getCommune());
        adresse.setCodePostal(adresseDTO.getCodePostal());

        return adresse;
    }
}

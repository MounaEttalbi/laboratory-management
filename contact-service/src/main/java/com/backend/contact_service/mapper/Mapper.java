package com.backend.contact_service.mapper;


import com.backend.contact_service.dto.ContactDTO;
import com.backend.contact_service.entity.Contact;
import com.backend.contact_service.model.Adresse;
import com.backend.contact_service.model.Laboratory;

public class Mapper {

    private Mapper() {
        super();
    }

    // Méthode pour convertir une entité Contact en ContactDTO
    public static ContactDTO toDTO(Contact contact, Laboratory laboratory, Adresse adresse) {
        if (contact == null) {
            return null;
        }
        ContactDTO dto = new ContactDTO();
        dto.setId(contact.getId());
        dto.setFax(contact.getFax());
        dto.setEmail(contact.getEmail());
        dto.setNumTel(contact.getNumTel());
        dto.setFkIdAdresse(contact.getFkIdAdresse());
        dto.setFkIdLaboratoire(contact.getFkIdLaboratoire());

        // Ajouter le nom du laboratoire dans le DTO
        if (laboratory != null) {
            dto.setLaboratoryName(laboratory.getNom());
        } else {
            dto.setLaboratoryName("Non renseigné");
        }

        // Ajouter l'adresse formatée dans le DTO
        if (adresse != null) {
            String adresseFormatee = adresse.getNumVoie() + ", " + adresse.getNomVoie() + ", " + adresse.getVille() + ", " + adresse.getCodePostal();
            dto.setAdresse(adresseFormatee);
        } else {
            dto.setAdresse("Non renseigné");
        }

        return dto;
    }

    // Méthode pour convertir ContactDTO en entité Contact
    public static Contact toEntity(ContactDTO contactDTO) {
        if (contactDTO == null) {
            return null;
        }
        Contact contact = new Contact();
        contact.setId(contactDTO.getId());
        contact.setFax(contactDTO.getFax());
        contact.setEmail(contactDTO.getEmail());
        contact.setNumTel(contactDTO.getNumTel());
        contact.setFkIdAdresse(contactDTO.getFkIdAdresse());
        contact.setFkIdLaboratoire(contactDTO.getFkIdLaboratoire());
        return contact;
    }
}


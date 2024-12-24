package com.backend.adresse_service;


import com.backend.adresse_service.dto.AdresseDTO;
import com.backend.adresse_service.entity.Adresse;
import com.backend.adresse_service.mapper.Mapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MapperTest {

    @Test
    void testToDTO_ShouldConvertEntityToDTO() {
        // Arrange
        Adresse adresse = new Adresse();
        adresse.setId(1L);
        adresse.setNumVoie("10A");
        adresse.setNomVoie("Rue de Paris");
        adresse.setVille("Paris");
        adresse.setCommune("Ile-de-France");
        adresse.setCodePostal("75001");

        // Act
        AdresseDTO adresseDTO = Mapper.toDTO(adresse);

        // Assert
        assertNotNull(adresseDTO);
        assertEquals(1L, adresseDTO.getId());
        assertEquals("10A", adresseDTO.getNumVoie());
        assertEquals("Rue de Paris", adresseDTO.getNomVoie());
        assertEquals("Paris", adresseDTO.getVille());
        assertEquals("Ile-de-France", adresseDTO.getCommune());
        assertEquals("75001", adresseDTO.getCodePostal());
    }

    @Test
    void testToDTO_ShouldReturnNull_WhenEntityIsNull() {
        // Act
        AdresseDTO adresseDTO = Mapper.toDTO(null);

        // Assert
        assertNull(adresseDTO);
    }

    @Test
    void testToEntity_ShouldConvertDTOToEntity() {
        // Arrange
        AdresseDTO adresseDTO = new AdresseDTO();
        adresseDTO.setId(1L);
        adresseDTO.setNumVoie("10A");
        adresseDTO.setNomVoie("Rue de Lyon");
        adresseDTO.setVille("Lyon");
        adresseDTO.setCommune("Auvergne-Rhône-Alpes");
        adresseDTO.setCodePostal("69001");

        // Act
        Adresse adresse = Mapper.toEntity(adresseDTO);

        // Assert
        assertNotNull(adresse);
        assertEquals(1L, adresse.getId());
        assertEquals("10A", adresse.getNumVoie());
        assertEquals("Rue de Lyon", adresse.getNomVoie());
        assertEquals("Lyon", adresse.getVille());
        assertEquals("Auvergne-Rhône-Alpes", adresse.getCommune());
        assertEquals("69001", adresse.getCodePostal());
    }

    @Test
    void testToEntity_ShouldReturnNull_WhenDTOIsNull() {
        // Act
        Adresse adresse = Mapper.toEntity(null);

        // Assert
        assertNull(adresse);
    }
}

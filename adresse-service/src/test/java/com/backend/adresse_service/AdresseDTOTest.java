package com.backend.adresse_service;


import com.backend.adresse_service.dto.AdresseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class AdresseDTOTest {

    private AdresseDTO adresseDTO;

    // Cette méthode sera exécutée avant chaque test pour initialiser l'objet à tester
    @BeforeEach
    public void setUp() {
        adresseDTO = new AdresseDTO(1L, "12", "Rue de Paris", "75001", "Paris", "Paris");
    }

    @Test
    public void testConstructorAndGetters() {
        assertNotNull(adresseDTO);
        assertEquals(1L, adresseDTO.getId());
        assertEquals("12", adresseDTO.getNumVoie());
        assertEquals("Rue de Paris", adresseDTO.getNomVoie());
        assertEquals("75001", adresseDTO.getCodePostal());
        assertEquals("Paris", adresseDTO.getVille());
        assertEquals("Paris", adresseDTO.getCommune());
    }

    @Test
    public void testSetters() {
        adresseDTO.setId(2L);
        adresseDTO.setNumVoie("15");
        adresseDTO.setNomVoie("Avenue des Champs");
        adresseDTO.setCodePostal("75008");
        adresseDTO.setVille("Paris");
        adresseDTO.setCommune("Paris");

        assertEquals(2L, adresseDTO.getId());
        assertEquals("15", adresseDTO.getNumVoie());
        assertEquals("Avenue des Champs", adresseDTO.getNomVoie());
        assertEquals("75008", adresseDTO.getCodePostal());
        assertEquals("Paris", adresseDTO.getVille());
        assertEquals("Paris", adresseDTO.getCommune());
    }

    @Test
    public void testToString() {
        String expectedString = "Adresse{id=1, numVoie='12', nomVoie='Rue de Paris', codePostal='75001', ville='Paris', commune='Paris'}";
        assertEquals(expectedString, adresseDTO.toString());
    }
}

package com.app.backend;

import com.app.backend.entities.Laboratory;
import com.app.backend.entities.Statut;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class LaboratoryTest {

    private Laboratory laboratory;
    private byte[] logo;
    private Date dateActivation;

    @BeforeEach
    void setUp() {
        logo = new byte[]{1, 2, 3};
        dateActivation = new Date();
        laboratory = new Laboratory(1L, "Lab1", logo, 12345L, Statut.ACTIF, dateActivation);
    }

    @Test
    void testConstructorWithParameters() {
        assertEquals(1L, laboratory.getId());
        assertEquals("Lab1", laboratory.getNom());
        assertArrayEquals(logo, laboratory.getLogo());
        assertEquals(Long.valueOf(12345L), laboratory.getNrc());
        assertEquals(Statut.ACTIF, laboratory.getStatut());
        assertEquals(dateActivation, laboratory.getDateActivation());
    }

    @Test
    void testSettersAndGetters() {
        laboratory.setId(2L);
        assertEquals(2L, laboratory.getId());

        laboratory.setNom("Lab2");
        assertEquals("Lab2", laboratory.getNom());

        byte[] newLogo = new byte[]{4, 5, 6};
        laboratory.setLogo(newLogo);
        assertArrayEquals(newLogo, laboratory.getLogo());

        laboratory.setNrc(67890L);
        assertEquals(Long.valueOf(67890L), laboratory.getNrc());

        laboratory.setStatut(Statut.INACTIF);
        assertEquals(Statut.INACTIF, laboratory.getStatut());

        Date newDateActivation = new Date();
        laboratory.setDateActivation(newDateActivation);
        assertEquals(newDateActivation, laboratory.getDateActivation());
    }

    @Test
    void testToString() {
        String expectedString = "Laboratory [id=1, nom=Lab1, logo=" + Arrays.toString(logo) +
                ", nrc=12345, statut=ACTIF, dateActivation=" + dateActivation + "]";
        assertEquals(expectedString, laboratory.toString());
    }

}

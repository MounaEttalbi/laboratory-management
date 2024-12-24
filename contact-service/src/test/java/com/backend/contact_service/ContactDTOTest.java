package com.backend.contact_service;

import com.backend.contact_service.dto.ContactDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ContactDTOTest {

    private ContactDTO contactDTO;

    @BeforeEach
    public void setUp() {
        // Initialisation avant chaque test
        contactDTO = new ContactDTO();
    }

    @Test
    public void testSetAndGetId() {
        // Tester setter et getter pour 'id'
        contactDTO.setId(1L);
        assertEquals(1L, contactDTO.getId(), "ID should be 1L");
    }

    @Test
    public void testSetAndGetFkIdLaboratoire() {
        // Tester setter et getter pour 'fkIdLaboratoire'
        contactDTO.setFkIdLaboratoire(101L);
        assertEquals(101L, contactDTO.getFkIdLaboratoire(), "fkIdLaboratoire should be 101L");
    }

    @Test
    public void testSetAndGetFkIdAdresse() {
        // Tester setter et getter pour 'fkIdAdresse'
        contactDTO.setFkIdAdresse(201L);
        assertEquals(201L, contactDTO.getFkIdAdresse(), "fkIdAdresse should be 201L");
    }

    @Test
    public void testSetAndGetNumTel() {
        // Tester setter et getter pour 'numTel'
        contactDTO.setNumTel("123456789");
        assertEquals("123456789", contactDTO.getNumTel(), "numTel should be '123456789'");
    }

    @Test
    public void testSetAndGetFax() {
        // Tester setter et getter pour 'fax'
        contactDTO.setFax("987654321");
        assertEquals("987654321", contactDTO.getFax(), "fax should be '987654321'");
    }

    @Test
    public void testSetAndGetEmail() {
        // Tester setter et getter pour 'email'
        contactDTO.setEmail("test@example.com");
        assertEquals("test@example.com", contactDTO.getEmail(), "email should be 'test@example.com'");
    }

    @Test
    public void testSetAndGetLaboratoryName() {
        // Tester setter et getter pour 'laboratoryName'
        contactDTO.setLaboratoryName("Lab A");
        assertEquals("Lab A", contactDTO.getLaboratoryName(), "laboratoryName should be 'Lab A'");
    }

    @Test
    public void testSetAndGetAdresse() {
        // Tester setter et getter pour 'adresse'
        contactDTO.setAdresse("123 Rue de Paris");
        assertEquals("123 Rue de Paris", contactDTO.getAdresse(), "adresse should be '123 Rue de Paris'");
    }

    @Test
    public void testConstructorWithParameters() {
        // Tester le constructeur avec des paramètres
        ContactDTO contactDTOParam = new ContactDTO(1L, 101L, 201L, "123456789", "987654321", "test@example.com", "Lab A");

        assertEquals(1L, contactDTOParam.getId(), "ID should be 1L");
        assertEquals(101L, contactDTOParam.getFkIdLaboratoire(), "fkIdLaboratoire should be 101L");
        assertEquals(201L, contactDTOParam.getFkIdAdresse(), "fkIdAdresse should be 201L");
        assertEquals("123456789", contactDTOParam.getNumTel(), "numTel should be '123456789'");
        assertEquals("987654321", contactDTOParam.getFax(), "fax should be '987654321'");
        assertEquals("test@example.com", contactDTOParam.getEmail(), "email should be 'test@example.com'");
        assertEquals("Lab A", contactDTOParam.getLaboratoryName(), "laboratoryName should be 'Lab A'");
    }
}

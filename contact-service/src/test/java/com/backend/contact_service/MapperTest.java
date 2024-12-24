package com.backend.contact_service;

import com.backend.contact_service.dto.ContactDTO;
import com.backend.contact_service.entity.Contact;
import com.backend.contact_service.mapper.Mapper;
import com.backend.contact_service.model.Adresse;
import com.backend.contact_service.model.Laboratory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

public class MapperTest {

    private Contact contact;
    private Laboratory laboratory;
    private Adresse adresse;
    private ContactDTO contactDTO;

    @BeforeEach
    public void setUp() {
        // Initialisation des objets avant chaque test
        contact = new Contact();
        contact.setId(1L);
        contact.setFax("12345");
        contact.setEmail("test@example.com");
        contact.setNumTel("123456789");
        contact.setFkIdAdresse(1L);
        contact.setFkIdLaboratoire(1L);

        laboratory = mock(Laboratory.class);
        when(laboratory.getNom()).thenReturn("Lab A");

        adresse = mock(Adresse.class);
        when(adresse.getNumVoie()).thenReturn("12");
        when(adresse.getNomVoie()).thenReturn("Rue de Paris");
        when(adresse.getVille()).thenReturn("Paris");
        when(adresse.getCodePostal()).thenReturn("75001");

        contactDTO = new ContactDTO(1L, 1L, 1L, "123456789", "12345", "test@example.com", "Lab A");
    }

    @Test
    public void testToDTO() {
        // Tester la conversion de Contact en ContactDTO
        ContactDTO dto = Mapper.toDTO(contact, laboratory, adresse);

        assertNotNull(dto, "DTO should not be null");
        assertEquals(contact.getId(), dto.getId(), "ID should match");
        assertEquals(contact.getFax(), dto.getFax(), "Fax should match");
        assertEquals(contact.getEmail(), dto.getEmail(), "Email should match");
        assertEquals(contact.getNumTel(), dto.getNumTel(), "Phone number should match");
        assertEquals(contact.getFkIdAdresse(), dto.getFkIdAdresse(), "Adresse ID should match");
        assertEquals(contact.getFkIdLaboratoire(), dto.getFkIdLaboratoire(), "Laboratory ID should match");
        assertEquals("Lab A", dto.getLaboratoryName(), "Laboratory name should be 'Lab A'");
        assertEquals("12, Rue de Paris, Paris, 75001", dto.getAdresse(), "Adresse should be formatted correctly");
    }

    @Test
    public void testToDTO_withNullLaboratory() {
        // Tester la conversion avec un laboratoire nul
        ContactDTO dto = Mapper.toDTO(contact, null, adresse);

        assertNotNull(dto, "DTO should not be null");
        assertEquals("Non renseigné", dto.getLaboratoryName(), "Laboratory name should be 'Non renseigné'");
    }

    @Test
    public void testToDTO_withNullAdresse() {
        // Tester la conversion avec une adresse nulle
        ContactDTO dto = Mapper.toDTO(contact, laboratory, null);

        assertNotNull(dto, "DTO should not be null");
        assertEquals("Non renseigné", dto.getAdresse(), "Adresse should be 'Non renseigné'");
    }

    @Test
    public void testToEntity() {
        // Tester la conversion de ContactDTO en Contact
        Contact entity = Mapper.toEntity(contactDTO);

        assertNotNull(entity, "Entity should not be null");
        assertEquals(contactDTO.getId(), entity.getId(), "ID should match");
        assertEquals(contactDTO.getFax(), entity.getFax(), "Fax should match");
        assertEquals(contactDTO.getEmail(), entity.getEmail(), "Email should match");
        assertEquals(contactDTO.getNumTel(), entity.getNumTel(), "Phone number should match");
        assertEquals(contactDTO.getFkIdAdresse(), entity.getFkIdAdresse(), "Adresse ID should match");
        assertEquals(contactDTO.getFkIdLaboratoire(), entity.getFkIdLaboratoire(), "Laboratory ID should match");
    }

    @Test
    public void testToEntity_withNullDTO() {
        // Tester la conversion avec un DTO nul
        Contact entity = Mapper.toEntity(null);

        assertNull(entity, "Entity should be null");
    }
}

package com.backend.contact_service;
import com.backend.contact_service.client.AdresseRestClient;
import com.backend.contact_service.client.LaboratoryRestClient;
import com.backend.contact_service.dto.ContactDTO;
import com.backend.contact_service.entity.Contact;
import com.backend.contact_service.model.Adresse;
import com.backend.contact_service.model.Laboratory;
import com.backend.contact_service.repository.ContactRepository;
import com.backend.contact_service.service.impl.ServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ServiceImplTest {

    @Mock
    private ContactRepository contactRepository;

    @Mock
    private AdresseRestClient adresseRestClient;

    @Mock
    private LaboratoryRestClient laboratoryRestClient;

    @InjectMocks
    private ServiceImpl serviceImpl;

    private ContactDTO contactDTO;
    private Contact contact;
    private Adresse adresse;
    private Laboratory laboratory;

    @BeforeEach
    public void setUp() {
        contactDTO = new ContactDTO(1L, 1L, 1L, "123456789", "12345", "test@example.com", "Lab A");

        contact = new Contact();
        contact.setId(1L);
        contact.setFax("12345");
        contact.setEmail("test@example.com");
        contact.setNumTel("123456789");
        contact.setFkIdAdresse(1L);
        contact.setFkIdLaboratoire(1L);

        adresse = new Adresse();
        adresse.setNumVoie("12");
        adresse.setNomVoie("Rue de Paris");
        adresse.setVille("Paris");
        adresse.setCodePostal("75001");

        laboratory = new Laboratory();
        laboratory.setNom("Lab A");
    }

    @Test
    public void testAddContact() {
        // Given
        when(contactRepository.save(any(Contact.class))).thenReturn(contact);

        // When
        Contact result = serviceImpl.addContact(contactDTO);

        // Then
        assertNotNull(result);
        assertEquals(contact.getId(), result.getId());
        verify(contactRepository, times(1)).save(any(Contact.class));
    }

    @Test
    public void testUpdateContact() {
        // Given
        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));
        when(contactRepository.save(any(Contact.class))).thenReturn(contact);

        // When
        Contact updatedContact = serviceImpl.updateContact(1L, contactDTO);

        // Then
        assertNotNull(updatedContact);
        assertEquals(contactDTO.getFax(), updatedContact.getFax());
        assertEquals(contactDTO.getEmail(), updatedContact.getEmail());
        verify(contactRepository, times(1)).save(any(Contact.class));
    }

    @Test
    public void testUpdateContact_NotFound() {
        // Given
        when(contactRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        Contact updatedContact = serviceImpl.updateContact(1L, contactDTO);

        // Then
        assertNull(updatedContact);
        verify(contactRepository, times(0)).save(any(Contact.class));
    }

    @Test
    public void testGetAllContacts() {
        // Given
        when(contactRepository.findAll()).thenReturn(List.of(contact));
        when(adresseRestClient.getAdresseById(1L)).thenReturn(adresse);
        when(laboratoryRestClient.findLaboratoryById(1L)).thenReturn(laboratory);

        // When
        var contacts = serviceImpl.getAllLContacts();

        // Then
        assertNotNull(contacts);
        assertEquals(1, contacts.size());
        assertEquals("Lab A", contacts.get(0).getLaboratoryName());

        // Vérifiez la chaîne générée par toString()
        String expectedAdresseString = "Adresse{id=null, numVoie='12', nomVoie='Rue de Paris', codePostal='75001', ville='Paris', commune='null'}";
        assertEquals(expectedAdresseString, contacts.get(0).getAdresse().toString());

        verify(contactRepository, times(1)).findAll();
    }

    @Test
    public void testGetContactById_NotFound() {
        // Given
        when(contactRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        Optional<Contact> result = serviceImpl.getContactById(1L);

        // Then
        assertFalse(result.isPresent());
    }

    @Test
    public void testDeleteContact() {
        // Given
        doNothing().when(contactRepository).deleteById(1L);

        // When
        serviceImpl.deleteContact(1L);

        // Then
        verify(contactRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetContactsByLaboratoryId() {
        // Given
        when(contactRepository.findByFkIdLaboratoire(1L)).thenReturn(List.of(contact));

        // When
        var contacts = serviceImpl.getContactsByLaboratoryId(1L);

        // Then
        assertNotNull(contacts);
        assertEquals(1, contacts.size());
        verify(contactRepository, times(1)).findByFkIdLaboratoire(1L);
    }
}

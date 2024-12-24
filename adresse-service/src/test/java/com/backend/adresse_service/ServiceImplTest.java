package com.backend.adresse_service;

import com.backend.adresse_service.dto.AdresseDTO;
import com.backend.adresse_service.entity.Adresse;
import com.backend.adresse_service.mapper.Mapper;
import com.backend.adresse_service.repository.AdresseRepository;
import com.backend.adresse_service.service.impl.ServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ServiceImplTest {

    @Mock
    private AdresseRepository adresseRepository;

    @InjectMocks
    private ServiceImpl serviceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialise les mocks
    }

    // Test pour addAdresse
    @Test
    void addAdresse_ShouldReturnSavedAdresse() {
        // Données d'entrée
        AdresseDTO adresseDTO = new AdresseDTO(1L, "10", "Rue des Fleurs", "75001", "Paris", "A1");
        Adresse adresse = Mapper.toEntity(adresseDTO);

        // Simule le comportement du repository
        when(adresseRepository.save(any(Adresse.class))).thenReturn(adresse);

        // Appel du service
        Adresse result = serviceImpl.addAdresse(adresseDTO);

        // Vérifications
        assertNotNull(result);
        assertEquals("Paris", result.getVille());
        assertEquals("75001", result.getCodePostal());
        verify(adresseRepository, times(1)).save(any(Adresse.class));
    }

    // Test pour updateAdresse
    @Test
    void updateAdresse_WhenAdresseExists_ShouldUpdateAndReturn() {
        // Données d'entrée
        AdresseDTO adresseDTO = new AdresseDTO(1L, "10", "Rue des Fleurs", "75001", "Paris", "A1");
        Adresse existingAdresse = new Adresse(1L, "8", "Rue Vieille", "75000", "Lyon", "2B");

        // Simule le comportement du repository
        when(adresseRepository.findById(1L)).thenReturn(Optional.of(existingAdresse));
        when(adresseRepository.save(any(Adresse.class))).thenReturn(existingAdresse);

        // Appel du service
        Adresse result = serviceImpl.updateAdresse(1L, adresseDTO);

        // Vérifications
        assertNotNull(result);
        assertEquals("Paris", result.getVille());
        assertEquals("75001", result.getCodePostal());
        verify(adresseRepository, times(1)).findById(1L);
        verify(adresseRepository, times(1)).save(existingAdresse);
    }

    @Test
    void updateAdresse_WhenAdresseDoesNotExist_ShouldReturnNull() {
        // Simule le comportement du repository
        when(adresseRepository.findById(1L)).thenReturn(Optional.empty());

        // Appel du service
        Adresse result = serviceImpl.updateAdresse(1L, new AdresseDTO());

        // Vérifications
        assertNull(result);
        verify(adresseRepository, times(1)).findById(1L);
        verify(adresseRepository, times(0)).save(any(Adresse.class));
    }

    // Test pour getAllAdresse
    @Test
    void getAllAdresse_ShouldReturnListOfAdresses() {
        // Données simulées
        Adresse adresse1 = new Adresse(1L, "10", "Rue 1", "75001", "Paris", "1A");
        Adresse adresse2 = new Adresse(2L, "20", "Rue 2", "75002", "Lyon", "2B");
        List<Adresse> adresses = List.of(adresse1, adresse2);

        // Simule le comportement du repository
        when(adresseRepository.findAll()).thenReturn(adresses);

        // Appel du service
        List<Adresse> result = serviceImpl.getAllAdresse();

        // Vérifications
        assertEquals(2, result.size());
        assertEquals("Paris", result.get(0).getVille());
        verify(adresseRepository, times(1)).findAll();
    }

    // Test pour getAdresseById
    @Test
    void getAdresseById_WhenFound_ShouldReturnAdresse() {
        // Données simulées
        Adresse adresse = new Adresse(1L, "10", "Rue 1", "75001", "Paris", "1A");

        // Simule le comportement du repository
        when(adresseRepository.findById(1L)).thenReturn(Optional.of(adresse));

        // Appel du service
        Optional<Adresse> result = serviceImpl.getAdresseById(1L);

        // Vérifications
        assertTrue(result.isPresent());
        assertEquals("Paris", result.get().getVille());
        verify(adresseRepository, times(1)).findById(1L);
    }

    @Test
    void getAdresseById_WhenNotFound_ShouldReturnEmpty() {
        // Simule le comportement du repository
        when(adresseRepository.findById(1L)).thenReturn(Optional.empty());

        // Appel du service
        Optional<Adresse> result = serviceImpl.getAdresseById(1L);

        // Vérifications
        assertFalse(result.isPresent());
        verify(adresseRepository, times(1)).findById(1L);
    }

    // Test pour deleteAdresse
    @Test
    void deleteAdresse_ShouldCallRepositoryDeleteById() {
        // Appel du service
        serviceImpl.deleteAdresse(1L);

        // Vérifications
        verify(adresseRepository, times(1)).deleteById(1L);
    }
}

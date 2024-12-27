package com.backend.dossier_service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import com.backend.dossier_service.entity.Dossier;
import com.backend.dossier_service.repository.DossierRepository;
import com.backend.dossier_service.service.impl.ServiceImpl;

import java.util.Optional;
import java.util.Date;
import java.util.List;
import java.util.Arrays;

public class DossierServiceTest {

    @Mock
    private DossierRepository dossierRepository;

    @InjectMocks
    private ServiceImpl dossierService;

    private Dossier dossier;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un Dossier pour les tests
        dossier = new Dossier();
        dossier.setNumDossier(1);
        dossier.setDate(new Date());
        dossier.setFkEmailUtilisateur("test@example.com");
        dossier.setFkIdPatient("123");
        dossier.setStatus("active");
    }

    // Test de la méthode createDossier
    @Test
    public void testCreateDossier() {
        when(dossierRepository.save(any(Dossier.class))).thenReturn(dossier);

        Dossier createdDossier = dossierService.createDossier(dossier);

        assertNotNull(createdDossier);
        assertEquals("test@example.com", createdDossier.getFkEmailUtilisateur());
        verify(dossierRepository, times(1)).save(dossier);
    }

    // Test de la méthode getDossierById
    @Test
    public void testGetDossierById() {
        when(dossierRepository.findById(1)).thenReturn(Optional.of(dossier));

        Dossier foundDossier = dossierService.getDossierById(1);

        assertNotNull(foundDossier);
        assertEquals(1, foundDossier.getNumDossier());
        verify(dossierRepository, times(1)).findById(1);
    }

    // Test de la méthode getAllDossiers
    @Test
    public void testGetAllDossiers() {
        when(dossierRepository.findAll()).thenReturn(Arrays.asList(dossier));

        List<Dossier> dossiers = dossierService.getAllDossiers();

        assertNotNull(dossiers);
        assertEquals(1, dossiers.size());
        verify(dossierRepository, times(1)).findAll();
    }

    // Test de la méthode getDossiersByDate
    @Test
    public void testGetDossiersByDate() {
        Date date = new Date();
        when(dossierRepository.findByDate(date)).thenReturn(Arrays.asList(dossier));

        List<Dossier> dossiers = dossierService.getDossiersByDate(date);

        assertNotNull(dossiers);
        assertEquals(1, dossiers.size());
        verify(dossierRepository, times(1)).findByDate(date);
    }

    // Test de la méthode updateDossier
    @Test
    public void testUpdateDossier() {
        Dossier updatedDossier = new Dossier();
        updatedDossier.setDate(new Date());
        updatedDossier.setFkEmailUtilisateur("updated@example.com");
        updatedDossier.setFkIdPatient("456");
        updatedDossier.setStatus("inactive");

        when(dossierRepository.findById(1)).thenReturn(Optional.of(dossier));
        when(dossierRepository.save(any(Dossier.class))).thenReturn(updatedDossier);

        Dossier result = dossierService.updateDossier(1, updatedDossier);

        assertNotNull(result);
        assertEquals("updated@example.com", result.getFkEmailUtilisateur());
        assertEquals("456", result.getFkIdPatient());
        assertEquals("inactive", result.getStatus());
        verify(dossierRepository, times(1)).findById(1);
        verify(dossierRepository, times(1)).save(any(Dossier.class));
    }

    // Test de la méthode deleteDossier
    @Test
    public void testDeleteDossier() {
        when(dossierRepository.findById(1)).thenReturn(Optional.of(dossier));

        dossierService.deleteDossier(1);

        verify(dossierRepository, times(1)).delete(dossier);
    }

    // Test de la méthode archiveDossier
    @Test
    public void testArchiveDossier() {
        when(dossierRepository.findById(1)).thenReturn(Optional.of(dossier));
        when(dossierRepository.save(any(Dossier.class))).thenReturn(dossier);

        Dossier archivedDossier = dossierService.archiveDossier(1);

        assertNotNull(archivedDossier);
        assertEquals("ARCHIVED", archivedDossier.getStatus());
        verify(dossierRepository, times(1)).findById(1);
        verify(dossierRepository, times(1)).save(any(Dossier.class));
    }

    // Test de la méthode getDossiersByPatient
    @Test
    public void testGetDossiersByPatient() {
        when(dossierRepository.findByFkIdPatient("123")).thenReturn(Arrays.asList(dossier));

        List<Dossier> dossiers = dossierService.getDossiersByPatient("123");

        assertNotNull(dossiers);
        assertEquals(1, dossiers.size());
        verify(dossierRepository, times(1)).findByFkIdPatient("123");
    }

    // Test de la méthode getDossiersByUser
    @Test
    public void testGetDossiersByUser() {
        when(dossierRepository.findByFkEmailUtilisateur("test@example.com")).thenReturn(Arrays.asList(dossier));

        List<Dossier> dossiers = dossierService.getDossiersByUser("test@example.com");

        assertNotNull(dossiers);
        assertEquals(1, dossiers.size());
        verify(dossierRepository, times(1)).findByFkEmailUtilisateur("test@example.com");
    }
}

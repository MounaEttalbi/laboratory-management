package com.app.backend;

import com.app.backend.dto.LaboratoryDTO;
import com.app.backend.entities.Laboratory;
import com.app.backend.entities.Statut;
import com.app.backend.mapper.Mapper;
import com.app.backend.repository.LaboratoryRepository;
import com.app.backend.service.impl.ServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LaboratoryServiceImpTest {

    @Mock
    private LaboratoryRepository laboratoryRepository;

    @InjectMocks
    private ServiceImpl laboratoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAjouterLaboratoire() {
        // Arrange
        LaboratoryDTO laboratoryDTO = new LaboratoryDTO("Laboratoire A", 123456L, Statut.ACTIF, new Date(), "http://example.com/logo.png");
        Laboratory laboratory = Mapper.toEntity(laboratoryDTO);

        when(laboratoryRepository.save(any(Laboratory.class))).thenReturn(laboratory);

        // Act
        Laboratory result = laboratoryService.addLaboratory(laboratory);

        // Assert
        assertNotNull(result);
        assertEquals(laboratoryDTO.getNom(), result.getNom());
        verify(laboratoryRepository, times(1)).save(any(Laboratory.class));
    }

    @Test
    void testModifierLaboratoire() {
        // Arrange
        Long labId = 1L;
        Laboratory existingLaboratory = new Laboratory(labId, "Laboratoire A", "http://example.com/logo.png", 123456L, Statut.ACTIF, new Date());
        LaboratoryDTO laboratoryDTO = new LaboratoryDTO("Laboratoire A Modifié", 789012L, Statut.INACTIF, new Date(), "http://example.com/new-logo.png");

        when(laboratoryRepository.findById(labId)).thenReturn(Optional.of(existingLaboratory));
        when(laboratoryRepository.save(any(Laboratory.class))).thenReturn(existingLaboratory);

        // Act
        Laboratory updatedLaboratory = laboratoryService.updateLaboratory(labId, laboratoryDTO);

        // Assert
        assertNotNull(updatedLaboratory);
        assertEquals(laboratoryDTO.getNom(), updatedLaboratory.getNom());
        verify(laboratoryRepository, times(1)).save(any(Laboratory.class));
    }

    @Test
    void testObtenirTousLesLaboratoires() {
        // Arrange
        Laboratory lab1 = new Laboratory("Laboratoire 1",123L, Statut.ACTIF, new Date(),"http://example.com/logo1.png");
        Laboratory lab2 = new Laboratory("Laboratoire 2", 456L, Statut.INACTIF, new Date(), "http://example.com/logo2.png");

        when(laboratoryRepository.findAll()).thenReturn(Arrays.asList(lab1, lab2));

        // Act
        List<Laboratory> laboratories = laboratoryService.getAllLaboratories();

        // Assert
        assertEquals(2, laboratories.size());
        verify(laboratoryRepository, times(1)).findAll();
    }

    @Test
    void testObtenirLaboratoireParId() {
        // Arrange
        Long labId = 1L;
        Laboratory laboratory = new Laboratory(labId, "Laboratoire A", "http://example.com/logo.png", 123L, Statut.ACTIF, new Date());

        when(laboratoryRepository.findById(labId)).thenReturn(Optional.of(laboratory));

        // Act
        Optional<Laboratory> result = laboratoryService.getLaboratoryById(labId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(labId, result.get().getId());
        verify(laboratoryRepository, times(1)).findById(labId);
    }

    @Test
    void testSupprimerLaboratoire() {
        // Arrange
        Long labId = 1L;

        // Act
        laboratoryService.deleteLaboratory(labId);

        // Assert
        verify(laboratoryRepository, times(1)).deleteById(labId);
    }
}

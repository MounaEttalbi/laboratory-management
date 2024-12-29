package com.backend.patient_service;

import com.backend.patient_service.dto.PatientDTO;
import com.backend.patient_service.entity.Patient;
import com.backend.patient_service.mapper.PatientMapper;
import com.backend.patient_service.repository.PatientRepository;
import com.backend.patient_service.service.impl.PatientServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PatientServiceImplTest {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientServiceImpl patientService;

    private Patient patient;
    private PatientDTO patientDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation des objets patient et patientDTO
        patient = new Patient(1, "John Doe", new java.util.Date(), "Paris", "M", "CIN", "123456", "123 Street", "123456789", "john.doe@example.com", "Visible");
        patientDTO = new PatientDTO(1, "John Doe", new java.util.Date(), "Paris", "M", "CIN", "123456", "123 Street", "123456789", "john.doe@example.com", "Visible");
    }

    @Test
    void testGetAllPatients() {
        // Simuler le comportement du repository
        when(patientRepository.findAll()).thenReturn(Arrays.asList(patient));

        // Appeler la méthode à tester
        var patients = patientService.getAllPatients();

        // Vérifications
        assertNotNull(patients);
        assertEquals(1, patients.size());
        assertEquals(patient.getNomcomplet(), patients.get(0).getNomcomplet());
        verify(patientRepository, times(1)).findAll();
    }

    @Test
    void testGetPatientById() {
        // Simuler le comportement du repository
        when(patientRepository.findById(1)).thenReturn(Optional.of(patient));

        // Appeler la méthode à tester
        PatientDTO result = patientService.getPatientById(1);

        // Vérifications
        assertNotNull(result);
        assertEquals(patient.getNomcomplet(), result.getNomcomplet());
        verify(patientRepository, times(1)).findById(1);
    }

    @Test
    void testGetPatientByIdNotFound() {
        // Simuler le comportement du repository
        when(patientRepository.findById(1)).thenReturn(Optional.empty());

        // Appeler la méthode et vérifier l'exception
        Exception exception = assertThrows(RuntimeException.class, () -> {
            patientService.getPatientById(1);
        });

        // Vérification du message d'erreur
        assertEquals("Patient not found", exception.getMessage());
        verify(patientRepository, times(1)).findById(1);
    }

    @Test
    void testCreatePatient() {
        // Simuler le comportement du repository
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);

        // Appeler la méthode à tester
        PatientDTO result = patientService.createPatient(patientDTO);

        // Vérifications
        assertNotNull(result);
        assertEquals(patientDTO.getNomcomplet(), result.getNomcomplet());
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    void testUpdatePatient() {
        // Simuler le comportement du repository
        when(patientRepository.findById(1)).thenReturn(Optional.of(patient));
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);

        // Appeler la méthode à tester
        PatientDTO updatedPatient = patientService.updatePatient(1, patientDTO);

        // Vérifications
        assertNotNull(updatedPatient);
        assertEquals(patientDTO.getNomcomplet(), updatedPatient.getNomcomplet());
        verify(patientRepository, times(1)).findById(1);
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    void testUpdatePatientNotFound() {
        // Simuler le comportement du repository
        when(patientRepository.findById(1)).thenReturn(Optional.empty());

        // Appeler la méthode et vérifier l'exception
        Exception exception = assertThrows(RuntimeException.class, () -> {
            patientService.updatePatient(1, patientDTO);
        });

        // Vérification du message d'erreur
        assertEquals("Patient not found", exception.getMessage());
        verify(patientRepository, times(1)).findById(1);
    }

    @Test
    void testDeletePatient() {
        // Simuler le comportement du repository
        when(patientRepository.findById(1)).thenReturn(Optional.of(patient));

        // Appeler la méthode à tester
        patientService.deletePatient(1);

        // Vérifications
        verify(patientRepository, times(1)).delete(patient);
    }

    @Test
    void testDeletePatientNotFound() {
        // Simuler le comportement du repository
        when(patientRepository.findById(1)).thenReturn(Optional.empty());

        // Appeler la méthode et vérifier l'exception
        Exception exception = assertThrows(RuntimeException.class, () -> {
            patientService.deletePatient(1);
        });

        // Vérification du message d'erreur
        assertEquals("Patient not found", exception.getMessage());
        verify(patientRepository, times(1)).findById(1);
    }
}

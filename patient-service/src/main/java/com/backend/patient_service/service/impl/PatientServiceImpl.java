package com.backend.patient_service.service.impl;

import com.backend.patient_service.dto.PatientDTO;
import com.backend.patient_service.entity.Patient;
import com.backend.patient_service.mapper.PatientMapper;
import com.backend.patient_service.repository.PatientRepository;
import com.backend.patient_service.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(PatientMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PatientDTO getPatientById(int id) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
        return PatientMapper.toDTO(patient);
    }

    @Override
    public PatientDTO createPatient(PatientDTO patientDTO) {
        Patient patient = PatientMapper.toEntity(patientDTO);
        patient = patientRepository.save(patient);
        return PatientMapper.toDTO(patient);
    }

    @Override
    public PatientDTO updatePatient(int id, PatientDTO patientDTO) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
        // Mettez à jour l'entité avec les nouvelles valeurs
        patient.setNomcomplet(patientDTO.getNomcomplet());
        patient.setDateNaissance(patientDTO.getDateNaissance());
        patient.setLieuDeNaissance(patientDTO.getLieuDeNaissance());
        patient.setSexe(patientDTO.getSexe());
        patient.setTypePieceIdentite(patientDTO.getTypePieceIdentite());
        patient.setNumPieceIdentite(patientDTO.getNumPieceIdentite());
        patient.setAdresse(patientDTO.getAdresse());
        patient.setNumTel(patientDTO.getNumTel());
        patient.setEmail(patientDTO.getEmail());
        patient.setVisible_pour(patientDTO.getVisible_pour());

        patient = patientRepository.save(patient);
        return PatientMapper.toDTO(patient);
    }

    @Override
    public void deletePatient(int id) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
        patientRepository.delete(patient);
    }
}

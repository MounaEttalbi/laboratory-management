package com.backend.patient_service.mapper;

import com.backend.patient_service.dto.PatientDTO;
import com.backend.patient_service.entity.Patient;

public class PatientMapper {
    public static PatientDTO toDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setIdPatient(patient.getIdPatient());
        dto.setNomcomplet(patient.getNomcomplet());
        dto.setDateNaissance(patient.getDateNaissance());
        dto.setLieuDeNaissance(patient.getLieuDeNaissance());
        dto.setSexe(patient.getSexe());
        dto.setTypePieceIdentite(patient.getTypePieceIdentite());
        dto.setNumPieceIdentite(patient.getNumPieceIdentite());
        dto.setAdresse(patient.getAdresse());
        dto.setNumTel(patient.getNumTel());
        dto.setEmail(patient.getEmail());
        dto.setVisible_pour(patient.getVisible_pour());
        return dto;
    }

    public static Patient toEntity(PatientDTO dto) {
        Patient patient = new Patient();
        patient.setIdPatient(dto.getIdPatient());
        patient.setNomcomplet(dto.getNomcomplet());
        patient.setDateNaissance(dto.getDateNaissance());
        patient.setLieuDeNaissance(dto.getLieuDeNaissance());
        patient.setSexe(dto.getSexe());
        patient.setTypePieceIdentite(dto.getTypePieceIdentite());
        patient.setNumPieceIdentite(dto.getNumPieceIdentite());
        patient.setAdresse(dto.getAdresse());
        patient.setNumTel(dto.getNumTel());
        patient.setEmail(dto.getEmail());
        patient.setVisible_pour(dto.getVisible_pour());
        return patient;
    }
}

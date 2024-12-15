package com.backend.dossier_service.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.backend.dossier_service.model.Patient;

@FeignClient(name="service-patient")
public interface PatientRestClient {
	@GetMapping("/patients")
    List<Patient> findAllPatients();
}
package com.backend.dossier_service.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.backend.dossier_service.model.Utilisateur;


@FeignClient(name="service-utilisateur")
public interface UtilisateurRestClient {
	@GetMapping("/users")
    List<Utilisateur> findAllUsers();
}
package com.backend.contact_service.client;


import com.backend.contact_service.model.Adresse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
@FeignClient(name = "adresse-service")
public interface AdresseRestClient {

    @GetMapping("/adresse/{id}")
    @CircuitBreaker(name="AdresseService", fallbackMethod="getDefaultAdresse")
    Adresse getAdresseById(@PathVariable Long id);

    @GetMapping("/adresse/all")
    @CircuitBreaker(name="adresseService", fallbackMethod="getDefaultAllAdresses")
    List<Adresse> allLadresses();

    // Méthode de secours corrigée : elle doit accepter les mêmes paramètres
    default Adresse getDefaultAdresse(Long id, Throwable exception) {
        Adresse adresse = new Adresse();
        adresse.setId(id);
        adresse.setCodePostal("Not Available");
        adresse.setCommune("Not Available");
        adresse.setVille("Not Available");
        adresse.setNomVoie("Not Available");
        adresse.setNumVoie("Not Available");
        return adresse;
    }

    default List<Adresse> getDefaultAllAdresses(Throwable exception) {
        return List.of(); // Retourne une liste vide si une erreur se produit
    }
}


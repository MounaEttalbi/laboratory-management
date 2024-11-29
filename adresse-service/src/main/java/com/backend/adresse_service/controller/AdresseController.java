package com.backend.adresse_service.controller;

import com.backend.adresse_service.dto.AdresseDTO;
import com.backend.adresse_service.entity.Adresse;
import com.backend.adresse_service.service.AdresseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/address")
public class AdresseController {

    private AdresseService adresseService;

    public AdresseController(AdresseService adresseService){ this.adresseService=adresseService;}

    // ALL
    @GetMapping("/all")
    public List<Adresse> getAllAdresses(){
        return adresseService.getAllAdresse();
    }

    //getById
    @GetMapping("/{id}")
    public Optional<Adresse> getAdresseById(@PathVariable Long id){
        return adresseService.getAdresseById(id);
    }

    //ADD
    @PostMapping("/addAdresse")
    public ResponseEntity<Adresse> addAdresse(@RequestBody AdresseDTO adresseDTO) {
        Adresse adresse = adresseService.addAdresse(adresseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(adresse);
    }

    // UPDATE
    @PutMapping("/updateAdresse/{id}")
    public ResponseEntity<Adresse> updateAdresse(@PathVariable Long id, @RequestBody AdresseDTO updatedAdresseDTO) {
        try {
            Adresse updatedAdresse = adresseService.updateAdresse(id, updatedAdresseDTO);
            return ResponseEntity.ok(updatedAdresse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // DELETE
    @DeleteMapping("/deleteAdresse/{id}")
    public ResponseEntity<Void> deleteAdresse(@PathVariable Long id) {
        try {
            adresseService.deleteAdresse(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}

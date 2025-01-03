package com.ProjetLabo.Epreuve_Service.Controllers;


import com.ProjetLabo.Epreuve_Service.Entities.Epreuve;
import com.ProjetLabo.Epreuve_Service.Repositories.EpreuveRepository;
import com.ProjetLabo.Epreuve_Service.Services.EpreuveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/epreuves")
public class EpreuveController {

    @Autowired
    private EpreuveService epreuveService;
    private EpreuveRepository epreuveRepository;

    public EpreuveController(EpreuveRepository epreuveRepository){
        this.epreuveRepository = epreuveRepository;
    }

    @PostMapping("/addEpreuve")
    public ResponseEntity<Epreuve> addEpreuve(@RequestBody Epreuve epreuve){
        Epreuve newEpreuve = epreuveService.addEpreuve(epreuve);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEpreuve);
    }
    @GetMapping("/listEpreuvesByAnalyse/{idAnalyse}")
    public List<Epreuve> getEpreuvesByIdAnalyse(@PathVariable Long idAnalyse) {
        return epreuveService.getEpreuvesByIdAnalyse(idAnalyse);
    }

    @GetMapping
    public List<Epreuve> EpreuveList(){
        return epreuveRepository.findAll();
    }

    @GetMapping("/{id}")
    public Epreuve findEpreuve(Long id){
        return epreuveRepository.findById(id).get();
    }
}


package com.ProjetLabo.Epreuve_Service.Repositories;

import com.ProjetLabo.Epreuve_Service.Entities.Epreuve;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EpreuveRepository extends JpaRepository<Epreuve, Long> {
    List<Epreuve> findByIdAnalyse(Long idAnalyse);
}

package com.backend.TestAnalyse.repository;
import com.backend.TestAnalyse.entity.TestAnalyse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestAnalyseRepository extends JpaRepository<TestAnalyse, Long> {

    // Trouver tous les tests associés à une analyse spécifique
    List<TestAnalyse> findByFkIdAnalyse(int fkIdAnalyse);

    // Rechercher des tests par nom
    List<TestAnalyse> findByNomTestContaining(String nomTest);
}

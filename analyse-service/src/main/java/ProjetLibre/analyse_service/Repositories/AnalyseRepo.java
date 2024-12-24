package ProjetLibre.analyse_service.Repositories;

import ProjetLibre.analyse_service.Entities.AnalyseTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnalyseRepo extends JpaRepository<AnalyseTable, Long> {

    // Requête pour trouver toutes les analyses par nom
    @Query("SELECT a FROM AnalyseTable a WHERE a.nom LIKE %:nom%")
    public List<AnalyseTable> findAllByNom(String nom);
    @Query("SELECT a FROM AnalyseTable a WHERE a.type = :type")
    public List<AnalyseTable> findAllByType(@Param("type") String type);

}

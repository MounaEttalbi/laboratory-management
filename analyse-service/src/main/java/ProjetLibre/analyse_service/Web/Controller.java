package ProjetLibre.analyse_service.Web;

import ProjetLibre.analyse_service.Classes.Laboratoire;
import ProjetLibre.analyse_service.Clients.LaboratoireClient;

import ProjetLibre.analyse_service.Daos.AnalyseDto;
import ProjetLibre.analyse_service.Entities.AnalyseTable;
import ProjetLibre.analyse_service.Repositories.AnalyseRepo;
import ProjetLibre.analyse_service.Services.AnalyseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/analyses")
public class Controller {

    @Autowired
    private AnalyseRepo analyseRepo;
    @Autowired
    LaboratoireClient laboratoireClient;
    @Autowired
    AnalyseService analyseService;
    @PostMapping("/addAnalyse")
    public void addLabo(@RequestBody AnalyseDto dao){
        analyseService.save(dao);
    }
    @GetMapping("/listAnalyses")
    public List<AnalyseDto> listAnalyses(){
        return analyseService.findAll();
    }
    @GetMapping("/{id}")
    public AnalyseTable getAnalyseById(@PathVariable(name="id") Long id){
        AnalyseTable analyse=analyseRepo.findById(id).get();
        Laboratoire l=laboratoireClient.getLaboById(analyse.getIdLaboratoire());
       analyse.setLabo(l);

        return analyse;
    }
    @GetMapping("/getByNom/{nom}")
    public List<AnalyseDto> getByNom(@PathVariable(name = "nom") String nom){
        return analyseService.findAllByNom(nom);
    }
    @GetMapping("/getByType/{type}")
    public List<AnalyseDto> getByType(@PathVariable(name = "type") String type){
        return analyseService.findAllByType(type);
    }
    @PostMapping("/updateAnalyse")
    public void  updateAnalyse(@RequestBody AnalyseDto analyse){
           analyseService.updateAnalyse(analyse);
    }
    @DeleteMapping("/deleteAnalyse/{id}")
    public void deleteAnalyse(@PathVariable(name = "id") Long id){
        analyseService.deletAnalyse(id);
    }

}

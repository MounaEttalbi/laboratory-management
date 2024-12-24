package ProjetLibre.analyse_service.Mappers;

import ProjetLibre.analyse_service.Classes.Laboratoire;
import ProjetLibre.analyse_service.Clients.LaboratoireClient;
import ProjetLibre.analyse_service.Daos.AnalyseDto;
import ProjetLibre.analyse_service.Entities.AnalyseTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AnalyseMapper {
    @Autowired
    LaboratoireClient laboratoireClient;

    public AnalyseTable fromDtoToAnalyse(AnalyseDto dto){

        AnalyseTable analyseTable=new AnalyseTable();
        analyseTable.setNom(dto.getNom());
        analyseTable.setDescription(dto.getDescription());
        analyseTable.setType(dto.getType());
        return  analyseTable;
    }
    public AnalyseDto fromAnalyseToDto(AnalyseTable a){
        Laboratoire l=laboratoireClient.getLaboById(a.getIdLaboratoire());
        AnalyseDto dto=new AnalyseDto();
        dto.setId(a.getId());
        dto.setNom(a.getNom());
        dto.setDescription(a.getDescription());
        dto.setType(a.getType());
        dto.setLaboratoire(l.getNom());
        return  dto;
    }


    }

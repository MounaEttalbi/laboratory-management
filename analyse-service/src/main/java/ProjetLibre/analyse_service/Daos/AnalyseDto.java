package ProjetLibre.analyse_service.Daos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalyseDto {

    private Long id;
  //  private String laboratoire;// ID du laboratoire, pas une relation directe

    // ID du laboratoire, pas une relation directe

private String username;
    private String nom;
    private String description;
    private String type;


}

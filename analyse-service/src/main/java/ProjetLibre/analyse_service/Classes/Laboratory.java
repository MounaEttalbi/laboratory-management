package ProjetLibre.analyse_service.Classes;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;


@Getter
@Setter
public class Laboratory {

    private long id;

    private String nom;

    private String logo;

    private Long nrc;
    private Statut statut;
    private Date dateActivation;
}

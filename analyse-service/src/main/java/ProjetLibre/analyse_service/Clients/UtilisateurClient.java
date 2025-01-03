package ProjetLibre.analyse_service.Clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@FeignClient(name = "SERVICE-UTILISATEUR")
public interface UtilisateurClient {
    @GetMapping("/users/getLaboIdByUserName/{username}")
    Long getLaboByUserName(@PathVariable(name = "username") String username);
}


package com.app.backend.mapper;


import com.app.backend.dtos.InscriptionUtilisateur;
import com.app.backend.dtos.UtilisateurDto;
import com.app.backend.entities.Login;
import com.app.backend.entities.User;
import com.app.backend.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MapperService {
    //  @Autowired
    //  private PasswordEncoder passwordEncoder;
    @Autowired
    LoginRepository loginRepository;

    public UtilisateurDto UtilisateurDtoToUtilisateur(User utilisateur){
        UtilisateurDto utilisateurDto = new UtilisateurDto();

        // Mappage des champs un à un
        utilisateurDto.setNomComplet(utilisateur.getNomComplet());
        utilisateurDto.setEmail(utilisateur.getLogin().getEmail());
        utilisateurDto.setNumTel(utilisateur.getNumTel());
        utilisateurDto.setProfession(utilisateur.getLogin().getRole());

        return utilisateurDto;
    }
    public Login convertInscriptionUtilisateurToLogin(InscriptionUtilisateur inscription){
        Login login=new Login();
        login.setEmail(inscription.getEmail());
        //  login.setMdp(passwordEncoder.encode(inscription.getMdp()));
        login.setMdp(inscription.getMdp());
        login.setRole(inscription.getRole());
        return  login;
    }
    public User convertInscriptinToUtilisateur(InscriptionUtilisateur inscription){
        User utilisateur=new User();
        utilisateur.setNomComplet(inscription.getNomComplet());
        utilisateur.setNumTel(inscription.getNumTel());
        utilisateur.setCin(inscription.getCin());
        utilisateur.setLogin(loginRepository.findLoginByEmail(inscription.getEmail()));
        utilisateur.setSignature(inscription.getSignature());

        return utilisateur;
    }


}
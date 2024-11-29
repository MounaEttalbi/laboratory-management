package com.app.backend.service;

import com.app.backend.dtos.InscriptionUtilisateur;
import com.app.backend.dtos.UtilisateurDto;

import java.util.List;

public interface UserService {

    public List<UtilisateurDto> getAllUtilisateurs();
    void ajouterUtilisateur(InscriptionUtilisateur inscriptionUtilisateur);

}

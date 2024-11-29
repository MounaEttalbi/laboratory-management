package com.app.backend.service.impl;

import com.app.backend.dtos.InscriptionUtilisateur;
import com.app.backend.dtos.UtilisateurDto;
import com.app.backend.entities.Login;
import com.app.backend.entities.User;
import com.app.backend.mapper.MapperService;
import com.app.backend.repository.LoginRepository;
import com.app.backend.repository.UserRepository;
import com.app.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    MapperService mapperService;
    @Autowired
    UserRepository utilisateurRepository;
    @Autowired
    LoginRepository loginRepository;

    @Override
    public List<UtilisateurDto> getAllUtilisateurs() {
        return utilisateurRepository.findAll().stream()
                .map(utilisateur -> mapperService.UtilisateurDtoToUtilisateur(utilisateur)) // Utilisez le mapper manuel pour chaque utilisateur
                .collect(Collectors.toList());
    }
    @Override
    public void ajouterUtilisateur(InscriptionUtilisateur inscriptionUtilisateur){

        Login login= mapperService.convertInscriptionUtilisateurToLogin(inscriptionUtilisateur);
        loginRepository.save(login);

        User utilisateur=mapperService.convertInscriptinToUtilisateur(inscriptionUtilisateur);
        utilisateurRepository.save(utilisateur);
    }
}

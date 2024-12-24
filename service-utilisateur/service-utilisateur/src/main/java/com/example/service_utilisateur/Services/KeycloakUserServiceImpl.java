package com.example.service_utilisateur.Services;


import com.example.service_utilisateur.dtos.*;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.*;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class KeycloakUserServiceImpl implements KeycloakUserService{

    @Value("${keycloak.realm}")
    private String realm;
    private Keycloak keycloak;

    public KeycloakUserServiceImpl(Keycloak keycloak) {
        this.keycloak = keycloak;
    }
    @Override
    public List<UserRepresentation> getAllUsers() {
        return getUsersResource().list(); // Récupère tous les utilisateurs de Keycloak
    }

    @Override
    public UserRegistrationRecord createUser(UserRegistrationRecord userRegistrationRecord) {

        UserRepresentation user=new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(userRegistrationRecord.username());
        user.setEmail(userRegistrationRecord.email());
        user.setFirstName(userRegistrationRecord.firstName());
        user.setLastName(userRegistrationRecord.lastName());
        user.setEmailVerified(false);

        CredentialRepresentation credentialRepresentation=new CredentialRepresentation();
        credentialRepresentation.setValue(userRegistrationRecord.password());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        List<CredentialRepresentation> list = new ArrayList<>();
        list.add(credentialRepresentation);
        user.setCredentials(list);

        UsersResource usersResource = getUsersResource();

        Response response = usersResource.create(user);

        if(Objects.equals(201,response.getStatus())){

            List<UserRepresentation> representationList = usersResource.searchByUsername(userRegistrationRecord.username(), true);
            if(!CollectionUtils.isEmpty(representationList)){
                UserRepresentation userRepresentation1 = representationList.stream().filter(userRepresentation -> Objects.equals(false, userRepresentation.isEmailVerified())).findFirst().orElse(null);
                assert userRepresentation1 != null;
                emailVerification(userRepresentation1.getId());
            }
            return  userRegistrationRecord;
        }

//        response.readEntity()

        return null;
    }

    private UsersResource getUsersResource() {
        RealmResource realm1 = keycloak.realm(realm);
        return realm1.users();
    }

    @Override
    public UserRepresentation getUserById(String userId) {


        return  getUsersResource().get(userId).toRepresentation();
    }

    @Override
    public void deleteUserById(String userId) {

        getUsersResource().delete(userId);
    }


    @Override
    public void emailVerification(String userId){

        UsersResource usersResource = getUsersResource();
        usersResource.get(userId).sendVerifyEmail();
    }

    public UserResource getUserResource(String userId){
        UsersResource usersResource = getUsersResource();
        return usersResource.get(userId);
    }

    @Override
    public void updatePassword(String userId) {

        UserResource userResource = getUserResource(userId);
        List<String> actions= new ArrayList<>();
        actions.add("UPDATE_PASSWORD");
        userResource.executeActionsEmail(actions);

    }

    @Override
    public void updatePassword(ResetPassword resetPassword, String userId) {


        UserResource userResource = getUserResource(userId);
        CredentialRepresentation credentialRepresentation=new CredentialRepresentation();
        credentialRepresentation.setValue(resetPassword.password());
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setTemporary(false);
        userResource.resetPassword(credentialRepresentation);
    }
    
@Override
public UserRegistrationRecord updateUserByUsername(String username, UserRegistrationRecord userRegistrationRecord) {
        // Chercher l'utilisateur par son nom d'utilisateur
        List<UserRepresentation> users = keycloak.realm("ProjetLibre-realm").users().search(username, true);

        // Si l'utilisateur n'existe pas, retourner une exception ou un message d'erreur
        if (users.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec ce nom d'utilisateur");
        }

        // Récupérer le premier utilisateur trouvé (si plusieurs utilisateurs ont le même username)
        UserRepresentation userRepresentation = users.get(0);

        // Mettre à jour les informations de l'utilisateur
        userRepresentation.setUsername(userRegistrationRecord.username());
        userRepresentation.setEmail(userRegistrationRecord.email());
        userRepresentation.setFirstName(userRegistrationRecord.firstName());
        userRepresentation.setLastName(userRegistrationRecord.lastName());

        // Appliquer les modifications dans Keycloak
        keycloak.realm("ProjetLibre-realm").users().get(userRepresentation.getId()).update(userRepresentation);

        // Retourner le nouvel utilisateur
        return new UserRegistrationRecord(
                userRepresentation.getUsername(),
                userRepresentation.getEmail(),
                userRepresentation.getFirstName(),
                userRepresentation.getLastName(),
                "" // Pas de gestion du mot de passe ici
        );
    }
}

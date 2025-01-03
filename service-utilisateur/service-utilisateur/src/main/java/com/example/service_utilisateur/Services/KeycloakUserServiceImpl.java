package com.example.service_utilisateur.Services;


import com.example.service_utilisateur.dtos.*;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.*;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Service
@Slf4j
public class KeycloakUserServiceImpl implements KeycloakUserService {

    @Value("${keycloak.realm}")
    private String realm;
    private Keycloak keycloak;
    @Autowired
    private RoleService roleService;

    public KeycloakUserServiceImpl(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    @Override
    public List<UserRepresentation> getAllUsers() {
        return getUsersResource().list(); // Récupère tous les utilisateurs de Keycloak
    }

    @Override
    public UserRegistrationRecord createUser(UserRegistrationRecord userRegistrationRecord) {
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(userRegistrationRecord.username());
        user.setEmail(userRegistrationRecord.email());
        user.setFirstName(userRegistrationRecord.firstName());
        user.setLastName(userRegistrationRecord.lastName());
        user.setEmailVerified(false);

        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setValue(userRegistrationRecord.password());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        List<CredentialRepresentation> list = new ArrayList<>();
        list.add(credentialRepresentation);
        user.setCredentials(list);

        // Ajouter idLabo en tant qu'attribut utilisateur
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("idLabo", List.of(String.valueOf(12)));
        user.setAttributes(attributes);

        UsersResource usersResource = getUsersResource();
        Response response = usersResource.create(user);

        if (Objects.equals(201, response.getStatus())) {
            List<UserRepresentation> representationList = usersResource.searchByUsername(userRegistrationRecord.username(), true);
            if (!CollectionUtils.isEmpty(representationList)) {
                UserRepresentation createdUser = representationList.get(0);

                // Assigner un rôle à l'utilisateur
                roleService.assignRole(createdUser.getId(), userRegistrationRecord.role());

                // Vérification de l'email
                emailVerification(createdUser.getId());
            }
            return userRegistrationRecord;
        }
        return null;
    }



    private UsersResource getUsersResource() {
        RealmResource realm1 = keycloak.realm(realm);
        return realm1.users();
    }

    @Override
    public UserRepresentation getUserById(String userId) {


        return getUsersResource().get(userId).toRepresentation();
    }

    @Override
    public void deleteUserById(String userId) {

        getUsersResource().delete(userId);
    }


    @Override
    public void emailVerification(String userId) {

        UsersResource usersResource = getUsersResource();
        usersResource.get(userId).sendVerifyEmail();
    }

    public UserResource getUserResource(String userId) {
        UsersResource usersResource = getUsersResource();
        return usersResource.get(userId);
    }

    @Override
    public void updatePassword(String userId) {

        UserResource userResource = getUserResource(userId);
        List<String> actions = new ArrayList<>();
        actions.add("UPDATE_PASSWORD");
        userResource.executeActionsEmail(actions);

    }

    @Override
    public void updatePassword(ResetPassword resetPassword, String userId) {


        UserResource userResource = getUserResource(userId);
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setValue(resetPassword.password());
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setTemporary(false);
        userResource.resetPassword(credentialRepresentation);
    }
    @Override
    public UserRegistrationRecord updateUserByUsername(String username, UserRegistrationRecord userRegistrationRecord) {
        // Chercher l'utilisateur par son nom d'utilisateur
        List<UserRepresentation> users = keycloak.realm(realm).users().search(username, true);

        // Si l'utilisateur n'existe pas, retourner une exception ou un message d'erreur
        if (users.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec ce nom d'utilisateur");
        }

        // Récupérer le premier utilisateur trouvé
        UserRepresentation userRepresentation = users.get(0);

        // Mettre à jour les informations de l'utilisateur
        userRepresentation.setUsername(userRegistrationRecord.username());
        userRepresentation.setEmail(userRegistrationRecord.email());
        userRepresentation.setFirstName(userRegistrationRecord.firstName());
        userRepresentation.setLastName(userRegistrationRecord.lastName());

        // Ajouter idLabo en tant qu'attribut
        Map<String, List<String>> attributes = userRepresentation.getAttributes();
        if (attributes == null) {
            attributes = new HashMap<>();
        }
        attributes.put("idLabo", List.of(String.valueOf(userRegistrationRecord.idLabo())));
        userRepresentation.setAttributes(attributes);

        // Appliquer les modifications dans Keycloak
        keycloak.realm(realm).users().get(userRepresentation.getId()).update(userRepresentation);

        return new UserRegistrationRecord(
                userRepresentation.getUsername(),
                userRepresentation.getEmail(),
                userRepresentation.getFirstName(),
                userRepresentation.getLastName(),
                "", // Mot de passe non retourné ici
                userRegistrationRecord.idLabo(),
                userRegistrationRecord.role()

        );
    }
    @Override
    public String getUserIdByUsername(String username) {
        List<UserRepresentation> users = keycloak.realm(realm).users().search(username, true);
        System.out.println("username  "+username);
        if (users.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec ce nom d'utilisateur");
        }

        return users.get(0).getId();
    }
    @Override
    public Long getLaboIdByUserName(String userId) {
        System.out.println("getLaboIdByUserNameé() :"+userId);
        userId=this.getUserIdByUsername(userId);
        System.out.println("username service : "+userId);
        try {
            // Récupérer l'utilisateur depuis Keycloak
            UserRepresentation user = keycloak.realm(realm)
                    .users()
                    .get(userId)
                    .toRepresentation();

            if (user != null && user.getAttributes() != null) {
                // Récupérer l'attribut "idLabo" et le convertir en Long
                String idLaboStr = user.getAttributes()
                        .getOrDefault("idLabo", List.of())
                        .stream()
                        .findFirst()
                        .orElse(null);

                if (idLaboStr != null) {
                    System.out.println("mn su idlab: "+Long.parseLong(idLaboStr));
                    return Long.parseLong(idLaboStr); // Convertir en Long
                }
            }
        } catch (Exception e) {
            System.out.println("catch: ");
            e.printStackTrace(); // Gérer les exceptions
        }
        return null; // Retourner null si non trouvé ou en cas d'erreur
    }

}
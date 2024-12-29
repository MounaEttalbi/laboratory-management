package com.example.service_utilisateur.Services;



import com.example.service_utilisateur.dtos.Role;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements  RoleService{

    @Value("${keycloak.realm}")
    private String realm;

    private final Keycloak keycloak;

   // private final KeycloakUserService keycloakUserService;

    @Override
    public void assignRole(String userId, String roleName) {
        // Vérifier si l'utilisateur existe
        UserResource userResource = keycloak.realm(realm).users().get(userId);
        if (userResource == null) {
            throw new RuntimeException("User not found");
        }

        // Vérifier si le rôle existe
        RolesResource rolesResource = keycloak.realm(realm).roles();
        RoleRepresentation roleRepresentation = rolesResource.get(roleName).toRepresentation();
        if (roleRepresentation == null) {
            throw new RuntimeException("Role not found");
        }

        // Assigner le rôle à l'utilisateur sans vérifier son e-mail
        userResource.roles().realmLevel().add(Collections.singletonList(roleRepresentation));
    }


    private RolesResource getRolesResource(){
        return  keycloak.realm(realm).roles();
    }
    @Override
    public String getUserRole(String userId) {
        // Récupérer tous les rôles attribués à l'utilisateur
        List<String> roles = keycloak.realm(realm)
                .users()
                .get(userId)
                .roles()
                .realmLevel()
                .listEffective()
                .stream()
                .map(role -> role.getName())
                .toList();

        // Rechercher un rôle correspondant dans l'énumération Role
        return roles.stream()
                .filter(role -> {
                    try {
                        Role.valueOf(role); // Vérifie si le rôle est défini dans l'énumération
                        return true;
                    } catch (IllegalArgumentException e) {
                        return false;
                    }
                })
                .findFirst()
                .orElse(null); // Retourne null si aucun rôle n'est trouvé
    }


}


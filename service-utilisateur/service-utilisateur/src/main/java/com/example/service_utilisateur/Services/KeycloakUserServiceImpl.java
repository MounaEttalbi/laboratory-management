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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
@Service
@Slf4j
public class KeycloakUserServiceImpl implements KeycloakUserService {

    @Value("${keycloak.realm}")
    private String realm;

    private final Keycloak keycloak;

    @Autowired
    private RoleService roleService;

    public KeycloakUserServiceImpl(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    @Override
    public List<UserRepresentation> getAllUsers() {
        return getUsersResource().list();
    }

    @Override
    public UserRegistrationRecord createUser(UserRegistrationRecord userRegistrationRecord) {

        // Create a new user representation
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(userRegistrationRecord.username());
        user.setEmail(userRegistrationRecord.email());
        user.setFirstName(userRegistrationRecord.firstName());
        user.setLastName(userRegistrationRecord.lastName());
        user.setEmailVerified(false);

        // Set user credentials
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setValue(userRegistrationRecord.password());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        List<CredentialRepresentation> credentials = new ArrayList<>();
        credentials.add(credentialRepresentation);
        user.setCredentials(credentials);

        UsersResource usersResource = getUsersResource();

        // Create the user in Keycloak
        Response response = usersResource.create(user);

        if (response.getStatus() == 201) {
            // Retrieve the created user
            List<UserRepresentation> representationList = usersResource.searchByUsername(userRegistrationRecord.username(), true);
            if (!CollectionUtils.isEmpty(representationList)) {
                UserRepresentation createdUser = representationList.get(0);

                // Assign role to the created user
                roleService.assignRole(createdUser.getId(), userRegistrationRecord.role());
            }

            return userRegistrationRecord;
        }

        return null;
    }

    private UsersResource getUsersResource() {
        return keycloak.realm(realm).users();
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
        getUsersResource().get(userId).sendVerifyEmail();
    }

    public UserResource getUserResource(String userId) {
        return getUsersResource().get(userId);
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
        // Fetch user by username
        List<UserRepresentation> users = keycloak.realm(realm).users().search(username, true);

        if (users.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec ce nom d'utilisateur");
        }

        UserRepresentation userRepresentation = users.get(0);

        // Update user details
        userRepresentation.setUsername(userRegistrationRecord.username());
        userRepresentation.setEmail(userRegistrationRecord.email());
        userRepresentation.setFirstName(userRegistrationRecord.firstName());
        userRepresentation.setLastName(userRegistrationRecord.lastName());

        keycloak.realm(realm).users().get(userRepresentation.getId()).update(userRepresentation);

        // Update role
        roleService.assignRole(userRepresentation.getId(), userRegistrationRecord.role());

        return new UserRegistrationRecord(
                userRepresentation.getUsername(),
                userRepresentation.getEmail(),
                userRepresentation.getFirstName(),
                userRepresentation.getLastName(),
                "", // Password management not included here
                userRegistrationRecord.role() // Pass the updated role
        );
    }

    @Override
    public String getUserIdByUsername(String username) {
        List<UserRepresentation> users = keycloak.realm(realm).users().search(username, true);

        if (users.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec ce nom d'utilisateur");
        }

        return users.get(0).getId();
    }
}

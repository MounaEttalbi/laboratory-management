package com.example.service_utilisateur.Services;



import com.example.service_utilisateur.dtos.*;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

public interface KeycloakUserService {

    List<UserRepresentation> getAllUsers();

    UserRegistrationRecord createUser(UserRegistrationRecord userRegistrationRecord);
    UserRepresentation getUserById(String userId);
    void deleteUserById(String userId);
    void emailVerification(String userId);
    UserResource getUserResource(String userId);
    void updatePassword(String userId);
    void updatePassword(ResetPassword resetPassword, String userId);

    UserRegistrationRecord updateUserByUsername(String username, UserRegistrationRecord userRegistrationRecord);

    String getUserIdByUsername(String username);
}


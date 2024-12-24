package com.example.service_utilisateur.controllers;



import org.keycloak.representations.idm.UserRepresentation;

import com.example.service_utilisateur.Services.KeycloakUserService;
import com.example.service_utilisateur.dtos.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class KeycloakUserApi {


    private final KeycloakUserService keycloakUserService;


    @PostMapping
    public UserRegistrationRecord createUser(@RequestBody UserRegistrationRecord userRegistrationRecord) {

        return keycloakUserService.createUser(userRegistrationRecord);
    }

    @GetMapping
    public UserRepresentation getUser(Principal principal) {

        return keycloakUserService.getUserById(principal.getName());
    }
    @GetMapping("/all")
    public List<UserRegistrationRecord> getAllUsers() {

        List<UserRepresentation> userRepresentations =keycloakUserService.getAllUsers();;

        return userRepresentations.stream()
                .map(user -> new UserRegistrationRecord(
                        user.getUsername(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getCredentials() != null && !user.getCredentials().isEmpty() ? user.getCredentials().get(0).getValue() : ""  // Exemple pour le mot de passe
                ))
                .collect(Collectors.toList());
    }

    @PutMapping("/update/{username}")
    public UserRegistrationRecord updateUserByUsername(@PathVariable String username, @RequestBody UserRegistrationRecord userRegistrationRecord) {
        return keycloakUserService.updateUserByUsername(username, userRegistrationRecord);
    }

    @DeleteMapping("/{username}")
    public void deleteUserById(@PathVariable String username) {
        keycloakUserService.deleteUserById(username);
    }


    @PutMapping("/{userId}/send-verify-email")
    public void sendVerificationEmail(@PathVariable String userId) {
        keycloakUserService.emailVerification(userId);
    }
    @PutMapping("/update-password")
    public void updatePassword(Principal principal) {
        keycloakUserService.updatePassword(principal.getName());
    }
    @PutMapping("/change-password")
    public void updatePassword(@RequestBody ResetPassword request, Principal principal) {
        keycloakUserService.updatePassword(request,principal.getName());
    }
}


package de.SWT.facs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import de.SWT.facs.entities.Role;
import de.SWT.facs.entities.User;
import de.SWT.facs.services.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    SessionRegistry sessionRegistry;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/{id}")
    public User getUser(@PathVariable("id") String id) {
        Optional<User> userOptional = userService.findUserById(id);
        if (!userOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found!");
        }

        return userOptional.get();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping(value = "/getAll")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    // Use with care
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}")
    public void deleteUser(@PathVariable("id") String id) {
        userService.deleteUser(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/getRoles")
    public List<String> getAllRoles() {
        return userService.findAllRoles().stream().map(Role::getSimpleName).collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(value = "/{id}")
    public String setRole(@PathVariable("id") final String id, @RequestParam("setRole") String role) {

        UserDetails actingUser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (actingUser.getUsername().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An admin cannot change his own role!");
        }

        if (!userService.setRoleForId(id, role)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found!");
        }

        Optional<Object> userWithRoleChangeOptional = sessionRegistry.getAllPrincipals().stream()
                .filter(user -> ((UserDetails) user).getUsername().equals(id)).findFirst();

        if (userWithRoleChangeOptional.isPresent()) {
            Object userWithRoleChange = userWithRoleChangeOptional.get();
            List<SessionInformation> sessions = sessionRegistry.getAllSessions(userWithRoleChange, false);

            for (SessionInformation session : sessions) {
                session.expireNow();
            }
        }

        return "{ \"message\": \"Success!\"}";
    }
}

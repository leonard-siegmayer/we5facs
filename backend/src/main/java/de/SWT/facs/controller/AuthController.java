package de.SWT.facs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import de.SWT.facs.entities.User;
import de.SWT.facs.services.UserService;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@RestController
@RequestMapping(value = "auth")
@CrossOrigin
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Login failed!");
        }

        return ResponseEntity.ok("{\"message\": \"Logged in.\"}");
    }

    @GetMapping(value = "/whoami")
    public User whoami() {
        Authentication userDetails = SecurityContextHolder.getContext().getAuthentication();

        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authenticated!");
        }

        String id = userDetails.getName();
        Optional<User> user = userService.findUserById(id);

        if (!user.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");
        }
        
        return user.get();
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        LocalDateTime expirationDate = LocalDateTime.now(ZoneOffset.UTC).minusDays(1);
        session.setAttribute("Expires", expirationDate.toString());
        session.invalidate();
        return ResponseEntity.ok("{ \"message\": \"Logged out.\"}");
    }
}

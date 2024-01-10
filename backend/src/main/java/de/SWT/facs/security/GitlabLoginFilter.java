package de.SWT.facs.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import de.SWT.facs.entities.Role;
import de.SWT.facs.entities.User;
import de.SWT.facs.entities.reqres.AuthenticationCodeResponse;
import de.SWT.facs.entities.reqres.UserinfoResponse;
import de.SWT.facs.services.AuthService;
import de.SWT.facs.services.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class GitlabLoginFilter extends OncePerRequestFilter {

    // TODO: refactor this variable and its occurence to the application.properties file
    private final String codeParam = "code";

    // TODO: refactor this variable and its occurence to the application.properties file
    private final String redirectUriParam = "redirect_uri";

    private String frontendOrigin;

    private String loginEndpoint;

    private AuthService authService;
    private UserService userService;

    public GitlabLoginFilter(String frontendOrigin, String loginEndpoint) {
        this.frontendOrigin = frontendOrigin;
        this.loginEndpoint = loginEndpoint;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (loginEndpoint.equals(request.getRequestURI()) && "POST".equalsIgnoreCase(request.getMethod())) {

            String code = request.getParameter(codeParam);
            String redirectUri = request.getParameter(redirectUriParam);

            try {
                AuthenticationCodeResponse authenticationCodeResponse = authService.requestTokens(code, redirectUri);
                UserinfoResponse userinfoResponse = authService
                        .requestUserInformationForAccessToken(authenticationCodeResponse.accessToken);
                String sub = authService.getSubFromOpenIdToken(authenticationCodeResponse.idToken);

                Optional<User> optionalUser = userService.findUserById(sub);

                User user = null;
                if (optionalUser.isPresent()) {
                    user = optionalUser.get();
                } else {
                    // ROLE_REPORTER as default role
                    user = new User();
                    user.setId(sub);
                    if (userService.adminExists()) {
                        user.setRole(Role.ROLE_REPORTER);
                    } else {
                        user.setRole(Role.ROLE_ADMIN);
                    }
                }
                user.setName(userinfoResponse.name);
                user.setEmail(userinfoResponse.email);
                user.setProfilePicture(userinfoResponse.pictureUrl);
                userService.saveUser(user);

                UserDetails userDetails = userService.loadUserByUsername(sub);

                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, "",
                        userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(token);

            } catch (Exception e) {
                throw new ServletException("Exception during login process", e);
            }

        }

        // Manual CORS setup for allowing the frontend to retreive a session ID.
        // We didn't manage to solve it inside the framework.
        response.setHeader("Access-Control-Allow-Origin", frontendOrigin);
        response.setHeader("Access-Control-Allow-Credentials", "true");

        filterChain.doFilter(request, response);

    }

    public void setAuthService(AuthService authService) {
        this.authService = authService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}

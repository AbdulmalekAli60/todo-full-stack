package net.todo.todo.service.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import net.todo.todo.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import net.todo.todo.security.*;
import net.todo.todo.repository.*;
import net.todo.todo.dto.*;
import net.todo.todo.entity.*;
import net.todo.todo.service.*;
import net.todo.todo.exception.*;
import net.todo.todo.dto.LoginDTO;
import net.todo.todo.dto.RegisterDTO;
import net.todo.todo.entity.Roles;
import net.todo.todo.entity.User;
import net.todo.todo.exception.TodoAPIException;
import net.todo.todo.repository.RolesRepository;
import net.todo.todo.repository.UserRepository;
import net.todo.todo.dto.JwtAuthResponseDTO;

import javax.management.relation.Role;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RolesRepository rolesRepository;
    private PasswordEncoder passwordEncoder; // encode password before saving in DB
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDTO registerDTO) {
        System.out.println("Processing registration for: " + registerDTO.getUsername());
        //if username already exist in DB
        if(userRepository.existsByUsername(registerDTO.getUsername())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST,"Username already exist");
        }

        // if email already exist
        if(userRepository.existsByEmail(registerDTO.getEmail())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST,"Email already exist");
        }

        User user = new User();
        user.setName(registerDTO.getName());
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        Set<Roles> roles = new HashSet<>();
        Roles userSRoles = rolesRepository.findByName("ROLE_USER");
        roles.add(userSRoles);

        user.setRoles(roles);

        userRepository.save(user);

        return "User registered Successfully ";
    }

    @Override
    public JwtAuthResponseDTO login(LoginDTO loginDTO) {

      Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDTO.getUsernameOrEmail(),
                loginDTO.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);


       Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDTO.getUsernameOrEmail(),
               loginDTO.getUsernameOrEmail());

       String role = null;

       if(userOptional.isPresent()){
           User loggedInUser = userOptional.get();
          Optional<Roles> optionalRole = loggedInUser.getRoles().stream().findFirst();

          if(optionalRole.isPresent()){
              Roles userRole = optionalRole.get();

              role = userRole.getName();
          }
       }
        JwtAuthResponseDTO jwtAuthResponseDTO = new JwtAuthResponseDTO();
       jwtAuthResponseDTO.setRole(role);

       jwtAuthResponseDTO.setAccessToken(token);


        return jwtAuthResponseDTO;
    }
}

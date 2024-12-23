package net.todo.todo.controller;

import lombok.AllArgsConstructor;
import net.todo.todo.dto.LoginDTO;
import net.todo.todo.dto.RegisterDTO;
import net.todo.todo.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import net.todo.todo.dto.JwtAuthResponseDTO;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private AuthService authService;

    //register Api
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
        System.out.println("Received registration request: " + registerDTO);
      String response =  authService.register(registerDTO);

      return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //log in api
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDTO> login(@RequestBody LoginDTO loginDTO){

        JwtAuthResponseDTO jwtAuthResponseDTO = authService.login(loginDTO);

//        JwtAuthResponseDTO jwtAuthResponseDTO = new JwtAuthResponseDTO();
//        jwtAuthResponseDTO.setAccessToken(token);

       return  ResponseEntity.ok(jwtAuthResponseDTO);
    }
}

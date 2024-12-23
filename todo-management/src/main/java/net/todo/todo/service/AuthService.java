package net.todo.todo.service;

import net.todo.todo.dto.LoginDTO;
import net.todo.todo.dto.RegisterDTO;
import net.todo.todo.dto.JwtAuthResponseDTO;

public interface AuthService {

    String register(RegisterDTO registerDTO);

    JwtAuthResponseDTO  login(LoginDTO loginDTO);
}

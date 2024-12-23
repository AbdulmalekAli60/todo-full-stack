package net.todo.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class JwtAuthResponseDTO {

    private String accessToken;
    private String tokenType = "Bearer";
    private String role;

}

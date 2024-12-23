package net.todo.todo.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderImpl {
    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        System.out.println(passwordEncoder.encode("abdulmalek"));
        System.out.println(passwordEncoder.encode("admin"));
        System.out.println(passwordEncoder.encode("Afsd1423"));

    }
}

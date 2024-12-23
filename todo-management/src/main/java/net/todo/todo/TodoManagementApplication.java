package net.todo.todo;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TodoManagementApplication {



	@Bean // telling spring mvc container to manage this model mapper object "second step"
	public ModelMapper modelMapper() { // first step
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(TodoManagementApplication.class, args);
		System.out.println("============ success ===============");
	}
}

package net.todo.todo.repository;

import net.todo.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    // give us crud methods to use with the entity we passed
}

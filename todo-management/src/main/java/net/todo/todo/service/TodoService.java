package net.todo.todo.service;

import net.todo.todo.dto.TodoDTO;

import java.util.List;

public interface TodoService {

    TodoDTO addTodo(TodoDTO todoDTO);

    TodoDTO getTodo(Long id);

    List<TodoDTO> getAllTodos();

    TodoDTO updateTodo(TodoDTO todoDTO, Long id);

    void DeleteTodo(Long id);

    TodoDTO completeTodo(Long id);

//    TodoDTO inCompleteTodo(Long id);
}

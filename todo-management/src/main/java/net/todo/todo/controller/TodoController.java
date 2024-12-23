package net.todo.todo.controller;

import jakarta.annotation.security.PermitAll;
import lombok.AllArgsConstructor;
import net.todo.todo.dto.TodoDTO;
import net.todo.todo.entity.Todo;
import net.todo.todo.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/todos")
@CrossOrigin("*")
public class TodoController {

    private TodoService todoService;

    // add todo rest api
//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDTO> addTodo(@RequestBody TodoDTO todoDTO){

        TodoDTO savedTod = todoService.addTodo(todoDTO);


        return  new ResponseEntity<>(savedTod, HttpStatus.CREATED);
    }

    // get todo by id
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable("id") Long todoId){

      TodoDTO todoByIdDTO =  todoService.getTodo(todoId);

      return  ResponseEntity.ok(todoByIdDTO);

    }

    //get all todos
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<TodoDTO>> getAllTodos(){

        List<TodoDTO> alltodos = todoService.getAllTodos();

        return  ResponseEntity.ok(alltodos);
    }

    // update todo
//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<TodoDTO> updateTodo(@RequestBody TodoDTO todoDTO,@PathVariable("id") Long todoId){


        TodoDTO updatedTodoDTO = todoService.updateTodo(todoDTO,todoId);

        return ResponseEntity.ok(updatedTodoDTO);
    }

    //delete todo
//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long todoid){

        todoService.DeleteTodo(todoid);

        return ResponseEntity.ok("The todo with id:" + todoid +  " has been deleted");
    }

    //complete todo
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}")
    public ResponseEntity<TodoDTO> updateTodoStatus(@PathVariable("id") Long todoId){
       TodoDTO updatedTodo = todoService.completeTodo(todoId);

       return ResponseEntity.ok(updatedTodo);
    }

//    //incomplete api
//    @PatchMapping("{id}/incomplete")
//    public  ResponseEntity<TodoDTO> IncompleteTodo(@PathVariable("id") Long totId){
//       TodoDTO updatedTodo = todoService.inCompleteTodo(totId);
//
//       return ResponseEntity.ok(updatedTodo);
//    }
}

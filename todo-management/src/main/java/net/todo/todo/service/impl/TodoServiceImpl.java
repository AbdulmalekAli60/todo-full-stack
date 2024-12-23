package net.todo.todo.service.impl;

import lombok.AllArgsConstructor;
import net.todo.todo.dto.TodoDTO;
import net.todo.todo.entity.Todo;
import net.todo.todo.exception.resourseNotFound;
import net.todo.todo.repository.TodoRepository;
import net.todo.todo.service.TodoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {
    TodoRepository todoRepository;
    private ModelMapper modelMapper; // third step: inject this dependency

//    public TodoServiceImpl(TodoRepository todoRepository){
//        this.todoRepository = todoRepository;
//    }
    @Override
    public TodoDTO addTodo(TodoDTO todoDTO) {

        // convert TodoDTO into todo jpa entity
//        Todo todo = new Todo(); // entity
//        todo.setTitle(todoDTO.getTitle());
//        todo.setDescription(todoDTO.getDescription());
//        todo.setComplete(todoDTO.isComplete());

        Todo todo = modelMapper.map(todoDTO,Todo.class);

        // save todo entity in database
       Todo savedTodo = todoRepository.save(todo);

       /*
        convert saved Todo jpa entity object to Todo dto
        TodoDTO savedDto = new TodoDTO();
        savedDto.setId(savedTodo.getId());
        savedDto.setTitle(savedTodo.getTitle());
        savedDto.setDescription(savedTodo.getDescription());
        savedDto.setComplete(savedTodo.isComplete());
*/

        TodoDTO savedDto = modelMapper.map(savedTodo,TodoDTO.class);
//        System.out.println("The created todo data is ===========>:" + todoDTO.getTitle() );
        return savedDto;
    }


    @Override
    public TodoDTO getTodo(Long id) {

      Todo todo = todoRepository.findById(id)
              .orElseThrow(() ->  new resourseNotFound("There is no todo with this id" + id));

      TodoDTO retrievedTodoDTO = modelMapper.map(todo,TodoDTO.class);


        return retrievedTodoDTO;
    }

    @Override
    public List<TodoDTO> getAllTodos() {

        List<Todo> allTodos = todoRepository.findAll();

//        List<TodoDTO> allTodosDTO = modelMapper.map(List<allTodos>,TodoDTO.class);


        return allTodos.stream().map((alltodos) -> modelMapper.map(alltodos,TodoDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public TodoDTO updateTodo(TodoDTO todoDTO,Long id) {

        Todo retrivedTodo = todoRepository.findById(id)
                .orElseThrow(() ->  new resourseNotFound("There is no todo with this id" + id));

        retrivedTodo.setTitle(todoDTO.getTitle());
        retrivedTodo.setDescription(todoDTO.getDescription());
        retrivedTodo.setComplete(todoDTO.isComplete());

      Todo updatedTodo =  todoRepository.save(retrivedTodo);

      TodoDTO updatedTodoDTO = modelMapper.map(updatedTodo,TodoDTO.class);

        return updatedTodoDTO;
    }

    @Override
    public void DeleteTodo(Long id) {
        Todo retrivedTodo = todoRepository.findById(id)
                .orElseThrow(() ->  new resourseNotFound("There is no todo with this id" + id));

        todoRepository.deleteById(id);
    }

    @Override
    public TodoDTO completeTodo(Long id) {
        Todo retrivedTodo = todoRepository.findById(id)
                .orElseThrow(() ->  new resourseNotFound("There is no todo with this id" + id));

//        System.out.println("===========>" + retrivedTodo.isComplete());

        if(retrivedTodo.isComplete()){
            retrivedTodo.setComplete(Boolean.FALSE);
        }else {
            retrivedTodo.setComplete(Boolean.TRUE);
        }

       Todo updatedTodoStatus = todoRepository.save(retrivedTodo);

       TodoDTO updatedTodoStatusDTO = modelMapper.map(updatedTodoStatus,TodoDTO.class);

        return updatedTodoStatusDTO;

    }

//    @Override
//    public TodoDTO inCompleteTodo(Long id) {
//        Todo retrivedTodo = todoRepository.findById(id)
//                .orElseThrow(() ->  new resourseNotFound("There is no todo with this id" + id));
//
//        retrivedTodo.setComplete(Boolean.FALSE);
//
//       Todo updatedTodo = todoRepository.save(retrivedTodo);
//
//
//        return modelMapper.map(updatedTodo,TodoDTO.class);
//    }
}

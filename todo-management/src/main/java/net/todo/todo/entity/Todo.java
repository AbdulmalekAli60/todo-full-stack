package net.todo.todo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity // specify that this class is a JPA Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // makes the primary key auto increament
    private Long id;

    @Column(name = "title" , nullable = false)
    private String title;

    @Column(nullable = false) // if we dont give the name of coulmun jpa will use the inctance varibale as the name
    private String description;

    private boolean complete;


}

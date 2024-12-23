package net.todo.todo.repository;

import net.todo.todo.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.management.relation.Role;

public interface RolesRepository extends JpaRepository<Roles,Long> {

    Roles findByName(String name);


}

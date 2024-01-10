package de.SWT.facs.repository;

import org.springframework.data.repository.CrudRepository;

import de.SWT.facs.entities.Role;
import de.SWT.facs.entities.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {

    List<User> findAllByOrderByRoleAsc();

    Iterable<User> findAllByRole(Role role);

}

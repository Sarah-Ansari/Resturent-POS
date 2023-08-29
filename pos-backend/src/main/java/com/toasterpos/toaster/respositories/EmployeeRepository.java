package com.toasterpos.toaster.respositories;

import com.toasterpos.toaster.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {


    @Query("select emp from Employee emp where name like ?1")
    List<Employee> searchByName(String name);

    List<Employee> findByName(String name);

    List<Employee> findByEmail(String email);
}

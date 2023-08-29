package com.toasterpos.toaster.models;

import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue
    @Column(name = "employee_id")
    private Long employeeId;
    @Column(nullable = false)
    private String name;
    private String address;
    private String phone;
    private String position;
    @Column(name = "date_of_birth")
    private OffsetDateTime dateOfBirth;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "password_hash")
    private String password;
    @OneToMany(mappedBy = "employee")
    private List<Order> orders;
    @Transient
    private Integer age;
    @OneToMany(mappedBy = "employee")
    private List<Salary> salaries;
}

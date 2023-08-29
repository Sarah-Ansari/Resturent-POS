package com.toasterpos.toaster.models;

import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "salaries")
public class Salary {

    @Id
    @GeneratedValue
    @Column(name = "salary_id")
    private Long id;
    @Column(name = "date_of_salary")
    private OffsetDateTime salaryDate;
    @Column(nullable = false)
    private Double amount;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}

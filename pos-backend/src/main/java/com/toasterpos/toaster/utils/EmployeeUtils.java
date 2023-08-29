package com.toasterpos.toaster.utils;

import com.toasterpos.toaster.models.Employee;

import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;
import java.util.Optional;

public class EmployeeUtils {

    public static Integer calculateAge(Employee employee){
        return Optional.ofNullable(employee).map(Employee::getDateOfBirth).map(e -> Period.between(e.toLocalDate(), LocalDate.now()).getYears()).orElse(null);
    }
}

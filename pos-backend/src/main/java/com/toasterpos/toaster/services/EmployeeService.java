package com.toasterpos.toaster.services;

import com.toasterpos.toaster.models.Employee;
import com.toasterpos.toaster.models.dtos.EmployeeResponseDto;
import com.toasterpos.toaster.respositories.EmployeeRepository;
import com.toasterpos.toaster.utils.EmployeeUtils;
import com.toasterpos.toaster.utils.ResponseDtoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private BCryptPasswordEncoder B_CRYPT_PASSWORD_ENCODER;

    @Autowired
    private EmployeeRepository repository;

    private static Function<Employee, Employee> setAge() {
        return e -> {
            Integer age = EmployeeUtils.calculateAge(e);
            e.setAge(age);
            return e;
        };
    }

    public List<EmployeeResponseDto> getAllEmployee(){
        return repository.findAll().stream().map(setAge()).map(ResponseDtoUtils::copyEmployeeResponse).collect(Collectors.toList());
    }

    public Optional<Employee> getEmployeeById(Long employeeId){
        return repository.findById(employeeId).map(setAge());
    }

    public void deleteEmployeeById(Long employeeId){
        repository.deleteById(employeeId);
    }

    public EmployeeResponseDto createNewEmployee(Employee employee){
        employee.setPassword(B_CRYPT_PASSWORD_ENCODER.encode(employee.getPassword()));
        Employee e = repository.save(employee);
        return ResponseDtoUtils.copyEmployeeResponse(e);
    }

    public List<Employee> findEmployeesByName(String name){
        return repository.findByName(name).stream().map(setAge()).collect(Collectors.toList());
    }

    public List<Employee> findEmployeesByEmail(String email){
        return repository.findByEmail(email).stream().map(setAge()).collect(Collectors.toList());
    }

    public EmployeeResponseDto loginEmployee(String email, String password){
        return repository.findByEmail(email).stream().filter(Objects::nonNull).findFirst()
                .filter(e -> B_CRYPT_PASSWORD_ENCODER.matches(password, e.getPassword())).map(setAge()).map(ResponseDtoUtils::copyEmployeeResponse).orElseThrow();
    }

    public Employee updateEmployee(Employee employee) {
        Employee employeeToBeUpdated = getEmployeeById(employee.getEmployeeId()).orElseThrow();
        if (StringUtils.hasText(employee.getName()) && !employeeToBeUpdated.getName().equals(employee.getName())) {
            employeeToBeUpdated.setName(employee.getName());
        }
        if (StringUtils.hasText(employee.getAddress()) && !employeeToBeUpdated.getAddress().equals(employee.getAddress())) {
            employeeToBeUpdated.setAddress(employee.getAddress());
        }
        if (StringUtils.hasText(employee.getPhone()) && !employeeToBeUpdated.getPhone().equals(employee.getPhone())) {
            employeeToBeUpdated.setPhone(employee.getPhone());
        }
        if (StringUtils.hasText(employee.getPosition()) && !employeeToBeUpdated.getPosition().equals(employee.getPosition())) {
            employeeToBeUpdated.setPosition(employee.getPosition());
        }
        if (Objects.nonNull(employee.getDateOfBirth()) && !employeeToBeUpdated.getDateOfBirth().isEqual(employee.getDateOfBirth())) {
            employeeToBeUpdated.setDateOfBirth(employee.getDateOfBirth());
        }
        if (StringUtils.hasText(employee.getEmail()) && !employeeToBeUpdated.getEmail().equals(employee.getEmail())) {
            employeeToBeUpdated.setEmail(employee.getEmail());
        }
        if (Objects.nonNull(employee.getPassword()) && !B_CRYPT_PASSWORD_ENCODER.matches(employee.getPassword(), employeeToBeUpdated.getPassword())) {
            employeeToBeUpdated.setPassword(B_CRYPT_PASSWORD_ENCODER.encode(employee.getPassword()));
        }
        Employee updatedEmployee =  repository.save(employeeToBeUpdated);
        setAge().apply(updatedEmployee);
        return updatedEmployee;
    }

    public List<Employee> searchByName(String name) {
        return repository.searchByName("%" + name + "%");
    }
}

package com.toasterpos.toaster.controllers;

import com.toasterpos.toaster.models.Employee;
import com.toasterpos.toaster.models.Ingredient;
import com.toasterpos.toaster.models.dtos.EmployeeResponseDto;
import com.toasterpos.toaster.services.EmployeeService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/login")
    public @ResponseBody EmployeeResponseDto loginEmployee(@RequestParam String email, @RequestParam String password){
        return employeeService.loginEmployee(email, password);
    }

    @PostMapping("/create")
    public @ResponseBody EmployeeResponseDto createEmployee(@RequestBody Employee employee){
        return employeeService.createNewEmployee(employee);
    }

    @GetMapping("/get")
    public @ResponseBody Employee getEmployee(@RequestParam Long employeeId){
        log.info("Received /employee/get with employee " + employeeId);
        Optional<Employee> optional = employeeService.getEmployeeById(employeeId);
        return optional.orElse(null);
    }

    @GetMapping("/search")
    public @ResponseBody List<Employee> searchByName(@RequestParam String name){
        return employeeService.searchByName(name);
    }

    @GetMapping("/get_by_name")
    public @ResponseBody List<Employee> getEmployeeByName(@RequestParam String name){
        log.info("Received /employee/get_by_name with employeeName " + name);
        return employeeService.findEmployeesByName(name);
    }

    @DeleteMapping("/delete")
    public @ResponseBody String deleteEmployee(@RequestParam @NonNull Long employeeId){
        log.info("Received request /employee/delete with employee_id " + employeeId);
        try{
            employeeService.deleteEmployeeById(employeeId);
            return "Successfully deleted";
        }catch (Exception e){
            log.error("ERROR in /employee/delete ",e);
            return null;
        }
    }

    @PutMapping("/update")
    public @ResponseBody Employee updateEmployee(@RequestBody Employee employee){
        return employeeService.updateEmployee(employee);
    }

    @GetMapping("/list")
    public @ResponseBody List<EmployeeResponseDto> getAllEmployee(){
        return employeeService.getAllEmployee();
    }
}

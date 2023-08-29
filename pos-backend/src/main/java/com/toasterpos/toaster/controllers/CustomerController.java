package com.toasterpos.toaster.controllers;

import com.toasterpos.toaster.models.Customer;
import com.toasterpos.toaster.models.Employee;
import com.toasterpos.toaster.models.Ingredient;
import com.toasterpos.toaster.models.dtos.CustomerResponseDto;
import com.toasterpos.toaster.services.CustomerService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/create")
    public @ResponseBody Customer createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    @GetMapping("/get")
    public @ResponseBody Customer getCustomer(@RequestParam Long customerId){
        log.info("Received /customer/get with customer " + customerId);
        Optional<Customer> optional = customerService.getCustomerById(customerId);
        return optional.orElse(null);
    }

    @GetMapping("/list")
    public @ResponseBody List<CustomerResponseDto> getAllCustomer(){
        return customerService.getAllCustomer();
    }

    @DeleteMapping("/delete")
    public @ResponseBody String deleteCustomer(@RequestParam @NonNull Long customerId){
        log.info("Received request /customer/delete with customer_id " + customerId);
        try{
            customerService.deleteCustomerById(customerId);
            return "Successfully deleted";
        }catch (Exception e){
            log.error("ERROR in /customer/delete ",e);
            return null;
        }
    }

    @PutMapping("/update")
    public @ResponseBody Customer updateCustomer(@RequestBody Customer customer){
        return customerService.updateCustomer(customer);
    }
}

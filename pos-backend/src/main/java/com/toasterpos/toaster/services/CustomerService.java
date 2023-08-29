package com.toasterpos.toaster.services;

import com.toasterpos.toaster.models.Customer;
import com.toasterpos.toaster.models.dtos.CustomerResponseDto;
import com.toasterpos.toaster.respositories.CustomerRepository;
import com.toasterpos.toaster.utils.ResponseDtoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<CustomerResponseDto> getAllCustomer() {
        return customerRepository.findAll().stream().filter(Objects::nonNull).map(ResponseDtoUtils::copyCustomerResponse).collect(Collectors.toList());
    }

    public void deleteCustomerById(Long customerId) {
        customerRepository.deleteById(customerId);
    }

    public Customer updateCustomer(Customer customer) {
        Customer fetchedCustomer = getCustomerById(customer.getCustomerId()).orElseThrow();
        if (StringUtils.hasText(customer.getName()) && !fetchedCustomer.getName().equals(customer.getName())) {
            fetchedCustomer.setName(customer.getName());
        }
        if (StringUtils.hasText(customer.getContactNumber()) && !fetchedCustomer.getContactNumber().equals(customer.getContactNumber())) {
            fetchedCustomer.setContactNumber(customer.getContactNumber());
        }
        if (Objects.nonNull(customer.getDateOfBirth()) && !fetchedCustomer.getDateOfBirth().isEqual(customer.getDateOfBirth())) {
            fetchedCustomer.setDateOfBirth(customer.getDateOfBirth());
        }
        if (StringUtils.hasText(customer.getEmail()) && !fetchedCustomer.getEmail().equals(customer.getEmail())) {
            fetchedCustomer.setEmail(customer.getEmail());
        }
        return customerRepository.save(fetchedCustomer);
    }

    public Optional<Customer> getCustomerById(Long customerId) {
        return customerRepository.findById(customerId);
    }
}

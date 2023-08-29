package com.toasterpos.toaster.models.dtos;

import com.toasterpos.toaster.models.Customer;
import com.toasterpos.toaster.models.Employee;
import com.toasterpos.toaster.models.OrderItem;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class OrderResponseDto {
    private Long orderId;
    private OffsetDateTime orderDate;
    private Double discount;
    private boolean completed;
    private CustomerResponseDto customer;
    private Double grossTotal;
    private Double netTotal;
    private List<OrderItemResponseDto> orderItems;
    private EmployeeResponseDto employee;
}

package com.toasterpos.toaster.models.dtos;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@Data
public class OrderDto {
    private Long customerId;
    private Long employeeId;
    private List<Map<String, Long>> orderItems;
    private OffsetDateTime orderDate;
    private Double grossTotal;
}

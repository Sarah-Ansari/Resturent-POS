package com.toasterpos.toaster.models.dtos;

import com.toasterpos.toaster.models.Order;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

@Data
public class CustomerResponseDto {
    private Long customerId;
    private String name;
    private String contactNumber;
    private OffsetDateTime dateOfBirth;
    private String email;
    private List<Long> orders;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

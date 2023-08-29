package com.toasterpos.toaster.models.dtos;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class EmployeeResponseDto {
    private Long employeeId;
    private String name;
    private String address;
    private String phone;
    private String position;
    private OffsetDateTime dateOfBirth;
    private String email;
    private List<Long> orders;
}

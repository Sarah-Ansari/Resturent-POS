package com.toasterpos.toaster.models.dtos;

import com.toasterpos.toaster.models.Customer;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class ReservationResponseDto {
    private Long reservationId;
    private OffsetDateTime reservationFrom;
    private OffsetDateTime reservationTo;
    private CustomerResponseDto customer;
}

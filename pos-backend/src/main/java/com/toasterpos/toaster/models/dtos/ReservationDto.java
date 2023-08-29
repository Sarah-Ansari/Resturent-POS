package com.toasterpos.toaster.models.dtos;

import com.toasterpos.toaster.models.Customer;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class ReservationDto {
    private OffsetDateTime reservationFrom;
    private OffsetDateTime reservationTo;
    private Long customerId;
}

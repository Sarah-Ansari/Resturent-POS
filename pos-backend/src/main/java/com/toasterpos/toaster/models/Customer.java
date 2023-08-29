package com.toasterpos.toaster.models;

import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue
    @Column(name = "customer_id")
    private Long customerId;
    private String name;
    @Column(name = "contact_number", unique = true)
    private String contactNumber;
    @Column(name = "date_of_birth")
    private OffsetDateTime dateOfBirth;
    @Column(unique = true)
    private String email;
    @OneToMany(mappedBy = "customer")
    private List<Order> orders;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;
}

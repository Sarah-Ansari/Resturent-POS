package com.toasterpos.toaster.models;

import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private Long orderId;
    @Column(name = "order_date")
    private OffsetDateTime orderDate;
    private Double discount;
    private boolean completed;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    private Double grossTotal;
    private Double netTotal;
    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}

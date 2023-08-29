package com.toasterpos.toaster.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@jakarta.persistence.Table(name = "table_details")
public class Table {
    @Id
    @GeneratedValue
    @Column(name = "table_id")
    private Long tableId;
    private String name;
    private String notes;
    @OneToMany(mappedBy = "table")
    private List<Reservation> reservations;
//    @OneToMany(mappedBy = "table")
//    private List<Order> orders;
}

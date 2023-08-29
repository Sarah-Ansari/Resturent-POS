package com.toasterpos.toaster.models;

import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "ingredient_stock")
public class Ingredient {
    @Id
    @GeneratedValue
    @Column(name = "ingredient_id")
    private Long ingredientId;
    private String name;
    private String details;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Units unit;
    @Column(nullable = false)
    private Double volume;
    @Transient
    private boolean incoming;

    enum Units{
        COUNT,
        KILOGRAM,
        LITRE
    }
}

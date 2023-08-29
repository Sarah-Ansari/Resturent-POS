package com.toasterpos.toaster.models;

import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long itemId;
    private String name;
    private Double price;
    private String description;
    private String category;
    private List<String> listOfIngredients;
    @OneToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
    @OneToMany(mappedBy = "item")
    private List<OrderItem> orderItems;
}

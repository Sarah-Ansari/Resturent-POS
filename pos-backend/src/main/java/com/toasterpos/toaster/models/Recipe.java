package com.toasterpos.toaster.models;

import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue
    @Column(name = "recipe_id")
    private Long recipeId;
    private String name;
    private String details;
    @Column(name = "ingredient_quantity_list")
    private String ingredientQuantityList;
}

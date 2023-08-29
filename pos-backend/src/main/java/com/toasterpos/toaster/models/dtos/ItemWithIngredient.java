package com.toasterpos.toaster.models.dtos;

import com.toasterpos.toaster.models.Ingredient;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ItemWithIngredient {
    private Long itemId;
    private String name;
    private Double price;
    private String description;
    private String category;
    private List<Map<String, Object>> ingredients;
}

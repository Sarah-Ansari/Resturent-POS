package com.toasterpos.toaster.models.dtos;

import com.toasterpos.toaster.models.Recipe;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ItemDto {
    private Long itemId;
    private String name;
    private Double price;
    private String description;
    private String category;
    private List<Map<String, String>> listOfIngredients;
}

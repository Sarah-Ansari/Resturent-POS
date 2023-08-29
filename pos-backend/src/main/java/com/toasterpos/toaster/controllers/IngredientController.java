package com.toasterpos.toaster.controllers;

import com.toasterpos.toaster.models.Employee;
import com.toasterpos.toaster.models.Ingredient;
import com.toasterpos.toaster.models.Item;
import com.toasterpos.toaster.services.IngredientService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/ingredient")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @PostMapping("/create")
    public @ResponseBody Ingredient createIngredient(@RequestBody Ingredient ingredient){
        return ingredientService.createIngredient(ingredient);
    }

    @GetMapping("/list")
    public @ResponseBody List<Ingredient> getAllIngredients(){
        return ingredientService.getAllIngredient();
    }

    @GetMapping("/search")
    public @ResponseBody List<Ingredient> searchByName(@RequestParam String name){
        return ingredientService.searchByName(name);
    }

    @DeleteMapping("/delete")
    public @ResponseBody String deleteIngredient(@RequestParam @NonNull Long ingredientId){
        log.info("Received request /ingredient/delete with ingredient_id " + ingredientId);
        try{
            ingredientService.deleteIngredientById(ingredientId);
            return "Successfully deleted";
        }catch (Exception e){
            log.error("ERROR in /ingredient/delete ",e);
            return null;
        }
    }
}

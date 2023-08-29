package com.toasterpos.toaster.controllers;

import com.toasterpos.toaster.models.Employee;
import com.toasterpos.toaster.models.Item;
import com.toasterpos.toaster.models.Recipe;
import com.toasterpos.toaster.models.dtos.ItemDto;
import com.toasterpos.toaster.models.dtos.ItemWithIngredient;
import com.toasterpos.toaster.services.ItemService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/create")
    public @ResponseBody Item createItem(@RequestBody ItemDto item){
        return itemService.createItem(item);
    }

    @GetMapping("/get")
    public @ResponseBody Item getItemById(@RequestParam Long itemId){
        return itemService.getItemById(itemId).orElse(null);
    }

    @DeleteMapping("/delete")
    public @ResponseBody String deleteItem(@RequestParam @NonNull Long itemId){
        log.info("Received request /item/delete with item_id " + itemId);
        try{
             itemService.deleteItemById(itemId);
            return "Successfully deleted";
        }catch (Exception e){
            log.error("ERROR in /item/delete ",e);
            return null;
        }
    }

    @PutMapping("/update")
    public @ResponseBody ItemWithIngredient updateItem(@RequestBody ItemWithIngredient item){
        return itemService.updateItem(item);
    }

    @GetMapping("/list")
    public @ResponseBody List<Item> getAllItems(){
        return itemService.getAllItems();
    }

    @GetMapping("/list_withIngredients")
    public @ResponseBody List<ItemWithIngredient> getAllItemsWithIngredients(){
        return itemService.getAllItemsWithIngredients();
    }

    @PostMapping("/create_recipe")
    public @ResponseBody Recipe createRecipe(@RequestBody Recipe recipe){
        return itemService.createRecipe(recipe);
    }

    @GetMapping("/list_recipe")
    public @ResponseBody List<Recipe> getAllRecipes(){
        return itemService.getAllRecipes();
    }

    @GetMapping("/get_recipe")
    public @ResponseBody Recipe getRecipeById(@RequestParam Long recipeId){
        return itemService.getRecipeById(recipeId).orElseThrow();
    }

    @GetMapping("/get_recipe_by_name")
    public @ResponseBody List<Recipe> getRecipeByName(@RequestParam String recipeName){
        return itemService.getRecipeByName(recipeName);
    }

    @DeleteMapping("/delete_recipe")
    public @ResponseBody String deleteRecipe(@RequestParam @NonNull Long recipeId){
        log.info("Received request /item/delete_recipe with recipeId " + recipeId);
        try{
            itemService.deleteRecipeById(recipeId);
            return "Successfully deleted";
        }catch (Exception e){
            log.error("ERROR in /item/delete ",e);
            return null;
        }
    }

    @PutMapping("/update_recipe")
    public @ResponseBody Recipe updateRecipe(@RequestBody Recipe recipe){
        return itemService.updateRecipe(recipe);
    }
}

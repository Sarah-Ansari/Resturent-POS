package com.toasterpos.toaster.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toasterpos.toaster.models.Ingredient;
import com.toasterpos.toaster.models.Item;
import com.toasterpos.toaster.models.Recipe;
import com.toasterpos.toaster.models.dtos.ItemDto;
import com.toasterpos.toaster.models.dtos.ItemWithIngredient;
import com.toasterpos.toaster.respositories.IngredientRepository;
import com.toasterpos.toaster.respositories.ItemRepository;
import com.toasterpos.toaster.respositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private IngredientRepository ingredientRepository;

    public Item createItem(ItemDto item){
        Item newItem = new Item();
        newItem.setPrice(item.getPrice());
        newItem.setDescription(item.getDescription());
        newItem.setName(item.getName());
        newItem.setCategory(item.getCategory());

        List<String> convertedStrings = getConvertedStrings(item);
        newItem.setListOfIngredients(convertedStrings);
        return itemRepository.save(newItem);
    }

    private static List<String> getConvertedStrings(ItemDto item) {
        ObjectMapper objectMapper = new ObjectMapper();
        return item.getListOfIngredients().stream().map(map -> {
            return map.toString();
        }).toList();
    }

    public Recipe createRecipe(Recipe recipe){
        return recipeRepository.save(recipe);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long recipeId) {
        return recipeRepository.findById(recipeId);
    }

    public List<Recipe> getRecipeByName(String recipeName) {
        return recipeRepository.findByName(recipeName);
    }

    public Optional<Item> getItemById(Long itemId) {
        return itemRepository.findById(itemId);
    }

    public void deleteItemById(Long itemId) {
        itemRepository.deleteById(itemId);
    }

    public ItemWithIngredient updateItem(ItemWithIngredient item) {
        Item fetchedItem = getItemById(item.getItemId()).orElseThrow();
        if (StringUtils.hasText(item.getName()) && !fetchedItem.getName().equals(item.getName())) {
            fetchedItem.setName(item.getName());
        }
        if (item.getPrice() != null && !fetchedItem.getPrice().equals(item.getPrice())) {
            fetchedItem.setPrice(item.getPrice());
        }
        if (StringUtils.hasText(item.getDescription()) && !fetchedItem.getDescription().equals(item.getDescription())) {
            fetchedItem.setDescription(item.getDescription());
        }
        if (StringUtils.hasText(item.getCategory()) && !fetchedItem.getCategory().equals(item.getCategory())) {
            fetchedItem.setCategory(item.getCategory());
        }
//        Long quantity = item.getIngredients().stream().filter(stringObjectMap -> stringObjectMap.containsKey("quantity")).map(stringObjectMap -> (long) stringObjectMap.get("quantity")).findFirst().orElse(null);
//        Ingredient ingredient = item.getIngredients().stream().filter(stringObjectMap -> stringObjectMap.containsKey("ingredient")).map(stringObjectMap -> (Ingredient) stringObjectMap.get("ingredient")).findFirst().orElse(null);
//        if (!CollectionUtils.isEmpty(item.getIngredients().toString()) && !new HashSet<>(fetchedItem.getListOfIngredients()).containsAll(convertedStrings)) {
//            fetchedItem.setListOfIngredients(convertedStrings);
//        }
        if (StringUtils.hasText(item.getIngredients().toString()) && !fetchedItem.getListOfIngredients().toString().equals(item.getIngredients().toString())) {
            fetchedItem.setListOfIngredients(item.getIngredients().stream().map(Objects::toString).collect(Collectors.toList()));
        }
        Item savedItem = itemRepository.save(fetchedItem);
        var ingredients = savedItem.getListOfIngredients().stream().map(s -> {
            if (s.length() > 0) {
                int ingIndex = s.indexOf("ingredientId=");
                int quaIndex = s.indexOf("quantity=");
                Long ingId = Long.valueOf(s.substring(14, s.indexOf(",")));
                Long quantity = Long.valueOf(s.substring(s.indexOf(",") + 11, s.lastIndexOf("}")));
                Ingredient ingredient = ingredientRepository.findById(ingId).orElse(null);
                return Map.of("ingredient", ingredient, "quantity", quantity);
            }
            return null;
        }).toList();
        ItemWithIngredient itemWithIngredient = new ItemWithIngredient();
        itemWithIngredient.setItemId(savedItem.getItemId());
        itemWithIngredient.setName(savedItem.getName());
        itemWithIngredient.setCategory(savedItem.getCategory());
        itemWithIngredient.setPrice(savedItem.getPrice());
        itemWithIngredient.setDescription(savedItem.getDescription());
        itemWithIngredient.setIngredients(ingredients);
        return itemWithIngredient;
    }

    public void deleteRecipeById(Long recipeId) {
        recipeRepository.deleteById(recipeId);
    }

    public Recipe updateRecipe(Recipe recipe) {
        Recipe fetchedRecipe = getRecipeById(recipe.getRecipeId()).orElseThrow();
        if (!StringUtils.hasText(recipe.getName()) && !fetchedRecipe.getName().equals(recipe.getName())) {
            fetchedRecipe.setName(recipe.getName());
        }
        if (!StringUtils.hasText(recipe.getDetails()) && !fetchedRecipe.getDetails().equals(recipe.getDetails())) {
            fetchedRecipe.setDetails(recipe.getDetails());
        }
        if (!StringUtils.hasText(recipe.getIngredientQuantityList()) && !fetchedRecipe.getIngredientQuantityList().equals(recipe.getIngredientQuantityList())) {
            fetchedRecipe.setIngredientQuantityList(recipe.getIngredientQuantityList());
        }
        return recipeRepository.save(fetchedRecipe);
    }

    public List<ItemWithIngredient> getAllItemsWithIngredients() {
        List<Item> items = getAllItems();
        return items.stream().map(item -> {
            var ingredients = item.getListOfIngredients().stream().map(s -> {
                if(s.length() > 0){
                    int ingIndex = s.indexOf("ingredientId=");
                    int quaIndex = s.indexOf("quantity=");
                    Long ingId = Long.valueOf(s.substring(14, s.indexOf(",")));
                    Long quantity = Long.valueOf(s.substring(s.indexOf(",") +11, s.lastIndexOf("}")));
                    Ingredient ingredient = ingredientRepository.findById(ingId).orElse(null);
                    return Map.of("ingredient", ingredient, "quantity", quantity);
                }
                return null;
            }).collect(Collectors.toList());
            ItemWithIngredient itemWithIngredient = new ItemWithIngredient();
            itemWithIngredient.setItemId(item.getItemId());
            itemWithIngredient.setName(item.getName());
            itemWithIngredient.setCategory(item.getCategory());
            itemWithIngredient.setPrice(item.getPrice());
            itemWithIngredient.setDescription(item.getDescription());
            itemWithIngredient.setIngredients(ingredients);
            return itemWithIngredient;
        }).collect(Collectors.toList());
    }
}

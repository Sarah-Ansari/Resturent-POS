package com.toasterpos.toaster.respositories;

import com.toasterpos.toaster.models.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query("select ingred from Ingredient ingred where name like ?1")
    List<Ingredient> searchByName(String name);
}

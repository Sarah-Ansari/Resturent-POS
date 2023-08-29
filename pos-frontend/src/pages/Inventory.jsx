import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { IngredientTable } from "../components/Inventory and Suppliers/IngredientTable";


import React, { useState, useEffect, useRef } from "react";

import styles from "../styles/Inventory/Inventory.module.scss";
import {
  ingredients_sample,
} from "../data/InventoryAndSuppliers";

import {
  fetchIngredients,
  SearchInputChangeIngredients,
} from "../services/Inventory.service";
import { IngredientForm } from "../components/Inventory and Suppliers/IngredientForm";

export const Inventory = () => {
  const [ingredients, setIngredients] = useState(ingredients_sample);
  const [searchQueryIngredients, setSearchQueryIngredients] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const backgroundClickRecord = useRef(null);
  const backgroundClickSupply = useRef(null);
  const backgroundClickIngredient = useRef(null);

  console.log(ingredients)

  useEffect(() => {
    handlefetchIngredients();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickRecord);
    return () => {
      document.removeEventListener("click", handleBackgroundClickRecord);
    };
  }, []);

  const handleBackgroundClickRecord = (e) => {
    if (e.target === backgroundClickRecord.current) {
      setShowForm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickSupply);
    return () => {
      document.removeEventListener("click", handleBackgroundClickSupply);
    };
  }, []);

  const handleBackgroundClickSupply = (e) => {
    if (e.target === backgroundClickSupply.current) {
      setShowSupplierForm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickIngredient);
    return () => {
      document.removeEventListener("click", handleBackgroundClickIngredient);
    };
  }, []);

  const handleBackgroundClickIngredient = (e) => {
    if (e.target === backgroundClickIngredient.current) {
      setShowIngredientForm(false);
    }
  };

  const handlefetchIngredients = async () => {
    try {
      const response = await fetchIngredients();
      setIngredients(response);
      // console.log(response);
      // window.location.reload();
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const handleSearchInputChangeIngredients = async (event) => {
    setSearchQueryIngredients(event.target.value);
    try {
      const response = await SearchInputChangeIngredients(event);
      setIngredients(response);
    } catch (error) {
      console.error("Error fetching filtered ingredients:", error);
    }
  };

  return (
    <>
      <Nav />
      <MenuPanel />

      <div className={styles.Hero}>
        <h1>Inventory</h1>
      </div>

      <div className={styles.container}>
        <h2 className={styles.tableHeadings}>Ingredient Table</h2>

        <div className={styles.container}>
          {!showIngredientForm && (
            <button
              className={styles.addElementBtn}
              onClick={() => setShowIngredientForm(true)}
            >
              Add Ingredient
            </button>
          )}

          {showIngredientForm && (
            <div className={styles.cardContainer} ref={backgroundClickIngredient}>
              <IngredientForm
                onClose={() => {
                  setShowIngredientForm(false);
                }}
              />
            </div>
          )}
        </div>

        <input
          type="text"
          value={searchQueryIngredients}
          onChange={handleSearchInputChangeIngredients}
          placeholder="Search ingredients..."
          className={styles.searchbar}
        />
        {ingredients ? <IngredientTable data={ingredients} /> : <div className={styles.disabledText}><p>There is no such a Ingredient, Please Check again....</p></div>}
      </div>
    </>
  );
};

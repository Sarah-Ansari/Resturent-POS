import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Menu/MenuForm.module.scss";
import { fetchIngredients } from "../../services/Inventory.service";
import { creteMenuItem } from "../../services/Menu.service";
import { API } from "../../services/BaseApi";
//TODO: Put the axios methods to service layer if possible
export const MenuItemForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [price, setPrice] = useState("");

  useEffect(() => {
    // Fetch ingredients from the API on component mount
    handlefetchIngredients();
  }, []);

  const handlefetchIngredients = async () => {
    try {
      const response = await fetchIngredients();
      setIngredients(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleIngredientSelection = (event, ingredientId) => {
    if (event.target.checked) {
      const selectedIngredient = ingredients.find(
        (ingredient) => ingredient.id === ingredientId
      );
      setSelectedIngredients([...selectedIngredients, selectedIngredient]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter(
          (ingredient) => ingredient.id !== ingredientId
        )
      );
    }
  };

  const handleQuantityChange = (event, ingredientId) => {
    setIngredientQuantities({
      ...ingredientQuantities,
      [ingredientId]: event.target.value,
    });
  };

  const handleIngredientAdd = (selectedIngredientName) => {
    const selectedIngredient = ingredients.find(
      (ingredient) => ingredient.name == selectedIngredientName
    );
    console.log("selected ingredient" + JSON.stringify(selectedIngredient))
    setSelectedIngredients([...selectedIngredients, selectedIngredient]);
  };

  const handleIngredientRemove = (selectedIngredientId) => {
    var filteredSelectedItems = selectedIngredients.filter(
      (ingredient) => {
        var boolean = parseInt(ingredient.ingredientId) !== parseInt(selectedIngredientId)
        return boolean
      }
    )
    setSelectedIngredients(filteredSelectedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("printin ingredient" + JSON.stringify(selectedIngredients))
    const menuItemRequest = {
      name,
      category,
      description,
      listOfIngredients: selectedIngredients.map((ingredient) => ({
        ingredientId: ingredient.ingredientId,
        quantity: ingredientQuantities[ingredient.ingredientId]
      })),
      price: parseFloat(price),
    };
    await creteMenuItem(menuItemRequest)
    onClose();
    window.location.reload();
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <legend className={styles.legend}>
          <strong>Add a Menu Item</strong>
        </legend>
        <div className={styles.card_content}>
          <div className={styles.select}>
            <label>Name &emsp;&emsp;:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required="requred"
            />
          </div>
          <div className={styles.select}>
            <label>Category &ensp;:</label>

            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              required="requred"
              defaultValue={"Hors d'oeuvre"}
            >
              <option value="Hors d'oeuvre">Hors d'oeuvre</option>
              <option value="Soup">Soup</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Salad">Salad</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
            {/* <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
          </div>
          <div className={styles.select}>
            <label>Description :</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.select}>
            <label>Ingredients :</label>

            <select
              onChange={(e) =>
                handleIngredientAdd(e.target.value)
              }
              defaultValue=""
            >
              <option disabled value="">
                Select an ingredient
              </option>
              {ingredients.map((ingredient, index) => (
                <option key={ingredient.id + index} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.selectItems}>
            {selectedIngredients.map((ingredient) => (
              <div key={ingredient.ingredientId} className={styles.showItems}>
                <p>{ingredient.name} - </p>
                <input
                  type="number"
                  min="0"
                  value={ingredientQuantities[ingredient.ingredientId] || ""}
                  onChange={(e) => handleQuantityChange(e, ingredient.ingredientId)}
                  required="required"
                />
                {ingredient.quantity_type}
                <button
                  type="button"
                  onClick={() => handleIngredientRemove(ingredient.ingredientId)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <div className={styles.select}>
            <label>Price &emsp;&emsp;:</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required="requred"
            />
          </div>
          <button className={styles.button} type="submit">
            Create Menu Item
          </button>
        </div>
      </form>
    </div>
  );
};

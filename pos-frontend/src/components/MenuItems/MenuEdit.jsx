import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Menu/MenuEdit.module.scss";
import { fetchIngredients } from "../../services/Inventory.service";
import { updateMenuItem } from "../../services/Menu.service";

//TODO: Put the axios methods to service layer if possible
export const MenuEdit = ({ MenuItem, onClose }) => {
  const [itemId, setitemId] = useState(MenuItem.itemId);
  const [name, setName] = useState(MenuItem.name);
  const [category, setCategory] = useState(MenuItem.category);
  const [description, setDescription] = useState(MenuItem.description);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(MenuItem.ingredients);
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [price, setPrice] = useState("");
  console.log(selectedIngredients);

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



  const handleQuantityChange = (event, ingredientId) => {
    const selectedIngredientData = ingredients.find(
      (ingredientData) => ingredientData.ingredientId === ingredientId
    );
    console.log("from handle change, pringitn event value ", event.target.value)
    selectedIngredientData.quantity = event.target.value
    console.log("from handle change, pringitn selectedItem ", JSON.stringify(selectedIngredientData))
    setIngredientQuantities({ ...ingredientQuantities, [ingredientId]: event.target.value });
    console.log("printing ingredient quantities from change ", JSON.stringify(ingredientQuantities))
  };


  const handleIngredientAdd = (selectedIngredientId) => {
    console.log("Printing from handleIngredientAdd " + JSON.stringify(selectedIngredientId))
    console.log("printing selected ingredient from add ", JSON.stringify(selectedIngredients))
    const selectedIngredientData = ingredients.find(
      (ingredientData) => ingredientData.ingredientId == selectedIngredientId
    );

    console.log("printing selected ingredient data from add ", JSON.stringify(selectedIngredientData))
    if (selectedIngredientData) {
      const selectedIngredient = {
        ingredient: selectedIngredientData,
        quantity: 0,  // Initialize with a default quantity
      };

      setSelectedIngredients([...selectedIngredients, selectedIngredient]);
    }
    console.log("printing selected ingredient after from add ", JSON.stringify(selectedIngredients))
  };

  const handleIngredientRemove = (selectedIngredientId) => {
    var filteredSelectedItems = selectedIngredients.filter(
      (ingredient) => {
        var boolean = parseInt(ingredient.ingredient.ingredientId) !== parseInt(selectedIngredientId)
        return boolean
      }
    )
    setSelectedIngredients(filteredSelectedItems);
  };
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create your menuItemRequest object with the form data
    const menuItemRequest = {
      itemId,
      name,
      category,
      description,
      ingredients: selectedIngredients.map((ingredient) => ({
        ingredientId: ingredient.ingredient.ingredientId,
        quantity: ingredientQuantities[ingredient.ingredient.ingredientId],
      })),
      price: parseFloat(price),
    };
    await updateMenuItem(menuItemRequest);
    onClose();
    window.location.reload()
  };

  // console.log("printing menu item from menu edit" + JSON.stringify(MenuItem))
  // console.log("printing selected ingredients " + JSON.stringify(selectedIngredients))
  // console.log("printing selected ingredients quantiry " + JSON.stringify(setIngredientQuantities))

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <legend className={styles.legend}>
          <strong>Edit Menu Item</strong>
        </legend>
        <div className={styles.card_content}>
          <div className={styles.select}>
            <label>Name &emsp;&emsp;:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.select}>
            <label>Category &ensp;:</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required="required"
              defaultValue={category}
            >
              <option value="Hors d'oeuvre">Hors d'oeuvre</option>
              <option value="Soup">Soup</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Salad">Salad</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
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

            <select multiple
              onChange={(e) =>
                handleIngredientAdd(e.target.value)
              }
              defaultValue=""
            >
              <option disabled value="">
                Select an ingredient
              </option>
              {ingredients.map((ingredient, index) => (
                <option key={ingredient.ingredientId + index} value={ingredient.ingredientId}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.selectItems}>
            {selectedIngredients.map((ingredient) => (
              <div key={ingredient.ingredient.ingredientId} className={styles.showItems}>
                <p>{ingredient.ingredient.name || ingredient} - </p>
                <input
                  type="number"
                  min="0"
                  value={ingredientQuantities[ingredient.ingredient.ingredientId] || ''}
                  onChange={(e) => handleQuantityChange(e, ingredient.ingredient.ingredientId)}
                />
                <button
                  type="button"
                  onClick={() => handleIngredientRemove(ingredient.ingredient.ingredientId)}
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
            />
          </div>
          <button className={styles.button} type="submit">
            Edit Menu Item
          </button>
        </div>
      </form>
    </div>
  );
};

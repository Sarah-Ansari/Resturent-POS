import React, { useState } from "react";
import { createIngredient } from "../../services/Inventory.service";
import styles from "../../styles/Inventory/IngredientForm.module.scss";

export const IngredientForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    volume: "",
    details: "",
    unit: "COUNT",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createIngredient(formData);
    window.location.reload();
    onClose();
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <legend className={styles.legend}>
          <strong>Add an Ingredient</strong>
        </legend>
        <div className={styles.card_content}>
          <div className={styles.select}>
            {/* <label htmlFor="name">Name &emsp;&emsp;&nbsp;:</label> */}
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              required="true"
              onChange={handleChange}
              placeholder="Name of the Ingredient"
            />
          </div>

          <div className={styles.select}>
            {/* <label htmlFor="quantity">Quantity &ensp;&ensp;&nbsp;:</label> */}
            <input
              type="text"
              name="volume"
              id="volume"
              value={formData.quantity}
              required="True"
              onChange={handleChange}
              placeholder="Quantity"
            />
          </div>

          <div className={styles.select}>
            {/* <label htmlFor="quantityType">Type &ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;:</label> */}
            <select name="unit" id="unit" defaultValue="COUNT" onChange={handleChange}>
              <option value="COUNT">COUNT</option>
              <option value="KILOGRAM">KILOGRAM</option>
              <option value="LITRE">LITRE</option>
            </select>
          </div>
          <div className={styles.select}>
            {/* <label htmlFor="description">Description :</label> */}
            <input
              type="text"
              name="details"
              id="details"
              value={formData.description}
              onChange={handleChange}
              placeholder="Discription "
            />
          </div>


          <button className={styles.button} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

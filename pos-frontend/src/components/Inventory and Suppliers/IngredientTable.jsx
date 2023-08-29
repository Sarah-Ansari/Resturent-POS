import React, { useState } from "react";
import styles from "../../styles/Reservation/ReservationsTable.module.scss";
import classNames from "classnames";
import { MdClose, MdCreate } from "react-icons/md";
import { deleteIngredient } from "../../services/Inventory.service";

export const IngredientTable = ({ data }) => {

  const handleDelete = (e) => {
    console.log(e);
    deleteIngredient(e).then(() => window.location.reload());
  };

  return (
    <div className={styles.container}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Quantity Type</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td>{ingredient.volume}</td>
              <td>{ingredient.unit}</td>
              <td>{ingredient.details}</td>
              <td className={styles.actionColCell}>
                <button
                  className={classNames(styles.btn, styles.cancelBtn)}
                  onClick={() => handleDelete(ingredient.ingredientId)}
                >
                  <MdClose />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

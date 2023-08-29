import styles from "../../styles/Reservation/ReservationsTable.module.scss";
import { MdCreate, MdClose } from "react-icons/md";
import classNames from "classnames";
import React, { useState, useEffect, useRef } from "react";
import { MenuEdit } from "../../components/MenuItems/MenuEdit";
import { deleteMenuItem } from "../../services/Menu.service";

const MenuTable = ({ MenuItems }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const backgroundClickEdit = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClickEdit);
    return () => {
      document.removeEventListener("click", handleBackgroundClickEdit);
    };
  }, []);

  const handleBackgroundClickEdit = (e) => {
    if (e.target === backgroundClickEdit.current) {
      setShowEdit(false);
    }
  };

  const handleDelete = (e) => {
    console.log(e);
    deleteMenuItem(e).then(() => window.location.reload());
  };

  const handleMenuItem = (MenuItem) => {
    setSelectedMenuItem(MenuItem)
    setShowEdit(true);
  }
  console.log("printing menu items + " + JSON.stringify(MenuItems));
  return (
    <div className={styles.container}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Ingredients</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {MenuItems.map((MenuItem, index) => {
            return (
              <tr key={index}>
                <td className={styles.firstCol}>{MenuItem.name}</td>
                <td>{MenuItem.description}</td>
                <td>{MenuItem.category}</td>
                <td>
                  <ul>
                    {MenuItem.ingredients.map((item, index) => (
                      <li key={index}>
                        {item.ingredient.name} - {item.quantity} {item.ingredient.quantityType}
                      </li>
                    ))}
                  </ul>
                </td>

                <td>Rs. {MenuItem.price}</td>

                <td className={styles.actionColCell}>
                  <button
                    className={classNames(styles.btn, styles.editBtn)}
                    onClick={() => handleMenuItem(MenuItem)}
                  >
                    <MdCreate />
                    Edit
                  </button>
                  <button
                    className={classNames(styles.btn, styles.cancelBtn)}
                    onClick={() =>{console.log(MenuItem); handleDelete(MenuItem.itemId)}}
                  >
                    <MdClose />
                    Delete
                  </button>
                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
      {showEdit && (
        <div className={styles.cardContainer} ref={backgroundClickEdit}>
          <MenuEdit MenuItem={selectedMenuItem} onClose={() => setShowEdit(false)} />
        </div>
      )}
    </div>
  );
};

export default MenuTable;

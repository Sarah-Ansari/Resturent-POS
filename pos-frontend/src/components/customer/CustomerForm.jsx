import React, { useState } from "react";
import { addCustomers } from "../../services/Customers.service";
import styles from "../../styles/Customer/CustomerForm.module.scss";

export const CustomerForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '', // Changed from an array to a single string
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.contactNumber = parseInt(formData.contactNumber);
    console.log(formData);
    await addCustomers(formData);
    window.location.reload();
    onClose();
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <legend className={styles.legend}>
            <strong>Add an Customer</strong>
          </legend>
          <div className={styles.card_content}>
            <div className={styles.select}>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                required={true}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className={styles.select}>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                required={true}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className={styles.item_set}>
              <input
                type="contactNumber"
                name="contactNumber"
                id="contactNumber"
                value={formData.contactNumber}
                required={true}
                onChange={handleChange}
                placeholder="Contact Number"
              />
            </div>

            <button className={styles.button} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
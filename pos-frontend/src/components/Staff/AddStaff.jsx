import React, { useState } from "react";
import { handleForm } from "../../services/Staff.service";
import styles from "../../styles/Staff/AddStaffForm.module.scss";

export const AddStaff = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    position: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {

    try {
      const response = handleForm(formData);
      console.log("Response:", response);
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error here, if needed
    }
    onClose();
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className={styles.legend}>
            <strong>Add a New Staff Member</strong>
          </legend>
          <div className={styles.card_content}>

            <div className={styles.select}>
              <p>Last Name &emsp;&emsp;&nbsp;:</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="name"
                required="required"
              />
            </div>

            <div className={styles.select}>
              <p>Email &emsp;&emsp;&emsp;&emsp;&nbsp;&ensp;:</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required="required"
              />
            </div>
            <div className={styles.select}>
              <p>Address &emsp;&emsp;&emsp;&ensp;:</p>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required="required"
              />
            </div>
            <div className={styles.select}>
              <p>Position &emsp;&emsp;&emsp;&ensp;:</p>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Position"
                required="required"
              />
            </div>
            <div className={styles.select}>
              <p>Phone &emsp;&emsp;&emsp;&ensp;:</p>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required="required"
              />
            </div>
            <div className={styles.select}>
              <p>Password &emsp;&emsp;:</p>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required="required"
              />
            </div>

            <button
              type="submit"
              className={styles.button}
            >
              Add Member
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

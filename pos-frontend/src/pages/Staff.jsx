import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import { StaffTable } from "../components/Staff/StaffTable";


import React, { useState, useEffect, useRef } from "react";

import styles from "../styles/Inventory/Inventory.module.scss";
import {
  staffData,
} from "../data/Staff";

import {
  fetchStaff,
  SearchInputChangeStaff,
} from "../services/Staff.service";
import { AddStaff } from "../components/Staff/AddStaff";

export const Staff = () => {
  const [staff, setStaff] = useState(staffData);
  const [searchQueryStaff, setSearchQueryStaff] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const backgroundClickRecord = useRef(null);
  const backgroundClickSupply = useRef(null);
  const backgroundClickIngredient = useRef(null);

  console.log(staff)

  useEffect(() => {
    handlefetchStaff();
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
      setShowStaffForm(false);
    }
  };

  const handlefetchStaff = async () => {
    try {
      const response = await fetchStaff();
      setStaff(response);
      // console.log(response);
      // window.location.reload();
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleSearchInputChangeStaff = async (event) => {
    setSearchQueryStaff(event.target.value);
    try {
      const response = await SearchInputChangeStaff(event);
      setStaff(response);
    } catch (error) {
      console.error("Error fetching filtered staff:", error);
    }
  };

  return (
    <>
      <Nav />
      <MenuPanel />

      <div className={styles.Hero}>
        <h1>Staff Management</h1>
      </div>

      <div className={styles.container}>
        <h2 className={styles.tableHeadings}>Staff Table</h2>

        <div className={styles.container}>
          {!showStaffForm && (
            <button
              className={styles.addElementBtn}
              onClick={() => setShowStaffForm(true)}
            >
              Add Staff
            </button>
          )}

          {showStaffForm && (
            <div className={styles.cardContainer} ref={backgroundClickIngredient}>
              <AddStaff
                onClose={() => {
                  setShowStaffForm(false);
                }}
              />
            </div>
          )}
        </div>

        <input
          type="text"
          value={searchQueryStaff}
          onChange={handleSearchInputChangeStaff}
          placeholder="Search staff..."
          className={styles.searchbar}
        />
        {staff ? <StaffTable data={staff} /> : <div className={styles.disabledText}><p>There is no such a Ingredient, Please Check again....</p></div>}
      </div>
    </>
  );
};

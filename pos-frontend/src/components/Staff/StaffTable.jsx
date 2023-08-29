import React, { useState } from "react";
import styles from "../../styles/Reservation/ReservationsTable.module.scss";
import classNames from "classnames";
import { MdClose, MdCreate } from "react-icons/md";
import { deleteStaff } from "../../services/Staff.service";

export const StaffTable = ({ data }) => {

  const handleDelete = (e) => {
    console.log(e);
    deleteStaff(e).then(() => window.location.reload());
  };

  return (
    <div className={styles.container}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((staff, index) => (
            <tr key={index}>
              <td>{staff.name}</td>
              <td>{staff.position}</td>
              <td>{staff.phone}</td>
              <td>{staff.email}</td>
              <td>{staff.address}</td>
              <td className={styles.actionColCell}>
                <button
                  className={classNames(styles.btn, styles.cancelBtn)}
                  onClick={() => handleDelete(staff.employeeId)}
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

import { useState, useEffect } from "react";
import styles from "../../styles/Staff/StaffHandle.module.scss";
import { StaffCard } from "./StaffCard";

export const StaffHandle = ({ StaffData }) => {
  const [staff, setStaff] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [managers, setManagers] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [waiters, setWaiters] = useState([]);
  const [cleaners, setCleaners] = useState([]);

  useEffect(() => {
    setStaff(StaffData);
  }, [StaffData]);

  useEffect(() => {
    setDirectors(
      staff.filter((member) => {
        return member.category === "Directors";
      })
    );
    setManagers(staff.filter((member) => member.category === "Managers"));
    setChefs(staff.filter((member) => member.category === "Chefs"));
    setWaiters(staff.filter((member) => member.category === "Waiters"));
    setCleaners(staff.filter((member) => member.category === "Cleaning Staff"));
  }, [staff]);

  return (
    <div className={styles.container}>
      {directors.length !== 0 && (
        <h2 className={styles.heading}>Director Board</h2>
      )}
      <hr className={styles.bar}></hr>
      <div className={styles.card_container}>
        <StaffCard Data={directors} />
      </div>

      {managers.length !== 0 && <h2 className={styles.heading}>Managers</h2>}
      <hr className={styles.bar}></hr>
      <div className={styles.card_container}><StaffCard Data={managers} /></div>
      

      {chefs.length !== 0 && <h2 className={styles.heading}>Chefs</h2>}
      <hr className={styles.bar}></hr>
      <div className={styles.card_container}><StaffCard Data={chefs} /></div>
      

      {waiters.length !== 0 && <h2 className={styles.heading}>Waiters</h2>}
      <hr className={styles.bar}></hr>
      <div className={styles.card_container}>
        <StaffCard Data={waiters} />
      </div>

      {cleaners.length !== 0 && (
        <h2 className={styles.heading}>Cleaning Staff</h2>
      )}
      <hr className={styles.bar}></hr>
      <div className={styles.card_container}><StaffCard Data={cleaners} /></div>
      
    </div>
  );
};

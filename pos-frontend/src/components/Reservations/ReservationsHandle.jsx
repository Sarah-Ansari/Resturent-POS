import ReservationTable from "./ReservationsTable";
import { useEffect, useState } from "react";
import styles from "../../styles/Reservation/ReservationsHandle.module.scss"

export const ReservationsHandle = ({ allReservations }) => {
  const [reservations, setReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [currentReservations, setCurrentReservations] = useState([]);

  useEffect(() => {
    setReservations(allReservations);
    
  }, [allReservations])

  useEffect(() => {
    if (reservations === "undefined") { }
    else {
      reservations.forEach(element => {
        if (Date(dateExtract(element.reservationTo)) > Date())
          console.log("here");
      });
      setPastReservations(
        reservations
      );
      // console.log(pastReservations);
      setCurrentReservations(
        reservations
        // reservations == null ? [] :
        //   reservations.filter((res) => {
        //     const date = new Date(dateExtract(res.reservationTo));
        //     const currentDate = new Date();
        //     console.log(date, currentDate);
        //     return (date > currentDate) ? true : false;
        //   })
      );
    }
    console.log(currentReservations);
  }, [reservations]);


  const dateExtract = (e) => {
    // console.log(e);
    const y = e.split("T");
    return y[0];
  }

  return (
    <div className={styles.container}>
      {currentReservations.length !== 0 && (
        <h2 className={styles.pastReservations}>Current Reservations</h2>
      )}

      <ReservationTable
        reservations={currentReservations}
      // isActionable={true}
      />

      {pastReservations.length !== 0 && (
        <h2 className={styles.pastReservations}>Past Reservations</h2>
      )}

      <ReservationTable
        reservations={pastReservations}
      />
    </div>
  );
};
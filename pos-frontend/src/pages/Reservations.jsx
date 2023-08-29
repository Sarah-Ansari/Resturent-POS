import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import styles from "../styles/Reservation/Reservations.module.scss";
import { ReservationsHandle } from "../components/Reservations/ReservationsHandle";
import { useState, useEffect, useRef } from "react";
import { cReservations, spaces } from "../data/Reservations";
import { fetchPast, fetchPresent, fetchReservations } from "../services/Reservations.service";
import { ReservationForm } from "../components/Reservations/ReservationForm";
import ReservationTable from "../components/Reservations/ReservationsTable";
import { useDispatch, useSelector } from "react-redux";

export const Reservations = () => {
  const [reservations, setResevations] = useState();
  const [pastreservations, setPastReservations] = useState();
  const [currentreservations, setCurrentReservations] = useState();
  const [showForm, setShowForm] = useState(false);
  const backgroundClick = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    handleAsync();
    pastReservations();
  }, []);

  const pastReservations = (e) => {
    if (!reservations === undefined) {
      console.log("jank");
      setPastReservations(reservations.filter((res) => {
        const date = new Date(dateExtract(res.reservationTo));
        const currentDate = new Date();
        console.log(date, currentDate);
        return (date < currentDate) ? true : false;
      }));
    }
  }



  const handleAsync = async (e) => {
    await handlePast();
    await handlePresent();
  };

  const handlePast = async () => {
    try {
      const response = await fetchPast();
      setPastReservations(response);
    } catch (error) {
      console.error("Error fetching reservatins:", error);
    }
  };

  
  const handlePresent = async () => {
    try {
      const response = await fetchPresent();
      setCurrentReservations(response);
    } catch (error) {
      console.error("Error fetching reservatins:", error);
    }
  };
  // pastReservations();
  return (
    <>
      <Nav />
      <MenuPanel />
      <div className={styles.Hero}>
        <h1>Manage Reservations</h1>

      </div>

      <div className={styles.container}>
        {!showForm && <button className={styles.button} onClick={() => setShowForm(true)}>
          Make a New Reservation
        </button>}
        {showForm && <div className={styles.cardContainer} ref={backgroundClick}>
          <ReservationForm
            areas={spaces}
            style='z-index: 9999;'
            onClose={() => {
              setShowForm(false);
            }}


          />
        </div>}
      </div>

      <div className={styles.tableContainer}>
        {console.log("reservations")}
        {console.log(reservations)}

        <ReservationTable
          reservations={pastreservations}
        />

        {/* {pastReservations.length !== 0 && (
          <h2 className={styles.pastReservations}>Past Reservations</h2>
        )} */}

        <ReservationTable
          reservations={currentreservations}
        />
      </div>
    </>
  );
};

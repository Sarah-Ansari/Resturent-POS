import { useState, useEffect } from "react";
import { handleForm } from "../../services/Reservations.service";
import styles from "../../styles/Reservation/ReservationForm.module.scss";
import { fetchCustomer } from "../../services/Customers.service";


export const ReservationForm = ({ areas, onClose, refresher }) => {

  const [formData, setFormData] = useState({
    reservationFrom: '',
    reservationTo: '',
    customerId: '',
  });

  const [customers, setCustomers] = useState();
  const [customerId, setCustomerId] = useState();
  const [date, setDate] = useState("2023-08-08");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("10:00");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCustomers = await fetchCustomer();
      setCustomers(fetchedCustomers);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    
    formData.reservationFrom = date + "T" + startTime + ":00.000+00:00";
    formData.reservationTo = date + "T" + endTime + ":00.000+00:00";
    formData.customerId = customerId;
    alert("Jesus");
    await handleForm(formData);
    alert();
    // window.location.reload();
    onClose();
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <legend className={styles.legend}>
          <strong>Add an Customer</strong>
        </legend>
        <div className={styles.card_content}>
          <div className={styles.select}>
            <select
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
              required="requred"
            >
              <option value={0}>Select a Customer</option>
              {customers?.map((customer) => (
                <option key={customer.customerId} value={customer.customerId}>
                  {customer.name} | {customer.contactNumber}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.select}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Reserving Date"
            />
          </div>

          <div className={styles.select}>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Strating Time"
            />
            <p> to </p>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              EndingTime
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
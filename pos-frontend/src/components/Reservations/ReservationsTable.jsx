import styles from "../../styles/Reservation/ReservationsTable.module.scss";
import { MdClose, MdCheck } from "react-icons/md";
import React from "react";
import classNames from "classnames";
import { getTimeString, getDateInFormat } from "../../utils";
import { deleteReservation } from "../../services/Reservations.service";

const ReservationTable = ({ reservations, isActionable, isAcceptable }) => {
  // console.log("reservations");
	const handleDelete = (e) => {
		console.log(reservations);
		deleteReservation(e);//.then(() => window.location.reload());
	};

  const dateExtract = (e) =>{
    // console.log(e);
    const y = e.split("T");
    return y[0];
  }

  const timeExtract = (e) =>{
    // console.log(e);
    const y = e.split("T");
    const u = y[1].split('Z');
    return u;
  }
  return (
		<div className={classNames(styles.container)}>
			<table className={styles.Table}>
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Contact Number</th>
						<th>Resrvation Date</th>
						<th>Resrvation Start Time</th>
						<th>Resrvation Start Time</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{reservations?.map((reservation, index) => {

						return (
							<tr key={index} >
								<td>{reservation.customer.name}</td>
								<td>{reservation.customer.contactNumber}</td>
								<td>{dateExtract(reservation.reservationTo)}</td>
								<td>{timeExtract(reservation.reservationFrom)}</td>
								<td>{timeExtract(reservation.reservationTo)}</td>

								<td className={styles.actionColCell}>
									<button
										className={classNames(styles.btn, styles.cancelBtn)}
										onClick={() => handleDelete(reservation.reservationId)}
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
		</div>
	);
};

export default ReservationTable;

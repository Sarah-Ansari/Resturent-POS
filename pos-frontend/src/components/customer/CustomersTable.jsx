import styles from "../../styles/Orders/OrdersTable.module.scss";
import classNames from "classnames";
import { MdClose } from "react-icons/md";
import { deleteCustomer } from "../../services/Customers.service";
import React, { useState } from "react";

const CustomersTable = ({ customers, isRemovable, refresher }) => {

	const handleDelete = (e) => {
		console.log(customers);
		deleteCustomer(e).then(() => window.location.reload());
	};


	return (
		<div className={classNames(styles.container)}>
			<table className={styles.Table}>
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Contact Number</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{customers?.map((customer, index) => {

						return (
							<tr key={index} >
								<td>{customer.name}</td>

								<td>{customer.contactNumber}</td>
								<td className={styles.actionColCell}>
									<button
										className={classNames(styles.btn, styles.cancelBtn)}
										onClick={() => handleDelete(customer.customerId)}
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

export default CustomersTable;

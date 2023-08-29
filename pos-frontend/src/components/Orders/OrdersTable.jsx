import styles from "../../styles/Orders/OrdersTable.module.scss";
import { MdClose, MdCheck } from "react-icons/md";
import React from "react";
import classNames from "classnames";
import { getTimeString, getDateInFormat, convertTimeToFormat } from "../../utils";
import CollapsibleMenuItemsTable from "./CollapsibleMenuItemsTable";
import { deleteOrder, markOrderComplete } from "../../services/Orders.service";

const OrdersTable = ({ orders, isActionable, isAcceptable, isRemovable, refresher }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#DFECB3"; // Light Yellow
      case "Processing":
        return "#FBEEE6"; // Light Orange
      case "Ready":
        return "#D5F5E3"; // Light Green
      case "Dining":
        return "#EBF5FB"; // Light Blue
      case "Completed":
        return "#F5EEF8"; // Light Purple
      default:
        return "#EAECEE"; // Light Gray
    }
  };

  // console.log(orders);
  return (
    <div className={classNames(styles.container)}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Order Items</th>
            <th>Customer Name</th>
            <th>Staff Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Contact Number</th>
            {isActionable && <th></th>}
            {isActionable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            if (order.completed !== isActionable) {
              return (
                <tr key={index} style={{ backgroundColor: getStatusColor(order.orderStatus) }}>
                  <td className={styles.firstCol}>
                    <CollapsibleMenuItemsTable menuItems={order.orderItems} />
                  </td>
                  <td>{order.customer.name}</td>
                  <td>{order.employee.name}</td>

                  <td>{getDateInFormat(new Date(order.orderDate))}</td>
                  <td>{convertTimeToFormat(order.orderDate)}</td>
                  <td>Rs. {order.grossTotal}.00</td>
                  <td>{order.customer.contactNumber}</td>
                  {isActionable && <td>
                    <button
                      className={classNames(styles.btn, styles.acceptBtn)}
                      onClick={() => markOrderComplete(order, refresher)}
                    >
                      <MdCheck />
                      Mark as Complete
                    </button>
                  </td>}

                  {isActionable && <td className={styles.cancelColCell}>{isRemovable && (
                    <button
                      className={classNames(styles.btn, styles.cancelBtn)}
                      onClick={() => deleteOrder(order, refresher)}
                    >
                      <MdClose />
                      Cancel
                    </button>
                  )}</td>
                  }
                </tr>
              );
            } else {
              return null; // Exclude completed orders
            }
          })}

        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
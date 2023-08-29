import { useState, useEffect } from "react";
import { handleForm } from "../../services/Orders.service";
import styles from "../../styles/Orders/OrderForm.module.scss";
import { calPrice } from "../../utils";
import { fetchStaff } from "../../services/Staff.service";
import { fetchCustomer } from "../../services/Customers.service";

import { fetchMenu } from "../../services/Menu.service";
import { CustomerForm } from "../customer/CustomerForm";

import { useSelector, useDispatch } from "react-redux";
import { fetchStaffMembers } from "../../actions/staffActions";
import { fetchMenuItems } from "../../actions/menuActions";
import { createOrder } from "../../actions/orderActions";

export const OrderForm = ({ onClose, CustomerForm, refresher }) => {
  const [customerId, setCustomerId] = useState(0);
  const [staffId, setStaffId] = useState(0);
  const [number, setNumber] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customers, setCustomers] = useState([]);


  const staff = useSelector(state => state.staff);


  const menuItems = useSelector((state) => state.menu);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchCustomer());
    dispatch(fetchStaffMembers());
    dispatch(fetchMenuItems());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCustomers = await fetchCustomer();
      setCustomers(fetchedCustomers);
    };

    fetchData();
  }, []);

  console.log(customers);
  console.log(staff);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      customerId: customerId,
      employeeId: staffId,
      orderItems: selectedItems.map((item) => ({
        itemId: item.itemId,
        quantity: itemQuantities[item.itemId]
      })),
      number: number,
      grossTotal: calPrice(selectedItems, itemQuantities)
    };

    try {
      dispatch(createOrder(data, refresher)); // Await the API call

      onClose();
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error here, if needed
    }
  };

  const handleItemAdd = (selectedItemId) => {
    console.log("printing from handleAdd selectedItemId " + selectedItemId)
    const selectedItem = menuItems.find((item) => item.itemId == selectedItemId);
    console.log("printing from handleAdd selectedItem " + JSON.stringify(selectedItem))
    if (!selectedItems.includes(selectedItem)) {
      setSelectedItems([...selectedItems, selectedItem]);
    }

    setItemQuantities({ ...itemQuantities, [selectedItemId]: parseInt(1) });


  };

  const handleQuantityChange = (event, itemId) => {
    setItemQuantities({ ...itemQuantities, [itemId]: event.target.value });
  };

  const handleItemRemove = (selectedItemId) => {
    var filteredSelectedItems = selectedItems.filter(
      (item) => {
        var boolean = parseInt(item.itemId) !== parseInt(selectedItemId)
        return boolean
      }
    )
    setSelectedItems(filteredSelectedItems);
  };

  const ShowCustomerForm = () => {
    CustomerForm = true;
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className={styles.legend}>
            <strong>Make a New Order</strong>
          </legend>
          <div className={styles.card_content}>
            <div className={styles.select}>

              <select
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
                required
              >
                {console.log("customerId" + customerId)}
                <option>Select a Customer</option>
                <option value="addCustomer">Add a Customer</option>
                {customers.map((customer, index) => (
                  <option key={index} value={customer.customerId}>
                    {customer.name} | {customer.phone == null ? "Phone not available" : customer.phone[0]}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select}>
              {customerId === "addCustomer" && (
                <button
                  className={styles.item_button}
                  onClick={() => CustomerForm()}
                >
                  Add a Customer
                </button>
              )}
            </div>
            <div className={styles.select}>
              {/* <p>Select Staff:</p> */}
              <select
                value={staffId}
                onChange={(event) => setStaffId(event.target.value)}
                required
              >
                <option value={0}>Select a Staff Member</option>
                {staff.map((staffMember, index) => (
                  <option key={index} value={staffMember.employeeId}>
                    {staffMember.name} | {staffMember.position}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select_multi}>
              {/* <p>Select Item :</p> */}
              <select multiple
                className={styles.select_multi_inside}
                defaultValue=""
                onClick={(input) => {
                  handleItemAdd(input.target.value);
                }
                }
                onKeyDown={(input) => { if (input.key === "ArrowRight") { handleItemAdd(parseInt(input.target.value, 10)); } }}
                id="item"
                name="item"
                required
              >
                <option disabled value="">
                  Select an Item
                </option>
                {menuItems.map((item) => (
                  <option key={item.itemId} value={item.itemId}>
                    {item.category} || {item.name} || {item.price}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selectItems}>
              {selectedItems.map((item) => (
                <div key={item.id} className={styles.showItems}>
                  <p>{item.name}</p>
                  <input
                    type="number"
                    min="1"
                    defaultValue={1}
                    value={itemQuantities[item.itemId] || parseInt(1)}
                    onChange={(e) => handleQuantityChange(e, item.itemId)}
                  />
                  <button
                    type="button"
                    onClick={() => handleItemRemove(item.itemId)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            {/* <div className={styles.select}>
              <p>Address &ensp;&ensp;:</p>
              <input
                type="text"
                value={address}
                onChange={(input) => setAddress(input.target.value)}
              />
            </div>
            <div className={styles.select}>
              <p>Telephone :</p>
              <input
                type="text"
                value={number}
                onChange={(input) => setNumber(input.target.value)}
              />
            </div> */}
            <div className={styles.select}>
              {/* <p>Price &emsp;&emsp;&ensp;:&ensp;</p> */}
              <p className={styles.price}>
                Rs. {calPrice(selectedItems, itemQuantities)}.00
              </p>
            </div>

            <button type="submit" className={styles.button}>
              Submit Order
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
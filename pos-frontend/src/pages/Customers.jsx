import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import styles from "../styles/Orders/Orders.module.scss";
import { useState, useEffect, useRef } from "react";
import { CustomerForm } from "../components/customer/CustomerForm";
import CustomersTable from "../components/customer/CustomersTable";
import { fetchCustomer } from '../services/Customers.service';
import { fetchcustomers } from '../actions/customerActions'
import { useDispatch, useSelector } from "react-redux";


export const Customers = () => {

  const dispatch = useDispatch();
  const [customers, setCustomers] = useState();


  const [showForm, setShowForm] = useState(false);
  const backgroundClick = useRef(null);
  const backgroundClick2 = useRef(null);
  const [shouldRefresh, setShouldRefresh] = useState(true)

  const handleRefreshData = () => {
    setShouldRefresh(false);
  };

  useEffect(() => {
    handlefetchCustomers();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      dispatch(fetchcustomers());
      console.log(customers)
      handleRefreshData();
    }


  }, [shouldRefresh, dispatch]);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick2);
    return () => {
      document.removeEventListener("click", handleBackgroundClick2);
    };
  }, []);

  const handlefetchCustomers = async () => {
    try {
      const response = await fetchCustomer();
      setCustomers(response);
      // console.log(response);
      // window.location.reload();
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === backgroundClick.current) {
      setShowForm(false);
    }
  };

  const handleBackgroundClick2 = (e) => {
    if (e.target === backgroundClick2.current) {
      setShowCustomerForm(false);
    }
  };
  console.log(customers)
  return (
    <>
      <Nav />
      <MenuPanel />
      <div className={styles.Hero}>
        <h1>Manage Customers</h1>

      </div>
      <div className={styles.container}>
        {!showForm && <button className={styles.button} onClick={() => setShowForm(true)}>
          Make New Customer
        </button>}
        {showForm && <div className={styles.cardContainer} ref={backgroundClick}>
          <CustomerForm
            onClose={() => {
              setShowForm(false);
            }}
            refresher={setShouldRefresh}
          />
        </div>}
      </div>
      <div className={styles.tableContainer}>
        <CustomersTable
          customers={customers}
          isRemovable={true}
          refresher={setShouldRefresh}
        />
      </div>
      {/* <MenuItemForm/> */}
    </>
  );
};
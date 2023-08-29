import { fetchOrders, handleForm } from '../services/Orders.service'; // Import the fetchOrders function


// Fetch orders from the backend
export const fetchOrdersList = () => {
  return async (dispatch) => {
    try {
      const orders = await fetchOrders(); // Use fetchOrders function
      dispatch(setOrders(orders)); // Call setOrders action after fetching
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
};

export const createOrder = (orderRequest, refresher) => {
  return async (dispatch) => {
    try {
      // Send the order request to the server and receive the response
      const response = await handleForm(orderRequest, refresher); // Replace with your API call
      console.log(response);
      if (response.menuItems === null) {
        response.menuItems = [];
      }

      // Dispatch the action with the response or any relevant data you want to update in the Redux store
      dispatch({
        type: 'CREATE_ORDER',
        payload: response, // Use the server response or relevant data
      });

      // You can also dispatch additional actions if needed
      // dispatch({ type: 'OTHER_ACTION', payload: ... });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
};


export const setOrders = (orders) => {
  return {
    type: 'SET_ORDERS',
    payload: orders,
  };
};

export const placeOrder = (order) => {
  return {
    type: 'PLACE_ORDER',
    payload: order,
  };
};

  // Add more order-related actions as needed

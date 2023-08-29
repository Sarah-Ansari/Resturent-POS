import { fetchCustomer } from '../services/Customers.service'; // Adjust the path as needed


// Fetch staff members from the backend
export const fetchcustomers = () => {
    return async (dispatch) => {
        try {
            const customers = await fetchCustomer(); // Use fetchStaff function
            dispatch(setCustomer(customers)); // Call setCustomer action after fetching
        } catch (error) {
            console.error('Error fetching customer members:', error);
        }
    };
};
export const setCustomer = (customers) => {
    return {
        type: 'SET_CUSTOMER',
        payload: customers,
    };
};

export const addCustomer = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customer,
    };
};

  // Add more staff-related actions as needed

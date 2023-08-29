const initialState = [];

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CUSTOMER':
      return action.payload;
    case 'ADD_CUSTOMER':
      return [...state, action.payload];
    // Handle other staff-related actions
    default:
      return state;
  }
};

export default customerReducer;

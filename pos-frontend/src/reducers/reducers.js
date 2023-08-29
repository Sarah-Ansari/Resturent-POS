import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';
import reservationReducer from './reservationReducer';
import staffReducer from './staffReducer';
import customerReducer from './customerReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  menu: menuReducer,
  orders: orderReducer,
  reservations: reservationReducer,
  staff: staffReducer,
  customer: customerReducer
});

export default rootReducer;

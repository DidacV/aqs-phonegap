import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import barcodeReducers from './pages/scan-barcode/reducers';
import qrReducers from './pages/scan-qr/reducers';

// Combine all reducers into one including the routes
const reducers = combineReducers({
  ...barcodeReducers,
  ...qrReducers,
  routing: routerReducer,
});

// Reset the state to undefined when the student has finished scanning
const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducer;

import {
  RECEIVE_QR_DATA,
  REQUEST_QR_DATA,
  RECEIVE_QR_DATA_FAIL,
} from '../constants';

const initialState = {
  qrdata: undefined,
  isFetching: false,
  requestFail: false,
  error: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_QR_DATA: {
      const { qrdata } = action;
      return {
        ...state,
        isFetching: false,
        qrdata,
      };
    }
    case REQUEST_QR_DATA:
      return {
        ...state,
        requestFail: false,
        isFetching: true,
      };
    case RECEIVE_QR_DATA_FAIL:
      return {
        ...state,
        isFetching: false,
        requestFail: true,
        error: action.err,
      };
    default:
      return state;
  }
};

export default reducer;

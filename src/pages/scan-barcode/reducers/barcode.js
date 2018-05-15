import {
  ATTENDANCE_CONF,
  ATTENDANCE_CONF_FAIL,
  SEND_ATTENDANCE,
} from '../constants';

const initialState = {
  attended: false,
  isSendingAttendance: false,
  attendanceFail: false,
  error: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ATTENDANCE_CONF: {
      return {
        ...state,
        isSendingAttendance: false,
        attended: true,
      };
    }
    case ATTENDANCE_CONF_FAIL:
      return {
        ...state,
        isSendingAttendance: false,
        attendanceFail: true,
        error: action.err,
      };
    case SEND_ATTENDANCE:
      return {
        ...state,
        isSendingAttendance: true,
        attended: false,
      };
    default:
      return state;
  }
};

export default reducer;

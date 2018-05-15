import RouteActions from '../../actions/route';
import Store from '../../store';
import * as Constants from './constants';
import { get, post } from '../../actions/api';
import { BASE_URL } from '../../util/apiConfig';

export default class Actions {
  static changePage(location) {
    RouteActions.changePage(location);
  }

  static studentAttend(studentData) {
    console.warn('POSTING', JSON.stringify(studentData));
    Store.dispatch({
      type: Constants.SEND_ATTENDANCE,
    });

    post(`${BASE_URL}/attend`, studentData)
      .then(() => {
        Store.dispatch({
          type: Constants.ATTENDANCE_CONF,
        });
      })
      .catch((err) => {
        console.log('ERROR', err);
        this.attendanceFail();
      });
  }

  static attendanceFail() {
    Store.dispatch({
      type: Constants.ATTENDANCE_CONF_FAIL,
    });
  }

  static getStudent(number, barcode) {
    let url = '';

    if (barcode) {
      url = `${BASE_URL}/student/barcode/${barcode}`;
    } else if (number) {
      url = `${BASE_URL}/student/number/${number}`;
    }

    console.info('URL AFTER', url);
    return new Promise((resolve, reject) => {
      get(url)
        .then((result) => {
          if (result.rows.length === 0) {
            return resolve(false);
          }

          return resolve(true);
        })
        .catch(err => reject(new Error('Error getting student', err)));
    });
  }
}

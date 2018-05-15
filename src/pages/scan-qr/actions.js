import RouteActions from '../../actions/route';
import Store from '../../store';
import * as Constants from './constants';
import { get } from '../../actions/api';
import { BASE_URL } from '../../util/apiConfig';

export default class Actions {
  static changePage(location) {
    RouteActions.changePage(location);
  }

  static requestQRdata(qrId) {
    Store.dispatch({
      type: Constants.REQUEST_QR_DATA,
    });

    get(`${BASE_URL}/qrdata/${qrId}`)
      .then((result) => {
        const qrdata = result.rows[0];
        if (qrdata) {
          this.receiveQRdata(qrdata);
        } else {
          this.failReceiveData('No such QR id');
        }
      })
      .catch((err) => {
        this.failReceiveData(err);
      });
  }

  static failReceiveData(err) {
    Store.dispatch({
      type: Constants.RECEIVE_QR_DATA_FAIL,
      err,
    });
  }

  static receiveQRdata(qrdata) {
    // console.log('ACTIONS RECEIVEQR', qrdata);
    Store.dispatch({
      type: Constants.RECEIVE_QR_DATA,
      qrdata,
    });
  }
}

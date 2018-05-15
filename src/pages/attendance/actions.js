import RouteActions from '../../actions/route';
import Store from '../../store';

export default class Actions {
  static changePage(location) {
    RouteActions.changePage(location);
  }

  static resetState() {
    Store.dispatch({
      type: 'RESET_STATE',
    });
  }
}

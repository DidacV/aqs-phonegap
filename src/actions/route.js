import { push } from 'react-router-redux';
import Store from '../store';

export default class Actions {
  static changePage(location) {
    console.log('CHANGE LOC', location);
    Store.dispatch(push(location));
  }
}

import React from 'react';
import InfoMsg from './infomsg';
import TapMe from './tapme';
import RouteActions from '../actions/route';

const ErrorPage = ({ msg }) => (
  <div>
    <InfoMsg msg={msg} />
    <TapMe onTap={() => RouteActions.changePage('/')}>
      <i className="fas fa-home" />
      <span>&nbsp; Back home</span>
    </TapMe>
  </div>
);

export default ErrorPage;

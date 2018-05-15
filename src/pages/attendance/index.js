import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfoMsg from '../../components/infomsg';
import TapMe from '../../components/tapme';
import Actions from './actions';

class AttendingPage extends Component {
  constructor() {
    super();

    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    Actions.resetState();
    Actions.changePage('/');
  }

  render() {
    const { attended, isSendingAttendance, attendanceFail } = this.props;

    let info;
    let btnEnabled = true;

    if (attended) {
      info = <InfoMsg msg="Attendend successfully" />;
      btnEnabled = true;
    } else if (isSendingAttendance) {
      info = <InfoMsg msg="Attending..." />;
      btnEnabled = false;
    } else if (attendanceFail) {
      info = <InfoMsg msg="An error occurred, try again." />;
    }

    return (
      <div>
        {info}
        <TapMe enabled={btnEnabled} onTap={this.goHome}>
          <i className="fas fa-home" />
          <span>&nbsp; Back home</span>
        </TapMe>
      </div>
    );
  }
}

AttendingPage.propTypes = {};

function mapStateToProps(state) {
  // Get qr data too. If we're in this page, it means we have it in state.
  const { attended, isSendingAttendance, attendanceFail } = state.barcode;
  const { attendance } = state.qr.qrdata;

  return {
    attended,
    isSendingAttendance,
    attendanceFail,
    attendance,
  };
}

export default connect(mapStateToProps)(AttendingPage);

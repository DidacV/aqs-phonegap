/* global navigator */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../actions';
import TapMe from '../../../components/tapme';
import InfoMsg from '../../../components/infomsg';
import TextInput from '../../../components/text-input';
import { parse } from 'path';

/**
 * Called if a student can't scan QR Code.
 * The
 */
class BarcodeFallback extends Component {
  constructor() {
    super();

    this.state = {
      studentNumber: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    // this.change = this.change.bind(this);
  }

  // change() {
  //   Actions.changePage('/qr');
  // }

  onSubmit() {
    const { studentNumber } = this.state;
    const { attendance } = this.props; // Get the attendance id

    // If it's not a number
    if (isNaN(studentNumber)) {
      navigator.notification.alert('Not a valid number');
      return;
    }

    console.warn('STD NUMBER', studentNumber);
    Actions.getStudent(studentNumber).then((valid) => {
      if (!valid) {
        navigator.notification.alert('Not a valid number');
        return;
      }

      const data = {
        attendance, // Attendance id
        sNumber: parseInt(studentNumber, 10), // sNumber is how REST api handles it
      };

      Actions.studentAttend(data);
      Actions.changePage('/attendance');
    });
  }

  goBack() {
    Actions.changePage('/scan-barcode');
  }

  handleChange(e) {
    this.setState({
      studentNumber: e.target.value,
    });
  }

  render() {
    const { studentNumber } = this.state;

    return (
      <div>
        <InfoMsg msg="Enter your student number:" />

        <TextInput
          name="studentNumber"
          value={studentNumber}
          onChange={this.handleChange}
        />
        <TapMe onTap={this.onSubmit} bottom={110}>
          <i className="fas fa-sign-in-alt" />
          <span>&nbsp; Submit</span>
        </TapMe>
        <TapMe onTap={this.goBack} bottom={50}>
          <i className="fas fa-arrow-left" />
          <span>&nbsp; Go back</span>
        </TapMe>
      </div>
    );
  }
}

BarcodeFallback.propTypes = {};

function mapStateToProps(state) {
  const { attendance } = state.qr.qrdata;

  // Get attendance. If we're in this page, it means we have it in state.
  return {
    attendance,
  };
}

export default connect(mapStateToProps)(BarcodeFallback);

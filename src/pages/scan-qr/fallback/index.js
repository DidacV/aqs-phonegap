import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from '../actions';
import TapMe from '../../../components/tapme';
import InfoMsg from '../../../components/infomsg';
import TextInput from '../../../components/text-input';

/**
 * Called if a student can't scan QR Code.
 * The
 */
class QRFallback extends Component {
  constructor() {
    super();

    this.state = {
      qrId: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    // this.change = this.change.bind(this);
  }

  onSubmit() {
    const { qrId } = this.state;

    // Make sure is not empty
    if (qrId) {
      Actions.requestQRdata(qrId);
      Actions.changePage('/scan-barcode');
    }
  }

  handleChange(e) {
    this.setState({
      qrId: e.target.value,
    });
  }

  goBack() {
    Actions.changePage('/');
  }

  render() {
    const { qrId } = this.state;

    return (
      <div>
        <InfoMsg msg="Enter the QR code you see on screen:" />

        <TextInput name="qrId" value={qrId} onChange={this.handleChange} />
        <TapMe onTap={this.onSubmit} bottom={110}>
          <i className="fas fa-sign-in-alt" />
          <span>&nbsp; Submit</span>
        </TapMe>
        <TapMe onTap={this.goBack} bottom={50}>
          <i className="fas fa-home" />
          <span>&nbsp; Go back home</span>
        </TapMe>
      </div>
    );
  }
}

QRFallback.propTypes = {};

export default QRFallback;

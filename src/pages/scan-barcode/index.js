/* global navigator device Camera alert window SpinnerPlugin */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from './actions';
import QRInfo from './qr-info';
import generalScanner from '../../util/barcode-reader';
import BarcodeReaderIOS from '../../util/barcode-reader-ios';
import TapMe from '../../components/tapme';
import InfoMsg from '../../components/infomsg';

/**
 * QR Scanning gets fired when this component is mounted.
 * If this component is called by the fallback, it will
 * wait for the qr data to be fetched and if it fails, it will go
 * back to the main page.
 */
class ScanBarcodePage extends Component {
  constructor() {
    super();

    this.scan = this.scan.bind(this);
    this.handleBarcode = this.handleBarcode.bind(this);
    this.barcodeFallback = this.barcodeFallback.bind(this);
    this.onPicSuccess = this.onPicSuccess.bind(this);
    this.onPicFail = this.onPicFail.bind(this);
    // this.showSpinner = this.showSpinner.bind(this);
  }

  // showSpinner(message) {
  //   // window.plugins.spinnerDialog.show('title', 'message', true);
  //   console.log("PLUGINS", typeof SpinnerPlugin);
  //   // cordova.exec(null, null, "SpinnerDialog", "show", ["hi", "hieo"]);
  // }

  onPicFail(message) {
    console.log('TAKENPICFAIL', message);
  }

  onPicSuccess(imageData) {
    const barcodeOptions = {
      // Set to false if the decoder should look for one barcode and then stop.
      // Increases performance.
      Multiple: false,

      // The formats that the decoder will look for.
      DecodeFormats: ['Codabar'],

      // ForceUnique just must makes sure that the callback function isn't repeatedly called
      // with the same barcode. Especially in the case of a video stream.
      ForceUnique: true,

      // Set to true if information about the localization should be recieved from the worker.
      LocalizationFeedback: false,

      // Set to true if checking orientation of the image should be skipped.
      // Checking orientation takes a bit of time for larger images, so if
      // you are sure that the image orientation is 1 you should skip it.
      SkipOrientation: false,
    };

    BarcodeReaderIOS.Config = barcodeOptions;

    // Initialise barcode reader
    BarcodeReaderIOS.Init();

    // Add the callback to the reader
    BarcodeReaderIOS.SetImageCallback((result) => {
      console.log('BARCODE RESULT', JSON.stringify(result));

      if (typeof SpinnerPlugin !== 'undefined') {
        SpinnerPlugin.activityStop();
      }

      const barcode = result.length === 0 ? null : result[0].Value;

      if (barcode === null) {
        navigator.notification.alert("Couldn't read the student number.");
      } else {
        this.handleBarcode(barcode);
      }

      // Remove picture after decoding it
      navigator.camera.cleanup();
    });

    // Show a spinner while it decodes
    const spinnerOpts = {
      dimBackground: true,
    };

    console.warn('SPINNER IS', typeof SpinnerPlugin);

    if (typeof SpinnerPlugin !== 'undefined') {
      SpinnerPlugin.activityStart('Decoding...', spinnerOpts);
    } else {
      navigator.notification.alert(
        'This might take a few seconds, please wait',
        null,
        'Decoding...',
      );
    }
    // Decode the image
    BarcodeReaderIOS.DecodeImage(imageData);
  }

  scan() {
    // If it's iOS, take a picture of the barcode and send it
    // to a different decoder
    if (device.platform === 'iOS') {
      const cameraOptions = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
      };

      navigator.camera.getPicture(
        this.onPicSuccess,
        this.onPicFail,
        cameraOptions,
      );
    } else {
      generalScanner((error, result) => {
        console.log('GNERAL SCANNER barcode', result);
        if (error) {
          throw error;
        }

        const data = result.text;

        let barcode;
        try {
          barcode = parseInt(data);
          this.handleBarcode(barcode);
        } catch (e) {
          Actions.attendanceFail();
        }
      });
    }
  }

  handleBarcode(barcode) {
    console.log('BARCODE', barcode);
    // Use barcode and attendance id from state and send it
    const {
      attendance,
    } = this.props.qrdata; // Get the attendance id

    // Check if the barcode belongs to a student card
    Actions.getStudent(null, barcode).then((valid) => {
      if (!valid) {
        navigator.notification.alert('Not a valid barcode');
        return;
      }

      const data = {
        attendance, // Attendance id
        barcode: parseInt(barcode, 10),
      };

      Actions.studentAttend(data);
      // Delegate the handling of final state to the attendance page
      Actions.changePage('/attendance');
    });
  }

  barcodeFallback() {
    Actions.changePage('/scan-barcode/fallback');
  }

  render() {
    const {
      qrdata,
      isFetching,
      requestFail,
      error,
    } = this.props;
      // console.log('RENDER INDEX QR22', qrdata);

    let info = null;
    let btnEnabled = true;

    console.log('RECEIVEQRbarcode', JSON.stringify(qrdata));

    if (isFetching) {
      info = <InfoMsg msg="Loading..." />;
      btnEnabled = false;
    } else if (requestFail) {
      if (error) {
        navigator.notification.alert(error, null, 'Error');
      }
      Actions.changePage('/');
      return null;
    } else {
      const dataError = 'Invalid data';
      // Check for valid data
      if (!qrdata) {
        navigator.notification.alert(dataError);
        Actions.changePage('/');
        return null;
      }
      // check for payload, if it doesn't have professor_name, it's the wrong code
      if (!qrdata.professor_name) {
        navigator.notification.alert(dataError);
        Actions.changePage('/');
        return null;
      }

      info = (<QRInfo data={
            qrdata
          }
      />);
    }

    return (
      <div>
        {' '}
        {info}{' '}
        <TapMe enabled={btnEnabled} onTap={this.scan} bottom={110}>
          <i className="fas fa-qrcode" />
          <span> &nbsp; Scan your student card</span>
        </TapMe>{' '}
        <TapMe enabled={btnEnabled} onTap={this.barcodeFallback} bottom={50}>
          <i className="fas fa-qrcode" />
          <span> &nbsp; Can&#39;t scan your student card?</span>
        </TapMe>
      </div>
    );
  }
}

ScanBarcodePage.propTypes = {};

function mapStateToProps(state) {
  const {
    qrdata,
    isFetching,
    requestFail,
    error,
  } = state.qr;
  return {
    qrdata,
    isFetching,
    requestFail,
    error,
  };
}

export default connect(mapStateToProps)(ScanBarcodePage);

/* global window cordova navigator document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TapMe from '../../components/tapme';
import InfoMsg from '../../components/infomsg';
import Actions from './actions';
import generalScanner from '../../util/barcode-reader';

class ScanQRPage extends Component {
  constructor() {
    super();

    this.state = {
      atUEA: false,
      canRequestLoc: false,
    };

    this.qrFallback = this.qrFallback.bind(this);
    this.openScanner = this.openScanner.bind(this);
    this.createUEAPolygon = this.createUEAPolygon.bind(this);
    this.openAtUEA = this.openAtUEA.bind(this);
    this.checkLocation = this.checkLocation.bind(this);
    this.requestLocation = this.requestLocation.bind(this);
    this.onResume = this.onResume.bind(this);

    document.addEventListener('resume', this.onResume);
    // this.requestLocation();
  }

  componentWillMount() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDNr8984EyKVSWQLcjwRNFJPUPDuFNkbCk&libraries=geometry';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  onResume() {
    this.requestLocation();
  }

  createUEAPolygon() {
    const { LatLng, Polygon } = window.google.maps;

    const ueaCoords = [
      new LatLng(52.621679, 1.231756),
      new LatLng(52.621132, 1.232743),
      new LatLng(52.621002, 1.233559),
      new LatLng(52.620351, 1.234159),
      new LatLng(52.619777, 1.235533),
      new LatLng(52.619908, 1.236262),
      new LatLng(52.620012, 1.237679),
      new LatLng(52.620168, 1.238451),
      new LatLng(52.62009, 1.239052),
      new LatLng(52.619934, 1.239696),
      new LatLng(52.619673, 1.240811),
      new LatLng(52.62108, 1.243043),
      new LatLng(52.621054, 1.245575),
      new LatLng(52.620741, 1.246219),
      new LatLng(52.620611, 1.246648),
      new LatLng(52.621236, 1.247334),
      new LatLng(52.628479, 1.247764),
      new LatLng(52.627853, 1.23991),
      new LatLng(52.627541, 1.23682),
      new LatLng(52.627202, 1.235876),
      new LatLng(52.622513, 1.233001),
      new LatLng(52.621862, 1.2321),
      new LatLng(52.621627, 1.232014),
    ];

    const ueaPolygon = new Polygon({
      paths: ueaCoords,
    });

    return ueaPolygon;
  }

  openAtUEA() {
    const { notification } = navigator;

    const { alert } = notification;

    // Create a polygon boundary to check the current location against
    const ueaPolygon = this.createUEAPolygon();

    // Get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const { geometry, LatLng } = window.google.maps;

        const { poly } = geometry;
        // const currentLoc = new LatLng(latitude, longitude);
        const currentLoc = new LatLng(52.62428448603148, 1.2409186363220215);

        console.log('LOCA', poly.containsLocation(currentLoc, ueaPolygon));

        const atUEA = poly.containsLocation(currentLoc, ueaPolygon);
        // If student is in UEA
        this.setState({
          ...this.state,
          atUEA,
        });
      },
      (error) => {
        if (error.PERMISSION_DENIED) {
          alert('This app requires location to work.');
        } else {
          alert('There was an error getting location.');
        }
      },
    );
  }

  openScanner() {
    generalScanner((error, result) => {
      if (result.cancelled) {
        Actions.changePage('/');
      } else {
        const data = result.text;

        let qrdata;
        try {
          qrdata = JSON.parse(data);
        } catch (e) {
          qrdata = undefined;
        }

        console.log('INDEX SCAN QR', JSON.stringify(qrdata));
        Actions.receiveQRdata(qrdata);
        Actions.changePage('/scan-barcode');
      }
    });
  }

  qrFallback() {
    console.log('test qr fallback');
    Actions.changePage('/scan-qr/fallback');
  }

  checkLocation() {
    const { locationAccuracy } = cordova.plugins;
    const { request, REQUEST_PRIORITY_HIGH_ACCURACY } = locationAccuracy;
    request(
      (success) => {
        // Check if we're at UEA
        this.openAtUEA();
      },
      (error) => {
        console.log('error', error);
      },
      REQUEST_PRIORITY_HIGH_ACCURACY,
    );
  }

  requestLocation() {
    // const { alert, confirm } = navigator.notification;
    const { diagnostic } = cordova.plugins;

    const {
      isLocationAvailable,
      getLocationAuthorizationStatus,
      permissionStatus,
      switchToSettings,
    } = diagnostic;

    const { GRANTED, GRANTED_WHEN_IN_USE, DENIED } = permissionStatus;

    // returns true if both the device setting is enabled
    // AND the application is authorized to use location
    isLocationAvailable((available) => {
      // Modify state so the right message is displayed
      this.setState({
        ...this.state,
        canRequestLoc: available,
      });

      // If it's not available
      if (!available) {
        getLocationAuthorizationStatus((status) => {
          switch (status) {
            case GRANTED:
            case GRANTED_WHEN_IN_USE:
              console.log('GRANTED');
              this.setState({
                ...this.state,
                canRequestLoc: true,
              });
              break;
            case DENIED: {
              // Prepare confirm prompt
              const confButtons = ['Yes', 'No'];
              const confTitle = 'Location permission is required';
              const reqLocMsg =
                "This app needs location to confirm you're in the lecture. \nWould you like to open the Settings page to manually allow location for the app?";
              const confirmCb = (i) => {
                // If student taps 'Yes' button
                if (i === 1) {
                  navigator.notification.alert(
                    'The Settings page for the app will now open. Select "Location" and set it to "Always" then return to this app via the Home screen',
                    switchToSettings,
                    'Opening Settings page',
                  );
                }
              };

              // Display confirm prompt
              navigator.notification.confirm(
                reqLocMsg,
                confirmCb,
                confTitle,
                confButtons,
              );
              break;
            }
            default:
              console.log('NOT GRANTED');
          }
        });
        console.log('NOT AVAILABLE');
      }
    });
  }

  // Temporal fix for when diagnostic plugin does not work
  enableUEAState() {
    this.setState({
      ...this.state,
      atUEA: true,
    });
  }

  render() {
    const { atUEA, canRequestLoc } = this.state;
    let info = null;
    let btnEnabled = false;

    // Ask for location request
    if (cordova.plugins.diagnostic) {
      if (!canRequestLoc) {
        info = (
          <div>
            <InfoMsg msg="This app needs location to work." />
            <TapMe onTap={this.requestLocation} bottom={170}>
              <i className="fas fa-sliders-h" />
              <span> &nbsp; Request location</span>
            </TapMe>
          </div>
        );
      } else {
        info = (
          <div>
            <InfoMsg msg="Tap to check your location." />
            <TapMe onTap={this.checkLocation} bottom={170}>
              <i className="fas fa-sliders-h" />
              <span> &nbsp;Check again</span>
            </TapMe>
          </div>
        );
      }
    } else {
      this.enableUEAState();
    }

    if (atUEA) {
      info = (
        <InfoMsg msg="Please scan the QR Code shown in the screen to start." />
      );
      btnEnabled = true;
    }

    return (
      <div>
        {' '}
        {info}{' '}
        <TapMe onTap={() => alert('android test')} bottom={220}>
          <i className="fas fa-qrcode" />
          <span> &nbsp; android test</span>
        </TapMe>{' '}
        <TapMe enabled={btnEnabled} onTap={this.openScanner} bottom={110}>
          <i className="fas fa-qrcode" />
          <span> &nbsp; Scan QR Code</span>
        </TapMe>{' '}
        <TapMe enabled={btnEnabled} onTap={this.qrFallback} bottom={50}>
          <i className="fas fa-qrcode" />
          <span> &nbsp; Can&#39;t scan the QR Code?</span>
        </TapMe>
      </div>
    );
  }
}

ScanQRPage.propTypes = {};

export default ScanQRPage;

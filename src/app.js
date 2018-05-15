import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import ScanQR from './pages/scan-qr';
import ScanQRFallback from './pages/scan-qr/fallback';
import BarcodePage from './pages/scan-barcode';
import BarcodePageFallback from './pages/scan-barcode/fallback';
import AttendancePage from './pages/attendance';
import Header from './components/header';

// Switch will match a unique path, and Route will render the component for that
// route
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={ScanQR} />
        <Route exact path="/scan-qr/fallback" component={ScanQRFallback} />
        <Route exact path="/scan-barcode" component={BarcodePage} />
        <Route
          exact
          path="/scan-barcode/fallback"
          component={BarcodePageFallback}
        />
        <Route exact path="/attendance" component={AttendancePage} />
      </Switch>
    </div>
  );
}

export default withRouter(App);

/* global cordova */

// Wrapper for the plugin scanner
const generalScanner = (callback) => {
  cordova.plugins.barcodeScanner.scan(
    result =>
      callback(null, result),
    error => callback(error),
    {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: false, // Android, launch with the torch switched on (if available)
      saveHistory: true, // Android, save scan history (default false)
      prompt: 'Place a barcode inside the scan area', // Android
      // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      resultDisplayDuration: 500,
      // formats : "", // default: all but PDF_417 and RSS_EXPANDED
      // orientation : "landscape",
      // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: false, // iOS
      disableSuccessBeep: false, // iOS and Android
    },
  );
};

export default generalScanner;

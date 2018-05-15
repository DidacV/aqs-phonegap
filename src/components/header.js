import React from 'react';

const Header = () => (
  <div
    className="header"
    style={{
      boxShadow: '0 0.25rem 0.125rem 0 rgba(0,0,0,.05)',
      padding: '1rem',
      textAlign: 'center',
      fontWeight: '600',
    }}
  >
    <span className="content">Attendance QR System</span>
  </div>
);

export default Header;

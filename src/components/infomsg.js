import React from 'react';

const InfoMsg = ({ msg }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '3rem',
      fontSize: '150%',
      position: 'relative',
      bottom: '50%',
    }}
    className="info-msg"
  >
    {msg}
  </div>
);

export default InfoMsg;

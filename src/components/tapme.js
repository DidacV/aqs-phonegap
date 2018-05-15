import React from 'react';
import Tappable from 'react-tappable/lib/Tappable';

const TapMe = (props) => {
  const {
 children, onTap, bottom, enabled = true 
} = props;

  const pointerEvents = enabled ? 'all' : 'none';
  const opacity = enabled ? 1 : 0.5;
  return (
    <Tappable
      style={{
        position: 'absolute',
        display: 'block',
        fontSize: '120%',
        right: '50%',
        WebkitTransform: 'translate(50%, 0)',
        transform: 'translate(50%, 0)',
        WebkitAppearance: 'none',
        borderRadius: '2px',
        background: '#efefef',
        color: '#666666',
        padding: '10px',
        width: '300px',
        textAlign: 'center',
        textDecoration: 'none',
        boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
        bottom: `${bottom}px`,
        pointerEvents,
        opacity,
      }}
      onTap={onTap}
    >
      {children}
    </Tappable>
  );
};

export default TapMe;

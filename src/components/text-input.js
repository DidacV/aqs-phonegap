import React from 'react';

const TextInput = (props) => {
  const { name, value, onChange } = props;
  return (
    <input
      style={{
        display: 'inline-block',
        WebkitBoxSizing: 'content-box',
        MozBoxSizing: 'content-box',
        boxSizing: 'content-box',
        padding: '10px 20px',
        border: '1px solid #b7b7b7',
        WebkitBorderRadius: '3px',
        borderRadius: '3px',
        font: 'normal 16px/normal',
        color: 'rgba(0,142,198,1)',
        OTextOverflow: 'clip',
        textOverflow: 'clip',
        background: 'rgba(252,252,252,1)',
        WebkitBoxShadow: '2px 2px 2px 0 rgba(0,0,0,0.2) inset',
        boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.2) inset',
        textShadow: '1px 1px 0 rgba(255,255,255,0.66) ',
        WebkitTransition: 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        MozTransition: 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        oTransition: 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        transition: 'all 200ms cubic-bezier(0.42, 0, 0.58, 1)',
        position: 'absolute',
        right: '50%',
        transform: 'translate(50%, 0)',
      }}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;

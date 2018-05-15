import React from 'react';
import InfoMsg from '../../components/infomsg';
// import '../css/module.css';

const QRInfo = ({ data }) => {
  const liStyle = {
    padding: '1rem',
    boxShadow: 'inset 0 0.25rem 0.125rem 0 rgba(0,0,0,.5)',
    borderRadius: '0.25rem',
    backgroundColor: '#343a40',
    margin: '1rem 0 1rem 0',
  };
  // console.log('QRINFO', props);
  const { professor_name, module_code, activity_type } = data;

  return (
    <div>
      <InfoMsg msg="Class details" />
      <div
        className="module"
        style={{
          padding: '1rem',
          position: 'relative',
          color: 'white',
        }}
      >
        <ul
          className="details"
          style={{
            listStyle: 'none',
            width: '70%',
            margin: 'auto',
            textAlign: 'center',
            padding: '0',
            overflowWrap: 'break-word',
          }}
        >
          {/* <li className="class-details" style={liStyle}> */}
          {/* </li> */}
          <li className="professor" style={liStyle}>
            {professor_name}
          </li>
          <li className="title" style={liStyle}>
            {module_code}
          </li>
          <li className="activity" style={liStyle}>
            {activity_type}
          </li>
          {/* <li className="code">{module_code}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default QRInfo;

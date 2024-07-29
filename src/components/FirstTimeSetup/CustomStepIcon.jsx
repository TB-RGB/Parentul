import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';

const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;

  const iconStyles = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: active ? '#FFA500' : completed ? '#4CAF50' : '#808080',
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid',
    borderColor: active ? '#FFA500' : completed ? '#4CAF50' : '#808080',
  };

  return (
    <div style={iconStyles}>
      {completed ? (
        <CheckIcon style={{ fontSize: 20 }} />
      ) : (
        <span style={{ fontSize: 16 }}>{icon}</span>
      )}
    </div>
  );
};

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

export default CustomStepIcon;
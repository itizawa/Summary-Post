
import React from 'react';
import PropTypes from 'prop-types';

function TriviaManageDropdown(props) {

  return (
    <div className="btn-group">
      <button type="button" className="btn btn-outline-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        manage
      </button>
      <div className="dropdown-menu dropdown-menu-right">
        <button className="dropdown-item" type="button">Something else here</button>
      </div>
    </div>
  );
}

TriviaManageDropdown.propTypes = {
  count: PropTypes.number,
};

export default TriviaManageDropdown;

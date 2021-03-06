/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

function TagIcon({ width, height, fillColor }) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" className="bi bi-tags-fill" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 7.586 1H3zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      <path d="M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
    </svg>
  );
}

TagIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fillColor: PropTypes.string,
};

TagIcon.defaultProps = {
  width: '1em',
  height: '1em',
  fillColor: 'currentColor',
};

export default TagIcon;

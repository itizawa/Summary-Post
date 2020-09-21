import React from 'react';
import PropTypes from 'prop-types';

function TriviaCard(props) {
  const {
    _id, forwardText, backwardText, acquisitionCount,
  } = props.trivia;

  /**
   * open trivia modal
   * @param {string} id id of trivia
   */
  function openTriviaModalHandler(id) {
    if (props.onClickTriviaCard != null) {
      props.onClickTriviaCard(id);
    }
  }

  let textColor = '';
  if (acquisitionCount > 50) {
    textColor = 'gold';
  }
  else if (acquisitionCount > 20) {
    textColor = 'silver';
  }
  else if (acquisitionCount > 1) {
    textColor = 'bronze';
  }

  return (
    <div className="card cursor-pointer shadow-sm" onClick={() => { openTriviaModalHandler(_id) }}>
      <div className="img-box-fix-aspect">
        <img src={`https://trivia-ogp.vercel.app/api/ogp?forwardText=${forwardText}&backwardText=${backwardText}`} alt={forwardText} />
      </div>
      <span className="ml-auto count-for-trivia-card">
        <span className={`mr-2 count-text text-${textColor}`}>
          {acquisitionCount}
        </span>
        へえ
      </span>
    </div>
  );
}

TriviaCard.propTypes = {
  trivia: PropTypes.object.isRequired,
  onClickTriviaCard: PropTypes.func,
};

export default TriviaCard;

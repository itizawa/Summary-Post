import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

import appContainer from '@containers/appContainer';
import TriviaCard from '@components/Trivia/TriviaCard';
import TriviaModal from '@components/Trivia/TriviaModal';

function TriviaList(props) {
  const [triviaForModal, setTriviaForModal] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [hasmore, setHasmore] = useState(false);
  const [triviasList, setTriviasList] = useState(null);
  const { apiGet } = appContainer.useContainer();

  let url;
  if (props.tagId != null) {
    url = `/tags/${props.tagId}/pages`;
  }
  else {
    url = '/trivias/list';
  }

  useEffect(() => {
    async function fetchTriviaList() {
      const data = await apiGet(`${url}?page=${activePage}`, { page: activePage });
      setHasmore(data.hasNextPage);
      if (triviasList == null) {
        return setTriviasList(data.docs);
      }
      setTriviasList([...triviasList, ...data.docs]);
    }
    fetchTriviaList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  if (!triviasList) {
    const Skeletons = [];

    for (let index = 0; index < 10; index++) {
      Skeletons.push(<Skeleton key={index} className="box-fix-aspect mb-3" />);
    }

    return (
      <>
        {Skeletons}
      </>
    );
  }

  /**
   * open trivia modal
   * @param {string} id id of trivia
   */
  function onClickTriviaCard(id) {
    setTriviaForModal(id);
  }

  /**
   * close trivia modal
   * @param {string} id id of trivia
   */
  function onCloseModal() {
    setTriviaForModal(null);
  }

  return (
    <InfiniteScroll
      dataLength={triviasList.length}
      next={() => setActivePage(activePage + 1)}
      hasMore={hasmore}
      loader={<Skeleton className="box-fix-aspect mb-3" />}
      endMessage={<p className="text-center">これで全てです</p>}
    >
      {triviasList.map((trivia) => {
        return (
          <div className="mb-3" key={trivia._id}>
            <TriviaCard trivia={trivia} onClickTriviaCard={onClickTriviaCard} />
            <TriviaModal trivia={trivia} isOpen={triviaForModal === trivia._id} onClose={onCloseModal} />
          </div>
        );
      })}
    </InfiniteScroll>
  );

}

TriviaList.propTypes = {
  tagId: PropTypes.string,
  index: PropTypes.number,
};

export default TriviaList;

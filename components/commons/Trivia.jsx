import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { useSession } from 'next-auth/client';

import { fromTimeStampToDate } from '@lib/utils/fromTimeStampToDate';
import { useDebouncedCallback } from 'use-debounce';
import { toastError } from '@utils/toaster';

import appContainer from '@containers/appContainer';
import ArrowInRight from './atoms/svg/ArrowInRight';

function Trivia(props) {
  const { apiPut, apiGet } = appContainer.useContainer();

  const [session, isLoading] = useSession();

  const { trivia } = props;
  const creator = props.trivia?.creator;

  const triviaCardEl = useRef();
  const shareUrl = `https://summary-post.vercel.app/trivias/${trivia?._id}`;
  const [count, setCount] = useState('--');

  if (trivia == null) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const retrieveAdmirations = useCallback(async() => {
    // guest user
    if (session == null) {
      return;
    }

    try {
      const res = await apiGet(`/trivias/${trivia?._id}/admirations`);
      const count = res?.data?.count || 0;
      return setCount(count);
    }
    catch (error) {
      toastError(error, 'Error');
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [session]);

  function generateFlowingWords() {
    const div = document.createElement('div');
    div.classList.add('trivia-scroll');
    div.innerText = 'へぇ';
    triviaCardEl.current.prepend(div);
  }

  async function updateOwnAdmiration() {
    // guest user
    if (session == null) {
      return;
    }

    try {
      await apiPut(`/trivias/${trivia?._id}/admirations`, { count });
    }
    catch (error) {
      toastError(error, 'Error');
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [debouncedCallback] = useDebouncedCallback(
    () => {
      updateOwnAdmiration(count);
    }, 500,
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    retrieveAdmirations();
  }, [retrieveAdmirations]);

  function pushHeButtonHandler() {
    setCount(count + 1);
    generateFlowingWords();
    debouncedCallback();
  }

  return (
    <>
      <div>
        <img height="24px" className="rounded-circle bg-white mr-2" src={creator?.image} />
        <span className="text-center">{creator?.name} </span><br />
      </div>
      <div className="d-flex">
        <span className="mr-auto">{fromTimeStampToDate(trivia?.createdAt)}</span>
        <span>合計 {trivia?.acquisitionCount} へえ</span>
      </div>
      <div className="trivia-card" ref={triviaCardEl}>
        <img
          width="100%"
          height="auto"
          src={`https://trivia-ogp.vercel.app/api/ogp?forwardText=${trivia?.forwardText}&backwardText=${trivia?.backwardText}&isShow=true`}
          className="trivia-card-img rounded"
        />
      </div>
      {(session == null && !isLoading) && (
        <>
          <p className="alert alert-info my-3 text-center">
            <span className="mr-2">ログインして <b>へぇ</b> をカウントしよう</span>
            <Link href="/login">
              <a className="text-center">
                <ArrowInRight />
                <span className="ml-2">login</span>
              </a>
            </Link>
          </p>
        </>
      )}
      <div className="row mt-2">
        <div className="col-4">
          {count} へえ
        </div>
        <div className="col-4 text-center">
          <button
            type="button"
            className="btn btn-info btn-trivia text-snow rounded-circle"
            onClick={pushHeButtonHandler}
            disabled={count >= 20}
          >
            へぇ
          </button>
        </div>
        <div className="col-4 text-right">
          <a
            className="btn text-white btn-twitter"
            href={`https://twitter.com/intent/tweet?text=${shareUrl}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </>
  );
}

Trivia.propTypes = {
  trivia: PropTypes.object,
};


export default Trivia;

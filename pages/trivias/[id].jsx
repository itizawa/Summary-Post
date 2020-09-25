import React from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import axios from 'axios';

import appContainer from '@containers/appContainer';

import Trivia from '../../components/Trivia/Trivia';
import TriviaManageDropdown from '../../components/Trivia/TriviaManageDropdown';

function Page({ pageProps }) {
  const { trivia } = pageProps;
  const { currentUser } = appContainer.useContainer();
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const url = `https://trivia-ogp.vercel.app/api/ogp?forwardText=${trivia?.forwardText}&backwardText=${trivia?.backwardText}`;

  return (
    <>
      <Head>
        <title>{trivia?.forwardText}{trivia?.backwardText}</title>
        <meta property="og:image" content={url} />
        <meta property="og:description" content={trivia?.bodyText} />
      </Head>
      <div className="bg-snow rounded mt-3 p-3">
        <div className="d-flex mb-3">
          <button type="button" className="btn btn-outline-light btn-sm" onClick={() => { Router.push('/list') }}>リストに戻る</button>
          {currentUser?._id === trivia?.creator?._id && (
            <div className="ml-auto">
              <TriviaManageDropdown triviaId={trivia?._id} />
            </div>
          )}
        </div>
        {trivia != null ? (
          <Trivia trivia={trivia} />
        )
        : (<p>Trivia が存在しません</p>)}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const hostUrl = process.env.SITE_URL || 'http://localhost:3000';

  const res = await axios.get(`${hostUrl}/api/trivias/list?page=1`);

  const { docs } = await res.data;
  const paths = docs.map(doc => `/trivias/${doc._id}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  let trivia;

  const hostUrl = process.env.SITE_URL;

  try {
    const res = await axios.get(`${hostUrl}/api/trivias/${params.id}`);
    trivia = res?.data?.trivia;
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    trivia = null;
  }

  return {
    props: { trivia }, // will be passed to the page component as props
  };
}

Page.propTypes = {
  pageProps: PropTypes.object.isRequired,
};


export default Page;

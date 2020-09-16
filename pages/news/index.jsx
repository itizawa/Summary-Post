import React from 'react';
import Head from 'next/head';

const IndexPage = () => (
  <>
    <Head>
      <title>News</title>
    </Head>
    <div className="bg-snow rounded mt-3 p-3">
      <h1 className="text-center border-bottom mb-3">News 一覧</h1>
      <ul className="list-group">
        <li className="list-group-item">β版をリリースしました</li>
      </ul>
    </div>
  </>
);

export default IndexPage;

import React from 'react';
import Router from 'next/router';
import Head from 'next/head';

import Pencil from '@components/commons/icons/Pencil';
import ViewList from '@components/commons/icons/ViewList';

const IndexPage = () => (
  <>
    <Head>
      <title>トリビアの泉</title>
    </Head>
    <div className="bg-snow rounded mt-3 p-3">
      <div className="img-box-fix-aspect">
        <img className="mb-3" src="/eye-catch@2x.png" />
      </div>
      「生きていく上で何の役にも立たない無駄な知識、<br />しかし、つい人に教えたくなってしまうような<b>トリビア（雑学・知識）</b>」
      <br />
      共有するサイトです。
      <div className="my-5">
        <div className="row">
          <div className="col-12 col-md-6 px-2 mb-3 mb-md-0">
            <button type="button" className="btn btn-orange text-white w-100" onClick={() => { Router.push('/new') }}>
              <Pencil />
              <span className="ml-2">
                トリビアを作る
              </span>
            </button>
          </div>
          <div className="col-12 col-md-6 px-2 mb-3 mb-md-0">
            <button type="button" className="btn btn-teal text-white w-100" onClick={() => { Router.push('/list') }}>
              <ViewList />
              <span className="ml-2">
                トリビアを見る
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default IndexPage;

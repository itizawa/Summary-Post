import React from 'react';
import Head from 'next/head';

import TriviaListContainer from '../containers/TriviaListContainer';
import TriviaCard from '../components/commons/TriviaCard';

function ListPage() {
  const { triviasList } = TriviaListContainer.useContainer();

  return (
    <>
      <Head>
        <title>トリビア一覧</title>
      </Head>
      <div className="bg-snow rounded mt-3 p-3">
        <h1 className="text-center">トリビア一覧</h1>
        {triviasList.map((trivia) => {
          return (
            <div className="mb-3" key={trivia._id}>
              <React.Suspense fallback={<p>...loading</p>}>
                <TriviaCard trivia={trivia} />
              </React.Suspense>
            </div>
          );
        })}
      </div>
    </>
  );
}


export default ListPage;

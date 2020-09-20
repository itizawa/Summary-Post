import React from 'react';
import Link from 'next/link';

import Pencil from './icons/Pencil';
import Home from './icons/Home';
import ViewList from './icons/ViewList';
import NewsIcon from './icons/NewsIcon';

function FixedFooter() {
  return (
    <nav className="navbar bg-info fixed-bottom row d-md-none">
      <div className="col text-center">
        <Link href="/">
          <a className="text-white text-center">
            <Home width="24px" height="24px" /><br />
            <span className="ml-1 align-bottom">Home</span>
          </a>
        </Link>
      </div>
      <div className="col text-center">
        <Link href="/list">
          <a className="text-white text-center">
            <ViewList width="24px" height="24px" /><br />
            <span className="ml-1 align-bottom">List</span>
          </a>
        </Link>
      </div>
      <div className="col text-center">
        <Link href="/new">
          <a className="text-white text-center">
            <Pencil width="24px" height="24px" /><br />
            <span className="ml-1 align-bottom">Create</span>
          </a>
        </Link>
      </div>
      <div className="col text-center">
        <Link href="/news">
          <a className="text-white text-center">
            <NewsIcon width="24px" height="24px" /><br />
            <span className="ml-1 align-bottom">News</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}

export default FixedFooter;

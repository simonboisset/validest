import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';

const HomepageHeader = () => {
  return (
    <header className={clsx('hero hero--primary')}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="hero__title ">validest</h1>
        <p className="hero__subtitle">typescript schema validation</p>
        <div className="buttons">
          <Link className="button button--secondary button--lg" to="/docs/intro">
            My first schema
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomepageHeader;

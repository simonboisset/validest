import Layout from '@theme/Layout';
import React from 'react';
import HomepageFeatures from '../components/HomepageFeatures';
import HomepageHeader from '../components/HomepageHeader';

export default function Home(): JSX.Element {
  return (
    <Layout title={`Typescript schema validation`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main style={{ width: '100%' }}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

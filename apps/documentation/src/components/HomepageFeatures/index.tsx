import React from 'react';
import Feature from './Feature';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section style={{ display: 'flex', alignItems: 'center', padding: '2rem 0', width: '100%' }}>
      <div className="container">
        <div className="row">
          <Feature
            title="Type safety"
            Svg={require('@site/static/img/typescript.svg').default}
            description="Written with typescript and for typescript."
          />
          <Feature
            title="Lightweight"
            Svg={require('@site/static/img/1kb.svg').default}
            description="< 1kb for the core package. For comparaison yup is 30x larger."
          />
          <Feature
            title="Customizable"
            Svg={require('@site/static/img/code-schema.svg').default}
            description="Write your own schema and use it with the core package for validation."
          />

          <Feature
            title="Modulable"
            Svg={require('@site/static/img/puzzle.svg').default}
            description="Install only the core package and the shemas you need. Nothing else. Each shema is published on his hown package and could be installed alone."
          />
          <Feature
            title="Form validation tools"
            Svg={require('@site/static/img/form-validation.svg').default}
            description="Form validation tools for front and back."
          />
          <Feature
            title="Framework agnostic"
            Svg={require('@site/static/img/react-remix.svg').default}
            description="Works with all js ecosystem. There is allready package for React and Remix form validation."
          />
        </div>
      </div>
    </section>
  );
}

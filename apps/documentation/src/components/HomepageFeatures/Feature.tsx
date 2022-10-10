import clsx from 'clsx';
import React, { ReactNode } from 'react';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};
const Feature = ({ title, Svg, description }: FeatureItem) => {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg style={{ height: 200, width: 200 }} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default Feature;

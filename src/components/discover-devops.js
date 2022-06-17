import React from 'react';
import Link from '@docusaurus/Link';
import RippleMarksSvg from '@site/static/img/ripple-marks.svg';

export const DiscoverDevops = () => {
  return (
    <section
      className="py-5 bg-primary-100 relative overflow-hidden flex flex-col
    lg:py-8
    "
    >
      <span
        className="text-heading3 text-primary font-semibold text-center z-10 mx-4
      sm:text-heading2
      lg:text-[54px] lg:text-[1.63]
      "
      >
        Discover DevOps Workflow with DevStream
      </span>
      <Link
        className="primary-button z-10 self-center mt-3 sm:mt-4 lg:mt-6"
        to="https://docs.devstream.io/en/latest/quickstart/"
      >
        Quick Start
      </Link>
      <RippleMarksSvg className="opacity-50 absolute -top-1/2 z-0 max-w-[1000px] self-center" />
    </section>
  );
};

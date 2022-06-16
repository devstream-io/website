import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HeaderSvg from '@site/static/img/header.svg';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className="
      pt-5 pb-6 px-4
      flex flex-col
      justify-between items-center
      bg-primary-100"
    >
      <div className="flex flex-col flex-nowrap items-center justify-start">
        <div
          className="text-primary
         font-semibold text-heading2 leading-[1.5]
         text-center"
        >
          DevStream:
          <br />
          Your DevOps Toolchain Manager
        </div>
        <div
          className="text-primary
        text-[14px] leading-[1.43] mt-3
        text-center"
        >
          Discover DevOps workflow that suits you best.
          <br />
          DevStream will take care of the rest.
        </div>
        <Link
          className="primary-button"
          to="https://docs.devstream.io/en/latest/quickstart_en/"
        >
          Quick Start
        </Link>
      </div>
      <div className="h-[200px] w-[200px] mt-3">
        <HeaderSvg />
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

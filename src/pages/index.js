import { DiscoverDevops } from '@site/src/components/discover-devops';
import { HowDevStreamWorks } from '@site/src/components/how-dev-stream-works';
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { WhyDevStream } from '@site/src/components/why-dev-stream';
import HeaderSvg from '@site/static/img/header.svg';
import { ParallaxProvider } from 'react-scroll-parallax';

function HomepageHeader() {
  return (
    <header
      className="
      pt-5 pb-6 px-4
      sm:py-4 sm:px-6
      lg:py-6 lg:pr-[120px] lg:pl-[80px]
      flex flex-col
      sm:flex-row
      justify-between items-center
      bg-primary-100"
    >
      <div
        className="flex flex-col flex-nowrap items-center justify-start
      space-y-4
      sm:items-start
      "
      >
        <div
          className="text-primary
         font-semibold text-heading2 leading-[1.5]
         sm:leading-[1.25]
         lg:text-[54px] lg:text-[1.44]
         text-center sm:text-start"
        >
          DevStream:
          <br />
          Your DevOps Toolchain Manager
        </div>
        <div
          className="text-primary
        text-label14
        lg:text-[32px] lg:text-[1.25]
        text-center sm:text-start
        "
        >
          Discover DevOps workflow that suits you best.
          <br />
          DevStream will take care of the rest.
        </div>
        <Link
          className="primary-button"
          to="https://docs.devstream.io/en/latest/quickstart/"
        >
          Quick Start
        </Link>
      </div>
      <div
        className="h-[200px] w-[200px] mt-3
      sm:mt-[0] sm:h-[219px] sm:w-[219px]
      lg:h-[540px] lg:w-[540px]
      "
      >
        <HeaderSvg />
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <ParallaxProvider>
      <Layout
        title={`The Definitive DevOps Toolchain Manager | DevStream`}
        description="Discover DevOps workflow that suits you best. DevStream will take care of the rest."
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <WhyDevStream />
          <HowDevStreamWorks />
          <DiscoverDevops />
        </main>
      </Layout>
    </ParallaxProvider>
  );
}

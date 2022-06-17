import React from 'react';
import KickoffDevopsSvg from '@site/static/img/kickoff-devops.svg';
import ExtendToolchainSvg from '@site/static/img/extend-toolchain.svg';
import InnovationSvg from '@site/static/img/innovation.svg';

const FeatureList = [
  {
    title: 'Kickoff DevOps in 5 Minutes',
    Svg: KickoffDevopsSvg,
    description: (
      <>
        Tired of investigating and integrating all the DevOps tools?
        <br />
        Get your toolchain up and running with one command line.
      </>
    ),
  },
  {
    title: 'Extend Your Toolchain like Lego',
    Svg: ExtendToolchainSvg,
    description: (
      <>
        Boost team productivity by plugging in or upgrading any DevOps tool you
        need, with minimal overhead.
        <br />
        Unleash the full potential of your toolchain with best practices.
      </>
    ),
  },
  {
    title: 'Embrace New Opportunities',
    Svg: InnovationSvg,
    description: (
      <>
        Say goodbye to vendor lock-in. Never let your toolchain become your
        bottleneck.
        <br />
        Feel the pulse of new DevOps tools and new practices.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className="flex flex-col items-center space-y-3 lg:space-y-6">
      <div
        className="w-[150px] h-[122px]
      lg:w-[200px] lg:h-[150px]
      2xl:w-[358px] 2xl:h-[290px]
      "
      >
        <Svg role="img" />
      </div>
      <div
        className="text-center lg:text-start
        sm:w-[550px]
        lg:w-[300px]
        2xl:w-[380px]
      "
      >
        <span
          className="block text-[16px] leading-[1.25] text-neutral-600 font-semibold
        lg:text-heading2
        "
        >
          {title}
        </span>
        <p
          className="mt-1 text-label14 text-neutral-400
        lg:text-label18
        "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className="bg-white flex flex-col flex-nowrap py-6 items-stretch">
      <span
        className="section-title text-center
      "
      >
        What You Can Do with DevStream
      </span>
      <div
        className="flex flex-nowrap flex-col items-center mt-5 space-y-5 px-4
      lg:flex-row lg:justify-evenly lg:items-start lg:space-y-[0px] lg:mt-6
      2xl:justify-center 2xl:space-x-[166px]
      "
      >
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

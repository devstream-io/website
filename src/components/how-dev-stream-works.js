import React from 'react';

import Link from '@docusaurus/Link';
import ArchitectureSvg from '@site/static/img/architecture.svg';
import ArrowRightSvg from '@site/static/img/arrow-right.svg';

const AdvantageList = [
  {
    title: 'DevOps toolchain as Code',
    desc: 'Centrally manage your toolchain with versioned code, and keep track of every change.',
  },
  {
    title: 'Core-Plugin Architecture',
    desc: 'No reinvention of the wheels. Simply create a plugin, and connect any tools you like with DevStream.',
  },
  {
    title: 'Best Practice Inheritance',
    desc: (
      <>
        Import toolchain configuration that meets your needs.
        <br />
        Implement inbuilt best practices and share yours with the world.
      </>
    ),
  },
];

export const HowDevStreamWorks = () => {
  return (
    <section className="bg-white py-6 flex flex-col flex-nowrap justify-start items-center dark:bg-primary-dark">
      <h3 className="section-title dark:text-primary">How DevStream Works</h3>
      <div
        className="flex flex-col flex-nowrap self-stretch
        mx-4 sm2:mx-6
        lg:flex-row lg:justify-between lg:items-center lg:max-w-[1600px] lg:self-center
      "
      >
        <ArchitectureSvg className="lg:w-[60%]" />
        <div
          className="flex flex-col space-y-3 mt-5
        lg:w-[30%] lg:m-[0]
        "
        >
          {AdvantageList.map(({ title, desc }) => (
            <div
              key={title}
              className="flex flex-col justify-start items-center text-center
              lg:items-start lg:text-start"
            >
              <span
                className="text-heading4stream text-neutral-600 font-semibold
              lg:text-heading2stream dark:text-neutral-invert
              "
              >
                {title}
              </span>
              <div className="text-label14stream text-neutral-400 mt-1 lg:text-label18stream dark:text-neutral-300">
                {desc}
              </div>
            </div>
          ))}
          <Link
            to="https://docs.devstream.io/en/latest/development/architecture/"
            className="text-[14px] leading-[1.2] text-primary
        mt-5
        w-fit self-center lg:self-start hover:no-underline
        lg:text-heading2stream
        hover:text-primary-light
        floating-link
        "
          >
            See Architecture
            <ArrowRightSvg
              className="w-[17px] h-[17px] translate-y-[.2em]
            lg:w-[30px] lg:h-[30px]
            floating-link-icon
            "
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

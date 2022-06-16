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
    desc:
      'Import toolchain configuration that meets your needs. \n' +
      'Implement inbuilt best practices and share yours with the world.',
  },
];

export const HowDevStreamWorks = () => {
  return (
    <section className="bg-white py-6 flex flex-col flex-nowrap justify-start items-center">
      <h3 className="section-title">How DevStream Works</h3>
      <ArchitectureSvg className="mx-4 sm:mx-6" />
      <div className="flex flex-col gap-3 mt-5 mx-4 sm:mx-6">
        {AdvantageList.map(({ title, desc }) => (
          <div
            key={title}
            className="flex flex-col justify-start items-center text-center"
          >
            <span className="text-heading4 text-neutral-600 font-semibold">
              {title}
            </span>
            <div className="text-label14 text-neutral-400 mt-1">{desc}</div>
          </div>
        ))}
      </div>
      <Link
        to="https://docs.devstream.io/en/latest/development/architecture/"
        className="text-[14px] leading-[1.2] text-primary
        flex flex-row justify-center items-center gap-1 mt-5
        hover:text-primary-light
        "
      >
        See Architecture <ArrowRightSvg className="w-[17px] h-[17px] -translate-y-[.12em]" />
      </Link>
    </section>
  );
};

import React from 'react';

import ArchitectureSvg from '@site/static/img/architecture.svg';

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
      <ArchitectureSvg className="mx-4" />
      <div className="flex flex-col gap-3 mt-5 mx-4">
        {AdvantageList.map(({ title, desc }) => (
          <div key={title} className="flex flex-col justify-start items-center text-center">
            <span className="text-heading4 text-neutral-600 font-semibold">
              {title}
            </span>
            <div className="text-label14 text-neutral-400 mt-1">
              {desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

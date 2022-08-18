import styled from '@emotion/styled';
import { chain } from 'lodash';

import {
  DocPageTweak
} from '@site/src/components/ContributorPage/doc-page-tweak';
import React from 'react';

export const DocPageSection = styled.div`
  width: calc(100% + 48px);
  position: relative;
  left: -24px;
`;

interface IContributorInfo {
  name: string;
  email: string;
  title: string;
  date: string;
}

// todo: read from file
const CONTRIBUTORS = [
  {
    name: 'alice',
    email: 'foo',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  } as IContributorInfo,
  {
    name: 'alice',
    email: 'foo',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  },
  {
    name: 'alice',
    email: 'foo',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  },
  {
    name: 'alice',
    email: 'foo',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  },
  {
    name: 'alice',
    email: 'foo',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  }
];

const ContributorTable =
  ({
     contributors,
     title,
     className
   }: { contributors: IContributorInfo[], title: string, className?: string }) => {
    const rows = chain(contributors).chunk(2).value();
    return <div className={className}>
      <span className='text-heading3 font-semibold'>{title}</span>
      <div className='shadow-lower mt-4'>
        <table className='border-hidden table border-collapse w-full'>
          {rows.map((it, idx) => (<tr key={idx} className='bg-white'>
            {rows[idx].map(col => (<td
              key={col.email}
              style={{ width: '50%' }}
              className='border border-primary-300'>{col.name}</td>))}
          </tr>))}
        </table>
      </div>
    </div>;
  };

export const ContributorsOld = () => {
  return <div>
    <DocPageTweak/>
    <div className='mt-5 mb-6 text-neutral-600'>
      <span className='text-heading2 font-semibold relative'>
        Old Certification
      </span>
      <ContributorTable className="mt-5" contributors={CONTRIBUTORS} title='Members'/>
      <ContributorTable className="mt-6" contributors={CONTRIBUTORS} title='Contributors'/>
    </div>
  </div>;
};

// todo: water mark

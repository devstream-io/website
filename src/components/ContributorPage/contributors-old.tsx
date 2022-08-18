import { Tooltip } from '@site/src/components/tooltip';
import { useSize } from 'ahooks';
import { chain } from 'lodash';

import {
  DocPageTweak
} from '@site/src/components/ContributorPage/doc-page-tweak';
import React, { MutableRefObject, useRef } from 'react';

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
    email: 'foo1',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  } as IContributorInfo,
  {
    name: 'alice',
    email: 'foo2',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  },
  {
    name: 'alice',
    email: 'foo3',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  },
  {
    name: 'alice',
    email: 'foo4',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  },
  {
    name: 'alice',
    email: 'foo5',
    title: 'Open-Source Contributor - Associate',
    date: 'May 2022'
  }
];

const useTableColumns = (columnMaxWidth: number, tableRef: MutableRefObject<HTMLElement>) => {
  const size = useSize(tableRef);
  const width = size?.width ?? 0;
  return Math.ceil(width / columnMaxWidth) || 2;
};

const ContributorTable =
  ({
     contributors,
     title,
     className
   }: { contributors: IContributorInfo[], title: string, className?: string }) => {
    const tableRef = useRef<HTMLTableElement>(null);
    const colCount = useTableColumns(300, tableRef);
    const rows = chain(contributors).chunk(colCount).value();
    return <div className={className}>
      <span className='text-heading3 font-semibold'>{title}</span>
      <div className='shadow-lower mt-4'>
        <table ref={tableRef}
               className='border-hidden table border-collapse w-full'>
          {rows.map((it, idx) => (
            <tr key={idx} className='bg-white'>
              {rows[idx].map(col => (
                <td
                  key={col.email}
                  className='border border-primary-300'>
                  <Tooltip content='Download'>{col.name}</Tooltip>
                </td>))}
            </tr>))}
        </table>
      </div>
    </div>;
  };

export const ContributorsOld = () => {
  return <div>
    <DocPageTweak/>
    <div className='mt-5 mb-6 text-neutral-600 m-auto max-w-[1200px]'>
      <span className='text-heading2 font-semibold relative'>
        Old Certification
      </span>
      <ContributorTable className='mt-5'
                        contributors={CONTRIBUTORS}
                        title='Members'/>
      <ContributorTable className='mt-6'
                        contributors={CONTRIBUTORS}
                        title='Contributors'/>
    </div>
  </div>;
};

// todo: water mark

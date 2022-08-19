import {
  getOldContributors,
  getOldMembers,
} from '@site/src/components/ContributorPage/contributor-info-manager';
import { DocPageSection } from '@site/src/components/ContributorPage/contributors-new';
import { Tooltip } from '@site/src/components/tooltip';
import { useSize } from 'ahooks';
import { chain } from 'lodash';

import { DocPageTweak } from '@site/src/components/ContributorPage/doc-page-tweak';
import React, { MutableRefObject, useRef } from 'react';
import { SingleRipple } from '../ripples';

const useTableColumns = (
  columnMaxWidth: number,
  tableRef: MutableRefObject<HTMLElement>
) => {
  const size = useSize(tableRef);
  const width = size?.width ?? 0;
  return Math.ceil(width / columnMaxWidth) || 2;
};

const ContributorTable = ({
  contributors,
  title,
  className,
}: {
  contributors: { name: string; image: string }[];
  title: string;
  className?: string;
}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const colCount = useTableColumns(300, tableRef);
  const rows = chain(contributors).chunk(colCount).value();
  return (
    <div className={className}>
      <span className="text-heading3 font-semibold">{title}</span>
      <div className="shadow-lower mt-4 bg-white">
        <table
          ref={tableRef}
          className="border-hidden table border-collapse w-full"
        >
          <tbody>
            {rows.map((it, idx) => (
              <tr key={idx} className="bg-white">
                {rows[idx].map((people) => (
                  <td
                    key={people.name}
                    className="border border-primary-300"
                    style={{ width: 100 * (1 / colCount) + '%' }}
                  >
                    <Tooltip content="Download">
                      <a
                        href={people.image}
                        target="_blank"
                        className="text-neutral-600 hover:no-underline"
                      >
                        {people.name}
                      </a>
                    </Tooltip>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ContributorsOld = () => {
  return (
    <DocPageSection className="px-4 overflow-hidden">
      <DocPageTweak />
      <div className="mt-5 mb-6 text-neutral-600 m-auto max-w-[1200px] relative z-10">
        <span className="text-heading2 font-semibold relative">
          Old Certification
        </span>
        <ContributorTable
          className="mt-5"
          contributors={getOldMembers()}
          title="Members"
        />
        <ContributorTable
          className="mt-6"
          contributors={getOldContributors()}
          title="Contributors"
        />
      </div>
      <SingleRipple
        color="#F0F4FE"
        className="absolute opacity-50 z-0
       right-[-80px] top-[50%] w-[200px]
       lg:w-[400px] lg:h-[400px] lg:right-[-200px]"
      />
    </DocPageSection>
  );
};

// todo: water mark

import styled from '@emotion/styled';
import {
  getBadgeInfo,
  IBadgeInfo,
} from '@site/src/components/ContributorPage/badge-info-manager';
import { getContributors } from '@site/src/components/ContributorPage/contributor-info-manager';
import { DocPageTweak } from './doc-page-tweak';
import { TwoRipple } from '@site/src/components/two-ripple';
import React from 'react';
import {
  BadgeType,
  IContributorInfo,
} from '@site/src/components/ContributorPage/types';

export const DocPageSection = styled.div`
  width: calc(100% + 48px);
  position: relative;
  left: -24px;
`;

export const Skills = ({ skills }: { skills: string[] }) => {
  return (
    <div className="my-5 self-start">
      <span className="text-heading3 font-semibold text-neutral-600">
        Skills
      </span>
      <div className="flex flex-row flex-wrap gap-3 mt-3">
        {skills.map((it) => (
          <span
            key={it}
            className="text-body text-primary p-1 bg-white rounded-[6px] h-[34px]"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
};

function BadgeInfo({ badgeInfo }: { badgeInfo: IBadgeInfo }) {
  return (
    <>
      <span className="text-primary text-heading2 xl:text-heading1 xl:font-semibold xl:self-start">
        {badgeInfo.badge.type}
      </span>
      <span className="text-primary text-heading3 mt-2 xl:font-semibold xl:text-heading2 xl:self-start">
        {badgeInfo.badge.achievement}
      </span>
      <div className="mt-5">{badgeInfo.description}</div>
    </>
  );
}

function ContributorCard({ info }: { info: IContributorInfo }) {
  return (
    <a
      className="block py-[20px] no-underline hover:no-underline px-4 rounded-[10px] transition bg-white  shadow-lower hover:shadow-high flex items-center"
      href={info.certificationLink}
      target="_blank"
    >
      <img
        className="w-[80px] h-[80px] mr-3 rounded-full bg-primary-500 shrink-0 uppercase flex justify-center items-center overflow-hidden text-white"
        src={info.avatar}
        alt={info.name}
      />
      <div className="flex flex-col space-y-1 h-fit">
        <span className="text-body text-neutral-600">{info.name}</span>
        <span className="text-body-sm text-neutral-500">
          {info.badge.type} - {info.badge.achievement}
        </span>
        <span className="text-body-sm text-neutral-500">{info.dateAdded}</span>
      </div>
    </a>
  );
}

const ContributorList = ({
  contributors,
}: {
  contributors: IContributorInfo[];
}) => {
  return (
    <DocPageSection className="bg-white py-6 overflow-hidden px-4 sm:px-[40px]">
      <TwoRipple color="#F0F4FE" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 z-10 max-w-[1248px] mx-auto relative">
        {contributors.map((it) => (
          <ContributorCard key={it.email} info={it} />
        ))}
      </div>
    </DocPageSection>
  );
};

export const ContributorsNew = ({ badge }: { badge: BadgeType }) => {
  const badgeInfo = getBadgeInfo(badge);
  const badgeName = badgeInfo.badge.type + '-' + badgeInfo.badge.achievement;
  const contributors = getContributors(badge);
  return (
    <div>
      <DocPageTweak bgColor="#F0F4FE" />
      <div className="mt-5 flex flex-col max-w-[1200px] m-auto xl:flex-row xl:items-center xl:gap-x-8">
        <div className="flex justify-center shrink-0">
          <img
            src={badgeInfo.image}
            alt={badgeName}
            className="w-[240px] h-[240px]"
          />
        </div>
        <div className="mt-5 flex flex-col justify-center items-center">
          <BadgeInfo badgeInfo={badgeInfo} />
          <Skills skills={badgeInfo.skills} />
        </div>
      </div>
      <ContributorList contributors={contributors} />
    </div>
  );
};

// todo: water mark

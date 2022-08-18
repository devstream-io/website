import styled from '@emotion/styled';
import { TwoRipple } from '@site/src/components/two-ripple';
import React from 'react';
import { Global, css } from '@emotion/react';
import certificationImg
  from '@site/static/img/contributors/certification.png';


/**
 * hide some layout elements
 * @constructor
 */
const DocPageTweak = () => {
  return <Global styles={css`
    main {
      --ifm-spacing-horizontal: 24px;
    }

    .padding-top--md {
      background: #F0F4FE;
    }

    .theme-doc-markdown > header:nth-child(1) {
      display: none;
    }

    .pagination-nav {
      display: none;
    }

    .container {
      margin: 0;
      max-width: unset;

      & > .row > div {
        max-width: unset !important;
      }
    }

    .padding-bottom--lg.container {
      padding-bottom: 0 !important;
    }
  `}/>;
};

export const DocPageSection = styled.div`
  width: calc(100% + 48px);
  position: relative;
  left: -24px;
`;

const SKILLS = [
  'Community Development',
  'DevOps',
  'Evangelism Marketing',
  'Open-Source Software',
  'Technical Content Writing'
];

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

export const Skills = () => {
  return <div className='my-5 self-start'>
    <span className='text-heading3 font-semibold text-neutral-600'>Skills</span>
    <div className='flex flex-row flex-wrap gap-3 mt-3'>
      {SKILLS.map(it => <span
        key={it}
        className='text-body text-primary p-1 bg-white rounded-[6px] h-[34px]'>{it}</span>)}
    </div>
  </div>;
};

function Credit() {
  return <>
    <span className='text-primary text-heading2 xl:text-heading1 xl:font-semibold xl:self-start'>
          Open-Source Contributor
        </span>
    <span className='text-primary text-heading3 mt-2 xl:font-semibold xl:text-heading2 xl:self-start'>
          Associate
        </span>
    <div className='mt-5'>
      Earners of this certification have a comprehensive understanding of
      open-source community operations. They demonstrated the ability to
      evangelize and grow the community by writing technical articles,
      increasing traffic to the community, helping community members, etc.
      Badge owners can act as open-source evangelists, write well-thought
      technical blog posts, attract new users, and support community
      members.
    </div>
  </>;
}

function ContributorCard({ info }: { info: IContributorInfo }) {
  return <div className='py-[20px] px-4 rounded-[10px] transition bg-white  shadow-lower hover:shadow-high flex items-center'>
    <img className='w-[80px] h-[80px] mr-3'
         src={certificationImg}
         alt={info.name}/>
    <div className='flex flex-col space-y-1 h-fit'>
      <span className='text-body text-neutral-600'>
        {info.name}
      </span>
      <span className='text-body-sm text-neutral-500'>
        {info.title}
      </span>
      <span className='text-body-sm text-neutral-500'>
        {info.date}
      </span>
    </div>
  </div>;
}

const ContributorList = () => {
  return <DocPageSection className='bg-white py-6 overflow-hidden px-4 sm:px-[40px]'>
    <TwoRipple color='#F0F4FE'/>
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 z-10 max-w-[1248px] mx-auto relative'>
      {CONTRIBUTORS.map(it => <ContributorCard key={it.email} info={it}/>)}
    </div>
  </DocPageSection>;
};

export const ContributorsNew = () => {
  return <div>
    <DocPageTweak/>
    <div className='mt-5 flex flex-col max-w-[1200px] m-auto xl:flex-row xl:items-center xl:gap-x-8'>
      <div className='flex justify-center shrink-0'>
        <img
          className='w-[240px]'
          src={certificationImg} alt='certification-image'/>
      </div>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <Credit/>
        <Skills/>
      </div>
    </div>
    <ContributorList/>
  </div>;
};

// todo: water mark

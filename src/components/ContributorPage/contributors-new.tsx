import styled from '@emotion/styled';
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
  `}/>;
};

export const DocPageSection = styled.div`
  width: calc(100% + 48px);
  position: relative;
  left: -24px;
  padding-left: 24px;
  padding-right: 24px;
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
  }
];

export const Skills = () => {
  return <div className='mt-5'>
    <span className='text-heading3 text-neutral-600'>Skills</span>
    <div className='flex flex-row flex-wrap mt-3'>
      {SKILLS.map(it => <span
        key={it}
        className='text-body text-primary mr-3 mb-3 p-1 bg-white rounded-[6px] h-[34px]'>{it}</span>)}
    </div>
  </div>;
};

function Credit() {
  return <>
<span className='text-primary text-heading2'>
          Open-Source Contributor
        </span>
    <span className='text-primary text-heading3 mt-2'>
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
  return <div className='py-[20px] px-4 rounded-[10px] transition shadow-lower hover:shadow-high flex'>
    <img className='w-[80px] h-[80px] mr-3'
         src={certificationImg}
         alt={info.name}/>
    <div className='flex flex-col space-y-1'>
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
  return <DocPageSection className='bg-white py-6 space-y-4'>
    {CONTRIBUTORS.map(it => <ContributorCard key={it.email} info={it}/>)}
  </DocPageSection>;
};

export const ContributorsNew = () => {
  return <div>
    <DocPageTweak/>
    <div className='mt-5 flex flex-col'>
      <div className='flex justify-center'>
        <img
          className='w-2/3'
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

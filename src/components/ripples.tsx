import styled from '@emotion/styled';
import React from 'react';
import Ripple from '@site/static/img/ripple-mark.svg';

const StyledRipple = styled(Ripple)`
  & > g {
    fill: ${({ color }) => color || '#fff'};
  }
`;

export interface ITwoRippleProps {
  color?: string;
}

export const SingleRipple = StyledRipple;

export const TwoRipples = (props: ITwoRippleProps) => {
  return (
    <>
      <StyledRipple
        {...props}
        className="absolute opacity-50 z-0
       right-[-80px] top-[-50px] w-[200px]
       lg:w-[600px] lg:h-[600px] lg:top-[-170px] lg:right-[-200px]"
      />
      <StyledRipple
        {...props}
        className="absolute opacity-50 z-0 rotate-90
       left-[-70px] bottom-[-80px] w-[200px]
       lg:w-[400px] lg:h-[400px]"
      />
    </>
  );
};

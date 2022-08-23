import { css, Global } from '@emotion/react';
import React from 'react';

/**
 * hide some layout elements
 * @constructor
 */
export const DocPageTweak = (props: { bgColor?: string }) => {
  return <Global styles={css`
    main {
      --ifm-spacing-horizontal: 24px;
      position: relative;
    }

    .padding-top--md {
      background: ${props.bgColor || 'unset'};
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

    table tr:nth-child(2n) {
      background: unset;
    }

    .padding-bottom--lg.container {
      padding-bottom: 0 !important;
    }
  `}/>;
};

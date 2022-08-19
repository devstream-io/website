import CONTRIBUTORS from '@site/contributor-info/contributors.json';
import {
  BadgeType,
  IContributorInfo,
} from '@site/src/components/ContributorPage/types';
import { chain, matches } from 'lodash';

export const getContributors = (badge: BadgeType) => {
  return chain(CONTRIBUTORS)
    .filter(matches({ badge }))
    .orderBy('dateAdded')
    .value() as IContributorInfo[];
};


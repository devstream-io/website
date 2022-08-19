import CONTRIBUTORS from '@site/contributor-info/contributors.json';
import CONTRIBUTORS_OLD from '@site/contributor-info/contributors-old.json';
import MEMBERS_OLD from '@site/contributor-info/members-old.json';

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

export const getOldContributors = () => {
  return CONTRIBUTORS_OLD.sort();
};
export const getOldMembers = () => {
  return MEMBERS_OLD.sort();
};

import { BadgeType } from '@site/src/components/ContributorPage/types';
import BADGES from '@site/contributor-info/badges.json';
import { matches } from 'lodash';

export interface IBadgeInfo {
  badge: BadgeType;
  skills: string[];
  description: string;
  image: string;
}

export const getBadgeInfo = (badge: BadgeType) => {
  return BADGES.find(matches({ badge })) as IBadgeInfo;
};

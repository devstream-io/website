export type BadgeType =
  | {
      type: 'Open-Source Evangelist' | 'Talented Speaker' | 'Open-Source Contributor';
      achievement: 'Associate' | 'Professional';
    }
  | {
      type: 'TopN';
      achievement: 'Top 3 of Year' | 'Top 3 of Month' | 'Top 10 of Year';
    };

export interface IContributorInfo {
  badge: BadgeType;
  name: string;
  email: string;
  avatar: string;
  dateAdded: string;
  certificationLink: string;
}

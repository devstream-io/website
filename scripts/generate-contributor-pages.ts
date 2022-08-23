import BADGES from '@site/contributor-info/badges.json';
import fs from 'fs-extra';
import { camelCase, chain } from 'lodash';
import * as path from 'path';
import { globbySync } from 'globby';

const outputDir = './community/community-heroes';

const getCategoryName = (category: string) => {
  return camelCase(category);
};
const generateCategory = (category: string, position: number) => {
  const categoryDir = path.resolve(outputDir, getCategoryName(category));
  fs.ensureDirSync(categoryDir);
  const metaFile = path.resolve(categoryDir, '_category_.json');
  const meta = {
    label: category,
    position,
  };
  fs.ensureFileSync(metaFile);
  fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2), 'utf8');
};

const generatePage = (badge: string, achievement: string) => {
  const file = path.resolve(
    outputDir,
    getCategoryName(badge),
    `${achievement}.mdx`
  );
  fs.ensureFileSync(file);
  const content = `---
title: ${achievement}
---

import { ContributorsNew } from "@site/src/components/ContributorPage/contributors-new";

<ContributorsNew badge={{ type: '${badge}', achievement: '${achievement}' }} />
`;
  fs.writeFileSync(file, content, 'utf8');
};

const generateContributorPages = () => {
  const groupedByType = chain(BADGES)
    .map('badge')
    .groupBy('type')
    .entries()
    .value();
  groupedByType.forEach(([type, badges], idx) => {
    generateCategory(type, idx + 1);
    const achievements = badges.map((it) => it.achievement);
    for (const achievement of achievements) {
      generatePage(type, achievement);
    }
  });
};

const generateOldContributorPages = (
  type: string,
  outputFile: string = 'contributors-old.json'
) => {
  const certificationImageDir = `./static/img/community/contributor/${type}`;
  const people = globbySync(path.join(certificationImageDir), {
    expandDirectories: {
      extensions: ['png', 'jpg', 'jpeg'],
    },
  })
    .map((it) => {
      const name = path.basename(it).replace(/\.(png|jpeg|jpg)$/, '');
      return { name, image: it.replace(/^static/, '') };
    })
    .filter((it) => !it.name.endsWith('-cup'));
  const metaFile = path.resolve('./contributor-info/' + outputFile);
  fs.writeFileSync(metaFile, JSON.stringify(people, null, 2), 'utf8');
};

generateContributorPages();
generateOldContributorPages('contributors', 'contributors-old.json');
generateOldContributorPages('members', 'members-old.json');

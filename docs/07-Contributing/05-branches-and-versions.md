---
sidebar_position: 5
---

# Branches and Versions

## 1. Branch Name and Version Number

- We use [SemVer](https://semver.org) to specify version numbers.
- We only use two types of branches:
  - `main` branch -> The main branch and integration branch, all PRs should be merged into the `main` branch first.
  - `release` branch -> The release branch, the main purpose of which is to release patch versions on non-latest versions.

## 2. Which Branch We Release from

In the very beginning stage of this project, we were under stealth mode and we evolved fast. That's why we only maintained the `main` branch in the early days. So, the correspondence between branches and versions is divided into two cases:

|    Branch   |   Version  |
| :---------: | :---------:|
|     main    | <= v0.4.0  |
| release-x.y | >= v0.5.0  |

## 3. Correspondence between Branch Name and Version Number

Starting from version `v0.5.0`, we decided to release from a specific `release` branch.

The name rule of the release branch is `release-x.y`, corresponding to the version `vx.y.n`, where n is the name of the patch version number.

See the following table:

|   Branch    |   Version  |
| :---------: | :---------:|
| release-0.5 | v0.5.0     |
| release-0.6 | v0.6.0, v0.6.1, ...  |

E.g.:

- The first version released on the `release-0.5` branch is `v0.5.0`.
- When a bug was found in the `v0.5.0` version. The commit(s) of the bugfix should be merged from the `main` branch to the `release-0.5` branch through `cherry-pick`, and then continue to release the `v0.5.1` version.

## 4. Release Cycle

Starting with `v0.5.0` and until `v1.0`, we maintain a cadence of one minor release per month. For example, if `v0.5.0` is released this month, then the version to be released next month is `v0.6.0`.

## 5. How Long a Version Will Be Supported

**Before the `v1.0` release, we only maintain the latest version. **For example, after `v0.5.0` is released, before `v0.6.0` is released, all bugfixes will be merged into the `release-0.5` branch with `cherry-pick`;  the `v0.5.n` patch versions will be released in the `release-0.5` branch. When the `v0.6.0` version is released, the `release-0.5` branch will no longer be maintained.

**Starting from the `v1.0` version, we will switch to releasing a minor version every three months and maintain a total of three minor versions.** That means the maintenance cycle for each minor release is **3 x 3 = 9** months. For example, if `v1.0.0` is released in **January 2023**, then `v1.1.0` will be released in **April 2023**, and `v1.2.0` will be released in **July 2023**. Within 9 months after the release of each minor version, the bugfixes will continue to be merged, and the corresponding patch version will continue to be released.

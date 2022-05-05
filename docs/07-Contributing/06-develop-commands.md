---
sidebar_position: 6
---

# Develop Commands

We have a `dtm develop` command which aims to help contributing developers to get a quick start:

```shell
$ dtm develop --help
Develop is used for develop a new plugin.
Examples:
  dtm develop create-plugin --name=YOUR-PLUGIN-NAME
  dtm develop validate-plugin --name=YOUR-PLUGIN-NAME
...
```

## 1. `dtm develop create-plugin`

When you want to code a new plugin for DevStream, you can use this command to generate the boilerplate code of your new plugin.

This command will generate the basic scaffolding code. By simply filling the code and update necessary places, you can have your new plugin up and running in no time.

For more details of creating a plugin, see [this blog post](https://www.devstream.io/blog/create-dtm-plugin-for-anything) and [this doc](./creating-a-plugin).

## 2. `dtm develop validate-plugin`

This command helps you to check if you have already coded all necessary files for a new plugin or not. Thanks @summingyu for coming up with this feature and implementing it.

For example:

```shell
$ dtm develop validate-plugin --name=trello
2022-05-05 17:39:10 ℹ [INFO]  Render template files finished.
2022-05-05 17:39:10 ℹ [INFO]  Plugin trello passed validatio process: 11/11.
2022-05-05 17:39:10 ℹ [INFO]  Validate all files finished.
```

Note that existing plugins are not created with `dtm develop create-plugin` command, so their code might not conform to `dtm develop validate-plugin` checks:

```shell
$ dtm develop validate-plugin --name=argocd
2022-05-05 17:40:10 ℹ [INFO]  Render template files finished.
2022-05-05 17:40:10 ✖ [ERROR]  Failed to validate: internal/pkg/plugin/argocd/argocd.go.
2022-05-05 17:40:10 ✖ [ERROR]  stat internal/pkg/plugin/argocd/argocd.go: no such file or directory
2022-05-05 17:40:10 ℹ [INFO]  Plugin argocd passed validatio process: 10/11.
2022-05-05 17:40:10 ℹ [INFO]  Validate all files finished.
```

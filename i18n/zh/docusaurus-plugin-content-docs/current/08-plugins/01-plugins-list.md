---
sidebar_position: 1
---

# 所有插件列表

| 类型                    | 插件名                          | 注释                           | 文档                                   |
|------------------------|--------------------------------|--------------------------------|---------------------------------------|
| Issue Tracking         | trello-github-integ            | Trello/GitHub整合               | [doc](trello-github-integ)            |
| Issue Tracking         | trello                         | Trello                         | [doc](trello)                         |
| Issue Tracking         | jira-github-integ              | Jira/GitHub整合                 | [doc](jira-github-integ)              |
| Source Code Management | github-repo-scaffolding-golang | Go WebApp代码脚手架              | [doc](github-repo-scaffolding-golang) |
| CI                     | jenkins                        | Jenkins安装                     | [doc](jenkins)                        |
| CI                     | githubactions-golang           | Golang的GitHub Actions CI      | [doc](githubactions-golang)           |
| CI                     | githubactions-python           | Python的GitHub Actions CI      | [doc](githubactions-python)           |
| CI                     | githubactions-nodejs           | Nodejs的GitHub Actions CI      | [doc](githubactions-nodejs)           |
| CI                     | gitlabci-golang                | Golang的GitLab CI for           | [doc](gitlabci-golang)                |
| CI                     | gitlabci-generic               | 通用的GitLab CI                 | [doc](gitlabci-generic)               |
| CD/GitOps              | argocd                         | ArgoCD安装                      | [doc](argocd)                         |
| CD/GitOps              | argocdapp                      | 创建ArgoCD Application          | [doc](argocdapp)                      |
| Monitoring             | kube-prometheus                | Prometheus/Grafana K8s安装      | [doc](kube-prometheus)                |
| Observability          | devlake                        | DevLake安装                     | [doc](devlake)                        |
| LDAP                   | openldap                       | OpenLDAP安装                    | [doc](openldap)                       |

或者，执行如下`dtm`命令来显示支持的插件：

```shell
$ dtm list plugins
argocd
argocdapp
devlake
github-repo-scaffolding-golang
githubactions-golang
githubactions-nodejs
githubactions-python
gitlabci-generic
gitlabci-golang
jenkins
jira-github-integ
kube-prometheus
openldap
trello
trello-github-integ
```

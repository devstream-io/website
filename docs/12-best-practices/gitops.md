# GitOps Toolchain

## Plugins needed

1. [github-repo-scaffolding-golang](/docs/plugins/github-repo-scaffolding-golang)
2. [jira-github](/docs/plugins/jira-github-integ)
3. [githubactions-golang](/docs/plugins/githubactions-golang)
4. [argocd](/docs/plugins/argocd)
5. [argocdapp](/docs/plugins/argocdapp)

The dependencies of these plugins are(`a -> b` means for `a depends on b`):

- `jira-github` -> `github-repo-scaffolding-golang`
- `githubactions-golang` -> `github-repo-scaffolding-golang`
- `argocdapp` -> `argocd` and `github-repo-scaffolding-golang`

Note: These dependencies are not consistent, such as when the repo operated by `jira-github` and `github-repo-scaffolding-golang` are not the same, the dependencies disappear.

We should use the `dependency` according to the actual usage situation.

## Download DevStream (`dtm`)

Download the appropriate `dtm` version for your platform from [DevStream Releases](https://github.com/devstream-io/devstream/releases).

> Remember to rename the binary file to `dtm` so that it's easier to use. For example: `mv dtm-darwin-arm64 dtm`.

> Once downloaded, you can run the binary from anywhere. Ideally, you want to put it in a place that is in your PATH (e.g., `/usr/local/bin`).

## Prepare the Config File

Copy the [gitops.yaml](https://github.com/devstream-io/devstream/blob/main/examples/gitops.yaml) and [gitops-variables.yaml](https://github.com/devstream-io/devstream/blob/main/examples/gitops-variables.yaml) to your working directory:

```bash
curl -o config-gitops.yaml https://raw.githubusercontent.com/devstream-io/devstream/main/examples/gitops.yaml
curl -o config-gitops-variables.yaml https://raw.githubusercontent.com/devstream-io/devstream/main/examples/gitops-variables.yaml
```

Then modify the `config-gitops-variables.yaml` file accordingly.

For me I can set these variables like:

| Variable                       | Example           | Note                                                         |
| ------------------------------ | ----------------- | ------------------------------------------------------------ |
| defaultBranch                  | main              | The branch name you want to use |
| githubUsername                 | daniel-hutao      | It should be case-sensitive here; strictly use your GitHub username |
| repoName                       | go-webapp         | As long as it doesn't exist in your GitHub account and the name is legal |
| dockerhubUsername              | exploitht         | It should be case-sensitive here; strictly use your DockerHub username |
| jiraID                         | merico            | This is a domain name prefix like merico in https://merico.atlassian.net |
| jiraProjectKey                 | DT                | A descriptive prefix for your project’s issue keys to recognize work from this project |
| jiraUserEmail                  | tao.hu@merico.dev | The email you use to log in to Jira |
| argocdNameSpace                | argocd            | The namespace used by ArgoCD |
| argocdDeployTimeout            | 10m               | How long does ArgoCD deployment timeout |


These plugins require some environment variables to work, so let's set them:

```bash
export GITHUB_TOKEN="YOUR_GITHUB_TOKEN_HERE"
export JIRA_API_TOKEN="YOUR_JIRA_API_TOKEN_HERE"
```

If you don't know how to create these two tokens, check out:

- [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)
- [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## 3. Initialize

Run:

```bash
dtm init -f config-gitops.yaml --var-file=config-gitops-variables.yaml
```

## 4. Apply

Run:

```bash
dtm apply -f config-gitops.yaml --var-file=config-gitops-variables.yaml
```

and confirm to continue, then you should see similar output to:

```
...
2022-03-11 13:36:11 ✔ [SUCCESS]  All plugins applied successfully.
2022-03-11 13:36:11 ✔ [SUCCESS]  Apply finished.
```

## 5. Check the Results

// TODO(daniel-hutao): I'll add the docs here later.

## 6. Clean Up

Run:

```bash
dtm destroy
```

and you should see similar output:

```
2022-03-11 13:39:11 ✔ [SUCCESS]  All plugins destroyed successfully.
2022-03-11 13:39:11 ✔ [SUCCESS]  Destroy finished.
```

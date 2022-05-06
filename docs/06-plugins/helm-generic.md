# helm-generic Plugin

This plugin installs a helm chart in an existing Kubernetes cluster.

## Background

Yes, we already have a few plugins implemented with helm SDK.

Maybe you have a question: why don't you implement all helm chart related plugins through a single, generic plugin?

If we simply deploy a tool through the `helm install` command, we won't even need DevStream. We can simply use `helm` CLI directly. So, what is the purpose of implementing a lot of plugins, each of which being a tool which can be installed by helm?

For example, a tool may need pre-configuration (for example, persistent volume, CRDs, etc.) before `helm install`. Or, some clean-up needs to be done after `helm uninstall`. Or, some additional robustness checking is required during the installation process.

We believe the deployment of most helm charts is not a simple one-line command; additional operations might be required, and they differ from tool to tool, from chart to chart. That is the reason we don't just use a generic helm chart plugin to install all charts.

We want one plugin to install just one tool and do it perfectly. By perfectly, we mean "production-ready".

Yes, that's our philosophy: do one thing and do it right.

## What Can the `helm-generic` Plugin Do?

When a chart is "unpopular", or NOT open-source, we cannot know the deployment logic of the chart in advance. We only know that it can be deployed by helm. For the deployment of such "private" tools/projects/applications, what we can do is provide a "generic" plugin to support users to manage such tools in a unified way.

## When Should You Use the `helm-generic` Plugin Instead of a Specific Plugin

Rule of thumb:

- If there is already a plugin to install a specific tool you want (for example, Argo CD,) it's better to use the specific plugin over this generic plugin.
- If there isn't a plugin for a tool you want yet, but the tool is pretty common and popular, the right thing to do is to create an issue or even a pull request to build a plugin for that specific tool and make it production-ready, rather than using the generic plugin.
- If you are installing a private tool (either a company tool, or a private chart within your company,) it's better to use the generic plugin instead of creating a new plugin for that, since the chances are, other users won't benefit from a specific plugin of that kind.

## Usage

```yaml
tools:
# name of the tool
- name: helm-generic
  # id of the tool instance
  instanceID: default
  # format: name.instanceID. Optional. If specified, dtm will make sure the dependency is applied first before handling this tool.
  dependsOn: []
  # options for the plugin
  options:
    # need to create the namespace or not. Optional. Default: false
    create_namespace: true
    repo:
      # name of the Helm repo, e.g. argo
      name: HELM_REPO_NAME
      # url of the Helm repo, e.g. https://argoproj.github.io/argo-helm
      url: YOUR_CHART_REPO
    # Helm chart information
    chart:
      # name of the chart, e.g. argo/argo-cd
      chart_name: CHART_NAME
      # release name of the chart, e.g. argocd
      release_name: RELEASE_NAME
      # k8s namespace, e.g. argocd
      namespace: YOUR_CHART_NAMESPACE
      # whether to wait for the release to be deployed or not
      wait: true
      # the time to wait for any individual Kubernetes operation (like Jobs for hooks). This defaults to 5m0s
      timeout: 5m
      # optional. Whether to perform a CRD upgrade during installation
      upgradeCRDs: true
      # custom values file (optional).
      values_yaml: |
        FOO: BAR
```

Below is a real-world example of deploying an Nginx:

```yaml
tools:
- name: helm-generic
  instanceID: nginx
  options:
    create_namespace: true
    repo:
      name: bitnami
      url: https://charts.bitnami.com/bitnami
    chart:
      chart_name: bitnami/nginx
      release_name: my-nginx
      namespace: nginx
      wait: true
      timeout: 5m
      values_yaml: |
        replicaCount: 2
        service:
          type: ClusterIP
```

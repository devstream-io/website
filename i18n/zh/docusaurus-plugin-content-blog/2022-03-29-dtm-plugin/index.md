---
slug: create-dtm-plugin-for-anything
title: 给 DevStream (dtm) 开发一个插件，整合一切你想要的功能
authors: daniel
tags: [how-to, DevStream]
---

![湖边星巴克门外的一只猫，中国-成都](./banner.jpg)
*湖边星巴克门外的一只猫，中国-成都。 照片：郭铁心 / CC-BY-CA*

你没看错，这个标题不是在瞎吹，不管你想加什么奇奇怪怪的功能到 DevStream 里面，都可以通过自定义一个新插件来实现。（当然请不要试图通过插件方式实现 dtm 命令去根据用户心情改变日志颜色啥的。）

> 还记得上一篇文章吗？我们介绍过 DevStream 的代码库。没看过？这是链接：
>
> [你好，世界！](/blog/hello-world)

今天我们准备通过一个小 demo 程序来展示如何从零开发一个新插件。

## 一句话总结: 什么（重音），是（停顿） DevStream？

DevStream 是一个能够快速安装、更新、管理、整合你的 DevOps 工具的工具。不要为此感到惊讶。

不是我吹，你用 DevStream 可能在 5 分钟内造一条自己“梦想中”的 DevOps 工具链。

别不信呀，你试过没有？要是不行，欢迎评论区里喷我。

怎么试？我们有 [文档](/docs/index) 呀，打开，然后找到 Quick Start 章节，对着敲！

（应该没有人注意到这一段不止一句话吧）

## 现在已经有哪些插件了呢？

<!--truncate-->


截止本文发稿，我们已经支持如下插件：

- Trello (包括和 GitHub 的集成)
- Jira (包括和 GitHub 的集成)
- GitHub Repository bootstrapping (Go 语言)
- GitHub Actions (Go、Python 还有 Nodejs)
- GitLab CI (Go 语言)
- Jenkins (安装)
- ArgoCD
- ArgoCD Application (部署你的 apps)
- Prometheus + Grafana
- DevLake
- OpenLDAP

我们的目标今年内实现 50 个插件！

（请到我们的 [README](https://github.com/devstream-io/devstream) 查看最新动态）

## 为什么需要自定义开发 DevStream 插件？

或许你会说：你们已经有很多插件了呀，为什么我还要开发自己的插件？

你说的对。

但是。

总有例外。

比如：

- 或许你正在开发一个很酷的 DevOps 工具，你想要快速部署、配置这个工具，这时候你或许不可避免地要写一堆运维脚本来实现你的想法，是不？DevStream 懂你。
- 或许你想要把你的工具和其他已有工具做一个整合，但是可能你懒得花太多精力干这些事情。DevStream 懂你。
- 或许你有一些不想（或者不能？不允许？）开源的工具，同时想要将这些工具与开源工具链做一个整合，然后呢？DevStream 懂你。

或者你只是想体验一下 Go 的 plugins 机制怎么玩，然后给 DevStream 提交一些 pr，接着成为一个光荣的“Contributor”，进而一路打怪，变成“Member”、“Reviewer”，或者是“Approver”，乃至“Manager”？

当然这个过程也会伴随着很多漂亮的证书，或者是各种社区为你准备的小礼物，不管是出发点是什么，总之 DevSteram 懂你！！！

废话少说，我们开始吧！

## 设计：一个叫做  "Local File" 的插件

来，我们通过一个简单的 demo 插件学习“开发新插件”那些事。

这个插件的名字叫做：“localfile”，功能是根据我们指定的文件名和文件内容来创建一个本地文件，当然这个文件的名字就是我们给的 filename，而内容就是我们给的 content：

```yaml
tools:
- name: my-file
  plugin: localfile
  options:
    filename: foo.txt
    content: "hello, world"
```

可以看到：
- plugin: `localfile` 插件名
- options: 插件配置
  - filename: 指定文件名
  - content: 指定文件内容

## 来，变个魔法，凭空生成插件骨架

首先我们 clone 一份 DevStream 源码，然后尝试生成一些脚手架代码：

```shell
git clone git@github.com:devstream-io/devstreamtream.git
cd stream
# builds dtm locally to make sure it's using the same dependencies as your new plugin
make build-core
./dtm develop create-plugin --name=localfile
```

请留意 `./dtm develop create-plugin --name=localfile` 这个命令的输出日志！你一定会看到惊喜！贴出来？我不。我要你自己去看！

现在让我们敲一个 `git status` 命令，看到了吗？dtm 为我们做了些啥？

```shell
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    cmd/plugin/localfile/
    docs/plugins/localfile_plugin.md
    internal/pkg/plugin/localfile/
```

## 回忆下目录结构

### cmd/plugin/localfile/main.go

插件的入口，主函数入口，但是别动这个文件，因为 `dtm` 知道你的意图，已经为你改好了。

### docs/plugins/localfile.md

这是自动生成的文档。

没错，我是说过 `dtm` 很神奇，但是再神奇它也不知道你的新插件具体是干啥的。所以这个文档的具体内容还是得你自己来填写。

对对对，是是是，我知道你不喜欢写文档，但是没办法，`dtm` 只能帮你到这里。至少，你不需要手动创建文件了嘛。

### internal/pkg/plugin/localfile

你的插件主要代码逻辑都在这里。你需要：

- 定义你的输入参数(options)；
- 实现参数校验；
- 实现4个主要接口。

## 核心概念：配置、状态、资源

这里还是需要贴个英文：

**配置、状态、资源 == Config / State / Resource**

![](./config_state_resource.png)

在具体写代码逻辑前，我们还是需要先知道 DevStream 是怎么工作的：

- 配置(Config)：是工具(tools)列表，每一个工具有其对应的 name、plugin、options 等配置项。
- 状态(State)：是一个 map，包含每个工具的 name、plugin 和 options 等，主要用来存储 `dtm` 上一次操作的结果。
- 资源(Resource)：指的是插件创建出来的具体工具实例。`Read` 接口返回的就是一个资源的描述信息，这个信息理论上应该和状态里保存的信息完全一致（如果这个资源没有被通过其他途径修改）。

DevStream 会根据 _Config_、_State_ 和 _Resource_ 的状态来决定下一步做什么。比如：

- 如果你上一次成功执行 `dtm apply` 之后什么变化也没有发生，然后你再次运行 `dtm apply`，这时候啥也不会发生。
- 如果你上一次成功执行 `dtm apply` 之后，改了一下配置，然后你再次运行 `dtm apply`，那么接着会发生什么？当然是 `dtm` 会去更新 State，操作 Resource，从而让你的新配置生效。
- 如果你悄悄动了部署好的工具，也就是 Resource 发生了变化，甚至是你直接删了这个 Resource。虽然 `dtm` 很难受。但是 `dtm` 坚强。`dtm` 会尝试根据 Config 和 State 来恢复你的工具。

## 差不多开始详细讲接口了

每个 DevStream 插件都必须实现如下四个接口：

- `Create`
- `Read`
- `Update`
- `Delete`

返回值：

- `Create` 和 `Update ` 返回两个值：`(map[string]interface{}, error)`。第一个返回值，当然就是状态了，我们会将其存到 State 里。第二个就不需要解释了吧。还是解释下：如果发生了错误，那么请返回这个错误。
- `Read` 也有两个返回值，第一个是资源(Resource)的描述，这个值应该和上面表示 State 的返回值相同（如果资源没有发生变化）。
- `Delete` 一切顺利就返回 `(true, nil)` 当然反之就返回 `(false, error)`。

## 实现 Options 和参数校验

好，让我们打开 `internal/pkg/plugin/localfile/options.go` 文件，开始实现 Options 对象：

结果大概是这样：

```go
package localfile

// Options is the struct for configurations of the localfile plugin.
type Options struct {
    Filename string
    Content  string
}
```

接着来实现这个 Options 的校验逻辑，打开 `internal/pkg/plugin/localfile/validate.go` 文件，开始写代码。

结果大概是这样：

```go
package localfile

import "fmt"

// validate validates the options provided by the core.
func validate(options *Options) []error {
    res := make([]error, 0)

    if options.Filename == "" {
        res = append(res, fmt.Errorf("filename does not exist"))
    }

    return res
}
```

## 实现 CURD 接口

### 增删改查之 - Create

我们要根据输入的 options 来实现 create 逻辑，ok，打开 `internal/pkg/plugin/localfile/create.go` 文件，开始挥毫泼墨吧！

```go
package localfile

import (
    "fmt"

    "github.com/mitchellh/mapstructure"

    "github.com/devstream-io/devstreamutil/log"
)

func Create(options map[string]interface{}) (map[string]interface{}, error) {
    var opts Options
    if err := mapstructure.Decode(options, &opts); err != nil {
        return nil, err
    }

    if errs := validate(&opts); len(errs) != 0 {
        for _, e := range errs {
            log.Errorf("Options error: %s.", e)
        }
        return nil, fmt.Errorf("opts are illegal")
    }

    err := writefile(opts.Filename, opts.Content)
    if err != nil {
        return nil, err
    }

    status := map[string]interface{}{
        "filename": opts.Filename,
        "content":  opts.Content,
    }

    return status, nil
}
```

是不是发现这里其实相比 `dtm develop` 创建的脚手架代码，多出来没几行。没错，就是那么简单。其他接口也是。

有个小细节：这里的 `writefile` 函数被放到了 `internal/pkg/plugin/localfile/localfile.go`，这样看起来更清晰一些。

所以 `localfile.go` 文件看起来就是这样的：

```go
package localfile

import "os"

func writefile(filename, content string) error {
    f, err := os.Create(filename)
    if err != nil {
        return err
    }

    defer f.Close()

    _, err = f.WriteString(content)
    if err != nil {
        return err
    }

    return nil
}
```

### 增删改查之 - Read

让我们继续来实现 `Read` 接口吧！

这里的逻辑很简单，就是看下文件在不在，看下内容对不对：

- `internal/pkg/plugin/localfile/read.go`:

```go
package localfile

import (
    "fmt"
    "os"
    "strings"

    "github.com/mitchellh/mapstructure"

    "github.com/devstream-io/devstreamutil/log"
)

func Read(options map[string]interface{}) (map[string]interface{}, error) {
    var opts Options
    if err := mapstructure.Decode(options, &opts); err != nil {
        return nil, err
    }

    if errs := validate(&opts); len(errs) != 0 {
        for _, e := range errs {
            log.Errorf("Options error: %s.", e)
        }
        return nil, fmt.Errorf("opts are illegal")
    }

    content, err := os.ReadFile(opts.Filename)
    if err != nil {
        if strings.Contains(err.Error(), "no such file or directory") {
            return nil, nil
        }
        return nil, err
    }

    status := map[string]interface{}{
        "filename": opts.Filename,
        "content":  string(content),
    }

    return status, nil
}
```

关于返回值：

- 如果文件不存在，返回 nil，没有 error，这意味着文件还没有被创建或者被某人删掉了。
- 如果文件存在，返回文件“状态，没有 error。
- 其他情况，返回 nil 还有对应的 error。

### 增删改查之 - Update

`Update` 会在 `Read` 返回的结果和 State 中的记录不一致时触发。

至于实现嘛，这个场景下 Update 的逻辑其实和 Create 重复，所以我们可以偷个懒，直接重用这块代码：

- `internal/pkg/plugin/localfile/update.go`:

```go
package localfile

func Update(options map[string]interface{}) (map[string]interface{}, error) {
    return Create(options)
}
```

### 增删改查之 - Delete

终于到最后一个接口了，我们来实现 `Delete` 吧！

- `internal/pkg/plugin/localfile/delete.go`:

```go
package localfile

import (
    "fmt"
    "os"

    "github.com/mitchellh/mapstructure"

    "github.com/devstream-io/devstreamutil/log"
)

func Delete(options map[string]interface{}) (bool, error) {
    var opts Options
    if err := mapstructure.Decode(options, &opts); err != nil {
        return false, err
    }

    if errs := validate(&opts); len(errs) != 0 {
        for _, e := range errs {
            log.Errorf("Options error: %s.", e)
        }
        return false, fmt.Errorf("opts are illegal")
    }

    err := os.Remove(opts.Filename)
    if err != nil {
        return false, err
    }

    return true, nil
}
```

删吧删吧，勇敢地删了它！

## 编译

终于写完代码了，让我们来 build 一下刚才开发的新插件吧！

```shell
make build-plugin.localfile
```

是不是很简单？现在我们的 Makefile 可以支持 build 单个插件了，漂亮！

## 测试

首先，我们来创建一个新配置文件： `config-localfile-test.yaml`:

```yaml
tools:
- name: my-file
  plugin: localfile
  options:
    filename: foo.txt
    content: "hello, world"
```

接着 `apply` 一下：

```shell
$ ./dtm -y apply -f config-localfile-test.yaml
2022-03-29 11:25:17 ℹ [INFO]  Apply started.
2022-03-29 11:25:17 ℹ [INFO]  Using dir <.devstream> to store plugins.
2022-03-29 11:25:17 ℹ [INFO]  Tool my-file (localfile) found in config but doesn't exist in the state, will be created.
2022-03-29 11:25:17 ℹ [INFO]  Start executing the plan.
2022-03-29 11:25:17 ℹ [INFO]  Changes count: 1.
2022-03-29 11:25:17 ℹ [INFO]  -------------------- [  Processing progress: 1/1.  ] --------------------
2022-03-29 11:25:17 ℹ [INFO]  Processing: my-file (localfile) -> Create ...
2022-03-29 11:25:17 ✔ [SUCCESS]  Plugin my-file(localfile) Create done.
2022-03-29 11:25:17 ℹ [INFO]  -------------------- [  Processing done.  ] --------------------
2022-03-29 11:25:17 ✔ [SUCCESS]  All plugins applied successfully.
2022-03-29 11:25:17 ✔ [SUCCESS]  Apply finished.
```

如你所见，新插件创建了一个新文件！当然你可以打开这个文件看一下里面的内容是不是符合预期。

如果你再来一次 `apply`, 啥也不会发生。因为这个文件没有发生变化。

```shell
$ ./dtm -y apply -f config-localfile-test.yaml
2022-03-29 11:30:43 ℹ [INFO]  Apply started.
2022-03-29 11:30:43 ℹ [INFO]  Using dir <.devstream> to store plugins.
2022-03-29 11:30:45 ℹ [INFO]  No changes done since last apply. There is nothing to do.
2022-03-29 11:30:45 ✔ [SUCCESS]  Apply finished.
```

但是，如果某人动了一下这个文件呢？试一下！试一下！试一下！

```shell
$ echo "changed" > foo.txt
$ ./dtm -y apply -f config-localfile-test.yaml
2022-03-29 11:26:40 ℹ [INFO]  Apply started.
2022-03-29 11:26:40 ℹ [INFO]  Using dir <.devstream> to store plugins.
2022-03-29 11:26:40 ℹ [INFO]  Tool my-file (localfile) drifted from the state, will be updated.
2022-03-29 11:26:40 ℹ [INFO]  Start executing the plan.
2022-03-29 11:26:40 ℹ [INFO]  Changes count: 1.
2022-03-29 11:26:40 ℹ [INFO]  -------------------- [  Processing progress: 1/1.  ] --------------------
2022-03-29 11:26:40 ℹ [INFO]  Processing: my-file (localfile) -> Update ...
2022-03-29 11:26:40 ✔ [SUCCESS]  Plugin my-file(localfile) Update done.
2022-03-29 11:26:40 ℹ [INFO]  -------------------- [  Processing done.  ] --------------------
2022-03-29 11:26:40 ✔ [SUCCESS]  All plugins applied successfully.
2022-03-29 11:26:40 ✔ [SUCCESS]  Apply finished.
```

看吧，文件和状态记录不一致了，所以它被更新了。一顿操作猛如虎，终于，还是该回来了。

额，玩大一点？删了如何？

```shell
$ rm foo.txt
$ ./dtm -y apply -f config-localfile-test.yaml
2022-03-29 11:27:33 ℹ [INFO]  Apply started.
2022-03-29 11:27:33 ℹ [INFO]  Using dir <.devstream> to store plugins.
2022-03-29 11:27:33 ℹ [INFO]  Tool my-file (localfile) state found but it seems the tool isn't created, will be created.
2022-03-29 11:27:33 ℹ [INFO]  Start executing the plan.
2022-03-29 11:27:33 ℹ [INFO]  Changes count: 1.
2022-03-29 11:27:33 ℹ [INFO]  -------------------- [  Processing progress: 1/1.  ] --------------------
2022-03-29 11:27:33 ℹ [INFO]  Processing: my-file (localfile) -> Create ...
2022-03-29 11:27:33 ✔ [SUCCESS]  Plugin my-file(localfile) Create done.
2022-03-29 11:27:33 ℹ [INFO]  -------------------- [  Processing done.  ] --------------------
2022-03-29 11:27:33 ✔ [SUCCESS]  All plugins applied successfully.
2022-03-29 11:27:33 ✔ [SUCCESS]  Apply finished.
```

这时候，DevStream 认为这个文件应该存在，因为 State 里存着有这个文件。但是它被删了。所以，当然是恢复啦！

最后，我们试一下 `delete` 命令吧：

```shell
$ ./dtm -y delete -f config-localfile-test.yaml
2022-03-29 11:32:24 ℹ [INFO]  Delete started.
2022-03-29 11:32:24 ℹ [INFO]  Using dir <.devstream> to store plugins.
2022-03-29 11:32:24 ℹ [INFO]  Tool my-file (localfile) will be deleted.
2022-03-29 11:32:24 ℹ [INFO]  Start executing the plan.
2022-03-29 11:32:24 ℹ [INFO]  Changes count: 1.
2022-03-29 11:32:24 ℹ [INFO]  -------------------- [  Processing progress: 1/1.  ] --------------------
2022-03-29 11:32:24 ℹ [INFO]  Processing: my-file (localfile) -> Delete ...
2022-03-29 11:32:24 ℹ [INFO]  Prepare to delete 'my-file_localfile' from States.
2022-03-29 11:32:24 ✔ [SUCCESS]  Plugin my-file (localfile) delete done.
2022-03-29 11:32:24 ℹ [INFO]  -------------------- [  Processing done.  ] --------------------
2022-03-29 11:32:24 ✔ [SUCCESS]  All plugins deleted successfully.
2022-03-29 11:32:24 ✔ [SUCCESS]  Delete finished.
```

酷啊我勒个乖乖～ No error No warning 啊～

## 总结

对不起啦，这个时候才给你看总结。我没有把这段内容放在文章开头，是因为我希望你能够完整感受下 DevStream。但是如果你已经感受过一次了，或者感受过很多次了，那么或许下一次再开发一个新插件时，你只是需要一个 checklist：

- 运行 `dtm develop create-plugin --name=your-plugin`。
- 执行 `git status`，然后：
  - 找到生成的新文件
  - 在所有新文件里找到 //TODO(dtm) 标记的地方，补充你的代码逻辑
- 留意所有接口的返回值，想清楚 _State_ 和 _Resource_ 之间的关系。具体返回什么值，取决于具体插件的逻辑。
- 最后，请一定记得更新插件文档，我知道可能你不喜欢写文档，但是，这很重要！

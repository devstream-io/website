---
slug: hello-world
title: 你好，世界
authors: daniel
tags: [how-to, devstream]
---

本文不算短，但是我知道你会读完。如果没读完，，不可能，绝对不可能！

在第一篇博文里，我要讲些啥呢？好像我也没有想好。但是他们喊我写，那我就写了。

好，让我们荡起双桨，不是，让我们开始吧！

---
## 别别别划走，给我三分钟，还你一天好心情！

别急，相信我，下文不会让你看着"心力憔悴"，你可以笑着看完全文，并且毫不费力地学到新姿势，不是，新知识，新知识！

很多时候，我像一个"小白"用户。（虽然我是，但是我知道你们不信。）我怎么个"小白"法呢？
比如我喜欢用开源软件（白嫖谁不喜欢？），但是我绝对懒得在遇到问题的时候上 GitHub 给对应的开源项目开一个 issue 来反馈我遇到的问题，更别提开一个 pr 来修复我遇到的问题了。
或许有一天我心情大好，我会给一些"反馈"，也许是在用户群里，也许是在其他地方。当然一般用着爽了，不可能开一个 issue 表示感谢。但是用着很不爽，或许我会忍不住开个 issue 问一句：
啥破玩意？就这？好意思开源？WTFFF！！！

我做着朝九晚五的工作，我不加班，我下班后不工作。
但是如果我遇到一个好玩的开源软件，或许下班后你会看到我还在参与某个开源项目，不管是写代码，还是参与社区例会。这不是我的工作，这是我的爱好，我的生活。
后来我就没那么"小白"了！而一个"大白"用户的修养，就是学会了提提 issue，提一些小的 pr，参与一些社区活动，知道开源项目的最新动态，逐渐融入了开源社区。

说个笑话：我下班了不工作。我不觉得玩开源社区是工作。我喜欢没日没夜倒腾开源社区。然后老板给我的工作就是玩"开源社区"！！！WTF！！！

老板催我写正文了。好吧，本文还是要介绍 DevStream 的，不能全文胡扯。

---

在这篇"创世"博文里，我准备：
- 向你介绍 DevStream 的工作原理（不要担心，不会涉及到复杂的原理，复杂的我也不会）；
- 带你走读我们的代码库（不要担心，不会涉及到复杂的源码，复杂的我也不会）；
- 告诉你如何开发自定义插件（不要担心，看完了你只会知道一个大概，真想上手还是得看我们的官方文档）。

如果你没有听过 DevStream，不着急，请先花半分钟时间浏览下 DevStream 的 [README](https://github.com/devstream-io/devstream)。

---

## 我想听到你的骂声

我们在三月初发布了 [v0.1](https://www.producthunt.com/posts/devstream-1) 版本，总有人质疑我们是不是太早 release 了。
其实不早。我们肯定也不是不小心 release。我们是故意的。没错，故意的。我们其实可以躲着偷偷再开发几个月，实现更多的功能，支持更多的插件，把 DevStream 做的更完美再 release。

**但是我们担心的是 "我们认为好的功能" != "你真正需要的功能"**

我们有很多的想法，我们有很多想做的功能，但我们不是最终的用户。我们现在做的很多事情其实是在"假设"，在猜用户想要什么功能。
既然是想要知道"用户"想要什么功能，为什么不早点 release 出去，让用户来告诉我们还缺什么，让用户告诉我们哪里做的不好呢？
那就发出去吧，先 release，听听用户的骂声。我们要做的，就是不给用户第二次骂的机会，以最快的速度反馈用户的反馈，解决用户的问题。

行，废话了这么多，如果你对 DevStream 有一些兴趣，欢迎打开我们的 [GitHub repo](https://github.com/devstream-io/devstream)，看下 README 和 quickstart，体验一下 DevStream 的功能。
我相信你在第一次使用 dtm 命令的时候，肯定心中会多次燃起骂人的欲望：

**什么破玩意！！！**

没关系，打开我们的 [Issues 页面](https://github.com/devstream-io/devstream/issues)，畅所欲言！只要 GitHub 不"和谐"你，我们肯定不"和谐"你。
你愿意骂我，就说明你心里还是有我，哈哈，谢谢！我心里也有你！

当然，提 Issues 是一种社区贡献行为，没错，不只是 pr，Issues 也算。对于"社区贡献者"我们会提供无比热情的帮助（绝对超过你的想象）。
你可以不信，那么你提一个 pr 试试。当然也许你会说提不来，那你就提个 issue 告诉我你想提 pr，然后，你就有了被我感动的机会了！

至于给社区贡献者的"精神"上或者"物质"上的奖励，当然有，不过我暂时不想透露。如果你愿意尝试成为一个"社区贡献者"，那么相信我，你不会失望。

---

## 好奇心来了?

Good！让我们丢掉双桨，屏住呼吸，跳下去吧。深入看下 DevStream！

### 架构

一张好图胜千言啊

![architecture-overview](https://github.com/devstream-io/devstream/blob/main/docs/images/architecture-overview.png?raw=true)

*（如果你觉得这个图不够好，请移步英文版，英文版作者绘制的这个图，和我没关系）*

我们用了 [Go plugin](https://pkg.go.dev/plugin). 这或许有很多值得讨论的点，但是这里我们简单先聊几句：
- 首先，我们需要支持很多的 DevOps 工具，然后一种工具对应一个插件，听起来很自然；
- 接着，好像有很多可选的 "core-plugin" 可选架构，我们发现 Golang 的 Plugins 机制满足需求；
- 然后，最后，这里好像还有些点需要列，但是，不好意思，我想不起来了。

### 状态

我们把 DevStream (CLI 工具名字叫 dtm，别问我为啥，这是一个很长的故事，如果你感兴趣，可以看[这里](https://github.com/devstream-io/devstream#why-dtm))
当作一个 "[状态机](https://en.wikipedia.org/wiki/Finite-state_machine)"。

给一个输入，结合当前的状态，DevStream 会接着计算接下来该干什么。如果你对此感兴趣，那就跳到[这里](https://github.com/devstream-io/devstream/blob/main/docs/core_concept.md) 再看几眼。

### 目录结构

我们的一个主要依据是 [standard project layout](https://github.com/golang-standards/project-layout)。但是别去点这个链接，里面的内容太长了，或许不是你想看到的。看我的总结就行：
- `/cmd`: 入口包，别放太多东西在里面。
- `/pkg`: 或许其他项目能用得到的一些代码，主要是一些 util。
- `/internal`: 项目内的主要逻辑，不能被其他项目 import。
- `/hack`: 一些主要的工具脚本等。
- `/build`: 打包相关的一些脚本等。
- `/docs`: 这个不需要解释了。
- `/examples`: 这里主要用来保存示例配置。

解释不动了，大家可以看看英文版怎么描述的。我说过我是"小白"，我不懂的。不过这个目录结构应该 Gopher 看起来很容易理解，大家望文生义吧。

### Core / Plugin

- Core 代码: https://github.com/devstream-io/devstream/tree/main/internal/pkg/pluginengine
- Plugins 代码: https://github.com/devstream-io/devstream/tree/main/internal/pkg/plugin

### `dtm apply` 命令背后的逻辑是啥?

1. 从这里开始： [`/cmd/devstream/main.go`](https://github.com/devstream-io/devstream/blob/main/cmd/devstream/main.go).
2. 接着 `apply` 命令在 [`/cmd/devstream/apply.go`](https://github.com/devstream-io/devstream/blob/main/cmd/devstream/apply.go).
3. 然后 _引擎_ [`/internal/pkg/pluginengine`](https://github.com/devstream-io/devstream/tree/main/internal/pkg/pluginengine) 运行所有的 `apply` 逻辑，
   在这里：[`/internal/pkg/pluginengine/cmd_apply.go`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/cmd_apply.go).

然后，靠你自己去挖掘其他细节了！

---

## DevStream 发版太慢了！！！能不能快点？？？就问你能不能？？？

能，当然能！

首先装个 Go，如果你没有装好，可以参考[官方文档](https://go.dev/doc/install).

```bash
git clone https://github.com/devstream-io/devstream.git && cd stream
go install golang.org/x/tools/cmd/goimports@latest

# make sure your GOPATH/bin is in your PATH
# for example, run this:
export PATH=`go env GOPATH`/bin:$PATH

make build

# after you run "make build", you DO NOT need to run "dtm init" anymore
# run "dtm apply", "dtm delete" directly
# because "init" will try to download plugins from the internet,
# instead of using what you just built
dtm apply -f path_to_your_config.yaml
```

---

## 没看够?

恭喜你已经走到这步了，要不要玩一点刺激的？比如尝试开发一个新插件？

每个插件都需要实现一些接口，定义在这些地方：
- [`Create`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/plugin.go#L12)
- [`Read`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/plugin.go#L13)
- [`Update`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/plugin.go#L14)
- [`Delete`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/plugin.go#L16)

可以参考一个已经存在的插件，比如[这个](https://github.com/devstream-io/devstream/blob/main/cmd/argocd/main.go).

好好好，在你抱怨之前我想告诉你一个秘密武器！开发一个新插件时需要复制粘贴很多的代码，创建重复的目录结构，这种事情让人感觉很不爽！
你觉得我会容忍这种不爽存在超过一天？？？

没错，不会，绝对不会！

我们开发了一个小工具，让你能够快速生成一个新插件的骨架：

```bash
dtm develop create-plugin --name=my-pluing-name-here
```

好了。打完收工。也许你还没看爽，但是我写累了。我要休息了，I need a cup of coffee! now! bye!

> 最后，记得去看一下英文版，你会看到不一样的风景！
> 我不骗你哈，我是来搞笑的，你要严谨的知识，得去英文版看。

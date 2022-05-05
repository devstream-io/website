---
slug: hello-world
title: Hello, World!
authors: ironcore
tags: [how-to, DevStream]
---

![Dong'an Lake, Chengdu, China](./banner.jpg)
*Dong'an Lake, Chengdu, China. Photo: Tiexin Guo / CC-BY-CA*

Hello, and welcome to the DevStream blog!

In this very first "hello world" post, I will:
- give you a high-level picture of how DevStream functions;
- walk you through our codebase;
- explain briefly how to create your own plugin.

If you haven't heard of DevStream yet, please have a quick glance over our [README](https://github.com/devstream-io/devstream).

Without further adieu, let's get started.

<!--truncate-->
---

## TL;DR

Too bad, there isn't one. But don't close the tab right away; let me tell you a story.

Most of the time, I'm a "normal" end-user. And by "normal", I mean I don't bother myself with creating GitHub issues and pull requests and follow the updates for days (if not weeks). I love and use open-source projects, but that's about it. Perhaps when I'm in an extremely good (or bad) mood, I will open up a discussion to give some feedback (or WTFs) and ramble about it. I don't really contribute on a daily basis, though. Don't get me wrong: I'd love it if I had more time; but I work a 9-to-5 job to live, just like most of the readers do.

If you are like me, should you read this post anyway?

Well, yes. Because although this article is about DevStream, it isn't. We will cover quite some topics that are non-specific to DevStream. We will discuss generic topics about [life, the universe, and everything](https://en.wikipedia.org/wiki/42_(number)#The_Hitchhiker's_Guide_to_the_Galaxy). Hang tight. Here we go.

---

## Criticism Wanted

[We released early (Mar 2nd, 2022.)](https://www.producthunt.com/posts/devstream-1) Maybe a little bit too early, one would say. We weren't in stealth mode for long; 8 weeks, tops.

Of course, that wasn't a mistake. We didn't accidentally click the "publish" button on Product Hunt and leak it out. We did this pretty much on purpose. In fact, even before our version 0.1 was released, we had already decided to aim for an early release. It's pretty much by design. Since it's still early and immature, _there might be bugs._ I know you probably want to swear already, but bear with me:

I mean, technically, we could work on it for a much longer period, polish it up, add more features, support more tools, and what have you. But in that case, we might end up with something _we_ thought is perfect but utterly useless to _you_, which is what really matters.

All we had was an idea. We didn't know "how", or even "what". All we knew is, we wanted to build something that is useful for the end-users. So why not release it to the users and ask them to tell us what to build and how to build?

The idea isn't mine, though. It would be arrogant if I said that I invented that. In fact, I learned it from lean manufacturing and agile development. To be honest, if I learned only one thing from lean manufacturing and agile, it's that we should reduce the product-to-customer cycle. It's [The Toyota Way](https://en.wikipedia.org/wiki/The_Toyota_Way).

OK, enough rambling. If you are interested in DevStream, simply go to our [GitHub repo](https://github.com/devstream-io/devstream), follow our README and quickstart, and have a go. I'm sure you will have some "WTF" moments during your first try, in which case, don't hesitate to head to our [GitHub Issues page](https://github.com/devstream-io/devstream/issues) and hit the "New Issue" button hard. We have prepared a few templates there to help you quickly get your dissatisfaction out of your system. Heck, you can even create an issue about the issue templates themselves. For helpful contributions, we will give you a "good first issue" label and who knows, probably the marketing team will reach out and award you with a little physical prize as well!

---

## Intrigued?

Then let's dive a little deeper into it.

### Architecture

A picture is worth a thousand words:

![architecture-overview](https://github.com/devstream-io/devstream/blob/main/docs/images/architecture-overview.png?raw=true)

We use the [Go plugin](https://pkg.go.dev/plugin). I know this is kind of a big topic so here I'm only going to talk about it briefly:

- First of all, we want to support many DevOps tools, and one tool corresponding to one plugin sounds natural.
- Second of all, although there are other ways to do the "core-plugin" architecture, we reviewed Go's plugin and it met our needs.
- Oops, I thought there was a "third" or "last but not least", but there isn't. Sorry.

### State

We consider DevStream (CLI tool `dtm`, don't ask me why; it's another whole story. Read [this](https://github.com/devstream-io/devstream#why-dtm) if you enjoy stories) as a "[state machine](https://en.wikipedia.org/wiki/Finite-state_machine)".

Simply put, given input and the current state, DevStream will calculate what to do, so that "what you want" (what you described in the input) is "what you get".

If you are interested, read more [here](https://github.com/devstream-io/devstream/blob/main/docs/core_concept.md).

### Directory structure

We follow Golang's [standard project layout](https://github.com/golang-standards/project-layout). But don't click that link, it's too long and too verbose and contains probably many things you don't immediately need right now. Continue to read the TL;DR version:

- `/cmd`: main applications for this project. _Don't put a lot of code in the application directory. If you think the code can be imported and used in other projects, then it should live in the `/pkg` directory. If the code is not reusable or if you don't want others to reuse it, put that code in the `/internal` directory._
- `/pkg`: library code that's ok to use by external apps. _Other projects will import these libs expecting them to work, so think twice before you put something here._
- `/internal`: private application and library code; things you don't want others to import in their own apps.
- `/hack`: contains many scripts that ensure continuous development of DevStream. We didn't invent this; we simply stole [Kubernetes' idea](https://github.com/kubernetes/kubernetes/tree/master/hack).
- `/build`: packaging and CI-related stuff.
- `/docs`: pretty much self-explanatory. Need I say more?
- `/examples`: examples for your apps or public libs. Here we use it to store some sample configurations.

Of course, this isn't the only way to set up a repo structure for a Golang app. If you are a beginner, though, this can save you some time. For example, after reading this, you should know that if you want to find the entrance of the app, you shall look into the `cmd` folder. That's where the main app lives.

### Core / Plugin

- Core code: https://github.com/devstream-io/devstream/tree/main/internal/pkg/pluginengine
- Plugins Code: https://github.com/devstream-io/devstream/tree/main/internal/pkg/plugin

### How Exactly Does `dtm apply` Work? Is it "Automatic", or "Automagic"?

1. It all starts with [`/cmd/devstream/main.go`](https://github.com/devstream-io/devstream/blob/main/cmd/devstream/main.go).
2. It executes the `apply` command in [`/cmd/devstream/apply.go`](https://github.com/devstream-io/devstream/blob/main/cmd/devstream/apply.go).
3. The _Engine_ [`/internal/pkg/pluginengine`](https://github.com/devstream-io/devstream/tree/main/internal/pkg/pluginengine) runs the logic for `apply` at [`/internal/pkg/pluginengine/cmd_apply.go`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/cmd_apply.go).

Then, happy digging around in the "Apply" function!

---

## You Release Waaaaay Too Slow! I WANT THE LATEST STUFF!! NOW!!!

Alright, alright, here you go.

First, install Go. If you haven't done so, please refer to the [official doc here](https://go.dev/doc/install).

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

## Want More?

Congratulations if you have followed so far. Why not go the extra mile by creating a new plugin of your own and play with it?

Each plugin needs to implement four interfaces, defined as follows:
- [`Create`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/plugin.go#L12)
- [`Read`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/plugin.go#L13)
- [`Update`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/plugin.go#L14)
- [`Delete`](https://github.com/devstream-io/devstream/blob/main/internal/pkg/pluginengine/plugin.go#L16)

Refer to an existing plugin for more detail. For example, [this one](https://github.com/devstream-io/devstream/blob/main/cmd/argocd/main.go).

I know, I know, before you complain, let me tell you this: due to the nature that each plugin is in fact a separate thing from others, there will be some duplicated scaffolding, copying, and pasting when you try to create a new plugin.

EXCEPT I WON'T ALLOW IT TO HAPPEN.

Good news! We created a tool to make it a whole lot easier for you. NO COPY-PASTE. Run:

```bash
dtm develop create-plugin --name=my-pluing-name-here
```

and we will bootstrap the required code, files, and directory structure for you. How about that? Happy hacking, buddy!

If you enjoy reading this post, please like, comment, and subscribe! I will see you next time.

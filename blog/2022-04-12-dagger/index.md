---
slug: dagger-review-2022-apr
title: Dagger (the CI/CD Tool, not the Knife) In-Depth - Everything You Need to Know (as of Apr 2022)
authors: ironcore
tags: [General, CI, DevStream]
---

![Chaotianmen, Chongqing, China.](./banner.jpg)
*Chaotianmen, Chongqing, China. Photo: Tiexin Guo / CC-BY-CA*

## 1 What is Dagger?

TL;DR: Dagger runs your CI/CD pipelines locally in a Docker container, and can run the container in any CI environment (as long as that CI can run a container, of course.)

Do you want the long answer to this million-dollar question? It's hard to answer, honestly. News is calling it a "DevOps platform"; the VC that funded Dagger even called it a "DevOps operating system."

But, in fact, Dagger is neither of those things.

Before we can answer what Dagger is, let's have a look at it in-depth:
<!--truncate-->

## 2 Quirks and Features

### 2.1 BuildKit

In Dagger, the configuration is executed in BuildKit, which is the execution engine at the heart of Docker.

BuildKit was developed as part of the Moby project, the latter of which is an open framework to assemble specialized container systems without reinventing the wheel by Docker. Basically, it's a toolkit for converting source code to build artifacts in an efficient, expressive, and repeatable manner. It was announced in 2017 and began shipping with Docker Engine in 2018’s version 18.09.

### 2.2 CUE

Unlike most popular CI systems out there, you don't write YAML in Dagger; you write CUE.

I feel you because I didn't know what's CUE either. Turned out, CUE is an open-source data validation language and inference engine with its roots in logic programming.

It aims to simplify tasks involving defining and using data. It's actually a superset of JSON, so users familiar with JSON should feel comfortable with it already and can get started quickly. It also has got built-in auto-formatting (yay.)

Although the language is not a general-purpose programming language, it has many applications, such as data validation, data templating, configuration (that's probably why Dagger decided to use it in the first place), querying, code generation, and even scripting.

### 2.3 Wait a Minute

Since it's already reusing Docker's parts for configuration execution, why not reuse Docker's other part, Dockerfile, for configuration?

What's the purpose of using another language just for the configuration?

Solomon Hykes, the founder of Dagger, actually answered exact this question on their official Discord channel:

> We needed a modern declarative language with a type system, a package manager, native yaml and json interop, a formal spec, and a standalone community not locked to one tool.
>
> Also Dockerfiles are specific to build, but Dagger is more general-purpose automation
> 
> There was no way at all Dockerfile could support our requirements (speaking as one of the original authors of the Dockerfile syntax)

## 3 Enough Tech Spec. What Does Dagger Do?

### 3.1 What Dagger Isn't

First, let me tell you what Dagger isn't by quoting the official documentation:

> Dagger does not replace your CI: it improves it by adding a portable development layer on top of it.

OK, so it's not yet another CI (or CD, for that matter).

Dagger didn't even try to _replace_ your existing CI, at all. But rather, it _improves_ your CI, by adding a wrapper layer.

I know the term "wrapper" doesn't sound fancy, so let's call it by its official reference, and that is "portable development layer".

### 3.2 So, Just a Wrapper?

Disappointed? Don't conclude too quick; follow me. First, let's look at some other DevOps/cloud related examples:

- Think of Terraform. You've got multiple environments to manage. Even with reuseable modules and roles, you still have duplicated code across envs. Then comes Terragrunt, which is a (thin) wrapper that provides extra tools for keeping your configurations simple without repeating yourself.
- Think of AWS CDK. It actually is a wrapper layer on top of CloudFormation, which lets you use your familiar programming languages to define and provision AWS cloud infrastructure, so that you don't have to deal with CloudFormation's non-human-readable configurations. Of course, your code still converts to a format that CloudFormation understands, and your infrastructure is still managed by CloudFormation; AWS CDK doesn't really interact with AWS APIs directly. That's why it's only a wrapper layer on top of CloudFormation.
- Think of CDKTF (CDK for Terraform); it's no different than AWS CDK, perhaps because CDKTF is inspired by AWS CDK and also uses AWS's `jsii` library to be polyglot. It's a wrapper layer on top of Terraform that translates your code into Terraform HCL so that you don't have to learn HCL. But in essence, your infrastructure is still managed by Terraform HCL, not your code directly. So, it's yet another wrapper.

You must have already figured out where I am going with this, and you are right: yes, Dagger is no different. It is a wrapper.

But, of course, the wrapper has to do something to be useful, right? Then what exactly does Dagger do? What exactly does Dagger wrap? Good Questions.

### 3.3 What Dagger Can Do

In any CI system, you define some steps and actions in a certain format (YAML, most likely) and run it in your CI system. For example, in Jenkins, maybe you will write some groovy file. In GitHub Actions, you write some YAML with multiple steps.

Basically, Dagger runs those "steps and actions" in a Docker container. Then where do you run the Dagger docker container itself? Great question: you can either run it locally (because you can install Docker desktop, right?) or in your existing CI (since most CIs can run a docker container.)

If you think about it: Dagger doesn't wrap your CI pipelines or systems. It wraps those detailed steps and actions into a Docker container and still runs in your existing CI. It's like writing a big Dockerfile, and when you run the container, it does git clone, source code static scan, test, build, artifact upload, and what have you.

## 4 What Dagger Really Is

Yes, Dagger is a wrapper, that part is true.

But, it doesn't wrap CI systems; it wraps your pipeline steps and actions into a container (you have to rewrite those steps and actions in Dagger's syntax, though), and the wrapped result can run in another CI (as long as that CI can run a container.)

In this sense, Dagger _is_ yet another CI, except that CI runs in a container and most CI systems happen to be able to run containers.

## 5 Benefits

I think there are 3 major advantages of using Dagger

### 5.1 Local Development

Firstly, there is no need to install _any_ dependencies specific to this application, because Dagger manages all the intermediate steps and transient dependencies inside the Docker container.

This might not be an advantage if we are talking about CI, but it is an advantage if we are talking about local development.

Think of Go where you have to install modules or think of Nodejs where you might even need to switch Node versions then do an NPM install. Now you can do all of those inside a container and only get the final result to your local laptop.

### 5.2 "On-Premise" CI

You can run your pipeline locally now since you can easily have the Docker desktop up and running locally.

I'm not sure if this is a solid requirement, though. Maybe it is? Because we all have powerful laptops now; why waste money on some CI systems when you can run them locally?

The idea of running it anywhere as long as Docker is available is intriguing, though. If you don't want to buy CI as a service, you can run Dagger in your own infrastructure. 

### 5.3 Migrate to Another CI

Since your "steps and actions" now are running in a container, you can run it elsewhere, in another CI system.

Should you need to migrate to another CI, you do not need to rewrite your CI steps anymore. For example, you don't want to use your company's old Jenkins instance anymore, but you are already using Dagger with Jenkins, and now you want to give GitHub Actions a try.

It's worth noting that in this scenario, there are still two things to do:

- If you are using Jenkins now, and want to migrate those Jenkins pipelines into Dagger, you need to do it manually. The cost is the same (if not more) as rewriting your whole pipeline in GitHub Actions' syntax.
- You will still need to learn about your new CI system: how a job is triggered, the syntax, etc.

Here you can see Dagger does provide a solution to avoid CI lock-in (to some extent.) But it is not a game changing solution that could resolve your flexibility concern. 

For a DevOps engineer, a DevOps toolchain that could accommodate different needs and priorities from different teams is more than appealing. That being said, each component is modular and pluggable, and you could free yourself from tedious work like launching, integrating, and managing all these pieces. 

Ideally, you could define your desired DevOps tools in a single human-readable YAML config file, and with one single command, you have your whole DevOps toolchain and SDLC workflow set up or changed. 

If you are intrigued by the simplicity of "DevOps toolchain as code", don't hesitate to check out DevStream [here](https://github.com/devstream-io/devstream). 


## 6 Should I use Dagger Now?

Is it promising? Maybe. Should I start using it now? My answer is No. Three reasons:

- The Dagger project itself still uses GitHub Actions. Why? Probably because it has limitations and can't do everything you can achieve with GitHub Actions.
- You probably won't change your CI system every 6 months. If you only change it one time in 4 years, why bother adding that wrapper?
- Dagger is only recently announced. It hasn't supported a whole lot of CI systems yet. Maybe the CI you want to switch to doesn't support it yet.

Like, comment, subscribe. See you in the next article!

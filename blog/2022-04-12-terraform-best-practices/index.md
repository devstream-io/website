---
slug: 9-terraform-best-practices
title: 9 Extraordinary Terraform Best Practices That Will Change Your Infra World
authors: ironcore
tags: [Terraform, IaC, DevStream]
---

![Pidu District, Chengdu, China](./banner.jpg)
*Pidu District, Chengdu, China. Photo: Tiexin Guo / CC-BY-CA*

_Note: this article is orignally published at [GitGuardian Blog](https://blog.gitguardian.com/9-extraordinary-terraform-best-practices/)._

Before you quickly glance over the title and think "Oh god, yet another tutorial on how to give proper names to variables, how to use modules, how to manage states; nothing I haven't already know" then close the tab right away, let me assure you this: this article is none of those.

This "best practices" article aims to tell you something you haven't read a hundred times. This article won't give you the answer to everything because there isn't one right answer that fits all. This article aims to make you think about your unique situation and make the best decisions by you and for you.

Without further adieu, let's start with writing Terraform code:
<!--truncate-->

---

## 1 Clean Code

No tool or programming language is perfect, and Terraform is no different. It has limitations.

For example, for old Terraform users from 0.12 or even earlier age, you might remember that before Terraform 0.13, you can't even use `for_each` for modules. In August 2020, with the release of Terraform 0.13, HashiCorp finally introduced the ability to loop over modules with a single module call.

Once you have accepted the quirks and features, you can utilize a bunch of best practices to organize your code and to use it better. Even though Terraform isn't strictly a programming language, similar rules of writing code apply to Terraform as well.

But before we talk about Terraform code, let's have a quick look at coding or programming in general.

### 1.1 On "Code"

I want to start this conversation by quoting Knuth:

> Programs are meant to be read by humans and only incidentally for computers to execute.

The computer has no problem with ambiguous variable names, extended functions, or a single file of thousands of lines of code. It will still execute properly. All the methodologies and ideas like refactoring, clean code, naming conventions, modules, packages, code smell, etc., are invented so that we _humans_ can read the code better, not computers can run it better.

### 1.2 Code, Evolving Code

Programs evolve. Code changes.

It's rare that you finished a piece of code and leave it there for the rest of your life. But that's not how projects work. If that was the case, we wouldn't be talking about Terraform best practices: you would only use it once anyway.

It's normal that when we are at work, we have projects all the time. The time when there isn't any project is scarce. Because business wants to improve, and the project is the way to move from the current state to the next desired state. Changing from one state to another is "project". By Nature, "project" means change, and the code is also changing constantly.

### 1.3 Writing Clean Code

In order to make the change more manageable, we write clean code.

We limit the length of the line width because humans are not good at reading very wide lines of words; we carefully choose the names of the variables so that we immediately know what it means the next time we read it; we try to reduce the length of functions because shorter functions are not only easier to test but also easier to understand; we try to split a file with thousands of lines of code into smaller chunks.

Computers don't care about any of these, at all. Be it one large file or ten smaller chunks of files, it will run. Clean code makes it easier and faster to read, to understand, to build upon it.

You may already understand where I'm going with this, and you are right: we want to do whatever it is so that our code is easier to read, manage, and change.

### 1.4 Write Clean Terraform Code

I don't need to tell you how to name your variables, why it's a bad practice to name a server "test-server" while it's in the production environment, should you add a tag to a resource or not, etc.

Use your best judgment.

Do whatever it is to make the code manageable (or just Google and read any other available Terraform best practices out there.)

---

## 2 Know Your Stuff

### 2.1 Play with It First

For people who are new to the cloud or new to a specific service in the cloud, I don't recommend using Terraform as the first attempt to create that resource. This is true no matter which IaC tool you are using, not specific to Terraform.

First, go to the console, try things manually, read the official documents and FAQs, figure out what parameters are mandatory and what are optional, and what are the possible values for each specific parameter. This would definitely help. Don't worry because some big guy in the DevOps world told you that "the moment you click a button in the console, you create technical debt." Forget about it. Get comfortable with it first.

Once you grasp the keys of the resource you are going to create, you can automate it using Terraform.

For experienced Terraform users, see if this relates to you: AWS released a new service or a new resource. You haven't used it yet. You tell yourself: "I'm a veteran; only noob plays with console. I'll just get started with a perfect Terraform module right away. Why bother playing with it in the console first anyway?" Then after hours of working and debugging, you find out that you are stuck only because of a small parameter or configuration of the resource which you didn't figure out clearly in the first place.

### 2.2 Know Your Infrastructure

You need to know what exactly is created and managed by your Terraform code. 

This is especially important when using third-party modules because there are so many parameters and different use cases, it's hard to know exactly which scenario to pick, what resources will be created, and what values to set for those bunch of parameters.

Oftentimes, when I need to provision some resources in the cloud using Terraform, I find that I can do it quicker if I write the resources and modules myself (of course, I could also re-use modules I wrote before) than finding a third-party module off the internet because a lot of third-party modules are heavily future-proofed; they try to solve everybody's problem with the same module: they are doing it the "monolithic" way.

Here I don't mean to assign blame to anybody, but for example, if you try to search a module, like EKS, from Terraform registry, you will find out that it has a whopping 62 input parameters. If you want to create an EKS cluster in an existing VPC, using self-managed worker nodes, with certain launch templates, what parameters to set? Have fun figuring that out.

Sometimes, "do not re-use the wheel" is the better way to go: Terraform isn't easy to get started, but once you get fluent with it, it's relatively easy to use. Creating a resource or a module isn't rocket science. You can manage it within a reasonable period of time. Weigh the advantages and disadvantages of using third-party modules before you decide.

---

## 3 The Myth of Future-Proof

When you only need one feature, implement one, don't even try to implement another feature you might use in the future. Premature future-proof or over-future-proof generates not-so-clean code. This is also true even if you are using another Infrastructure as Code tool other than Terraform.

Many "best practices" would tell you to never use a local backend, always use a remote backend, run your Terraform from within a CI tool, always use modules, etc.

I'm telling you none of those.

Because _there is no "one-size-fits-all" answer; it all depends._

For a simple example, if I'm working with a minimum viable product (MVP) or even a proof of concept (POC), why bother wasting time creating a remote state with state lock and executing the job from a CI running in K8s in the cloud and creating ridiculously small modules just to have modules because others told you it's "best practice" to do so?

You can't possibly know what you exactly are going to need in the future. Chances are, even if you did some future-proof work, created some perfect module, and set up perfect remote state management, in the future, when you really need to use it, you would probably refactor it anyway. It's not like creating a module is hard. It isn't; it's not rocket science.

When you try to future-proof your code, you write if-else. You write conditions and branches so that your code could work for more than one scenario. Refactor is all about reducing if-else and simplifying the code. Why introduce complexity when you don't really need it now?

But hey, don't get me wrong: I'm not telling you to give up modules and remote states and some fancy features and what have you; the point is, creating a flexible base so that it could adapt to possible future changes, but don't waste too much time and energy future-proofing it.

---

## 4 Do One Thing and Do It Right

Just like the example given in the previous section, there are too many examples of Terraform modules and code that try to be the "complete package" by supporting every single possible scenario.

For experienced Terraform users, you might already be familiar with this: to make your module "complete" and useful in every scenario, you use complicated input variable structure, you create even more complicated local variables with short-hand conditions, you even need to use built-in functions to merge multiple variables as one so that if one variable is empty, you can still get the value from another variable and no exception would be thrown.

For starters, when you look at the code like this, it's not "declarative" anymore, because when you read something as complicated as that, you can't really know the description of the infrastructure that you are going to create with that code, you can't know what value is being set to this specific parameter.

Maybe writing a module for a specific scenario isn't that bad. When you have a slightly different use case, create another module. This might generate duplicated code, so you need to:

---

## 5 The Art of Finding the Balance: DRY V.S. Readability

DRY means Don't Repeat Yourself, and this principle is loved by many programmers.

Yet, you also have to find the right balance between "duplicated code" and "readability." This is also true for any programming language because code is for humans to read.

When you want to achieve two things in one piece of code, you will need extra input parameters. You will need if-else. You will need to generate various outputs too. Adding too many features into one piece of code will invariably reduce the readability because brains are not so great with if-else and parameters.

On the other hand, you can choose to have two pieces of code for two slightly different features, with both having straight-forward logic flow and easy to read, but in this way, you probably will have some duplicated code. Using the right technique, for example, extracting the similar part out and creating a small module for it (if it will be commonly used) might be an answer.

Finding the right balance between duplicated code and readability is an art that requires experience to be made perfect, and only you can decide for yourself. "You must have less than 10% duplicated code" or "reuse modules as much as possible" are simply not pragmatic or helpful suggestions.

---

## 6 Separate Infrastructure with Configuration

### 6.1 A Story

Once, I was in a project where we use IaC to create Kubernetes clusters; then, some customization is done on top of it to install required components inside the cluster.

In that project, Terraform is used, then Terraform Kubernetes provider is also used to install things inside the cluster. So far, so good, because Terraform is idempotent (more on that later) by design.

The thing is, if a certain resource is already in the cluster, like a ConfigMap, the Kubernetes provider can't "upsert" it, and it would fail because it already existed. The provider breaks the idempotency.

This is an example of why you want to separate your IaC part from the configuration management part because not only does it make sense logically, but also it reduces the complexity.

In the example above, if we used Terraform only to create the cluster and nothing else, then use CI/CD tools to do `kubectl apply`, there would be no trouble at all.

### 6.2 What's Infrastructure as Code (IaC)

Infrastructure as Code (IaC) manages infrastructure in a descriptive model:

- It uses code files as the definition rather than interactive tools.
- It tries to achieve 100% automation.
- It doesn't matter if you run your own data center or you use the public cloud.

You write code to manage your networks, servers (physical servers or virtual machines), connections, connection topology, load balancers, etc.

### 6.3 What's Configuration Management (CM)

Configuration Management (CM), on the other hand, maintains computer systems, software, dependencies, settings, etc., in a desired, consistent state.

Think physical data center as another example: purchasing servers, putting a newly purchased server onto a rack, installing servers, connecting networking cables to the switches so that it's connected to the existing networks (or think of launching a new virtual machine and assigning network interfaces to it) belongs to the definition of "infrastructure." These are infrastructure parts, done by specific teams. In contrast, after the server is launched, configuring the servers to run specific software, for example, installing an HTTP server software and configuring it belongs to "configuration management", and it probably can be done by another team which doesn't need to worry about the underlying infrastructure at all.

### 6.4 The IaC and CM Separation

In the real world, things are not as simple as the "black or white" example above because we have many different tools and technologies allowing us to do Infrastructure as Code, or configuration management, or both at the same time.

For example, although Terraform is considered an IaC tool, it can do some configurations and installations on certain servers. And although Ansible is considered a configuration management tool, it can launch virtual machines.

Finding the right boundary for you, figuring out which part you would like Terraform to manage, and how Terraform interacts with your choice of CM tools is crucial, especially for large projects.

In an ever-changing world, the entropy in your system is only increasing. In the long run, you will benefit greatly from "simplify" and "do one thing and do it right."

---

## 7 Make Your Terraform Code Idempotent

Idempotent means no matter how many times you run your IaC and, what your starting state is, you will end up with the same end state.

The same principle applies to configuration management too.

Why Do We Need Idempotency?

Idempotency is nice to have because infrastructure and configuration are not getting simpler as time goes on. Even if you just started fresh, you will handle complicated situations in no time. Idempotency simplifies the provisioning of infrastructure and the management of configurations, and it reduces the chances of inconsistent results.

For example, you need to set up A, then set up B after A is finished. If setting up A failed, you want to re-run your automation so that it can retry setting up B without trying to create A again (if it tries to create A again, it will fail because A already exists).

How to make it idempotent? Read on.

---

## 8 Make Your Terraform Code Declarative

To achieve idempotency, a declarative style of code is preferred in most cases. 

Declarative means defining the final state you want to have, rather than what command to execute in the code.

For example, you want to install an HTTP webserver. The task should be described as "ensure an HTTP server is installed" (i.e., if the HTTP server isn't installed, install it; if already installed, do nothing), instead of "run this apt command to install the server."

When you look at your Infrastructure as Code, it should be like reading a document, a description of what you will have if you run this code, no matter how many times you run it.

When writing your infrastructure code or even creating a Terraform provider, you need to have "side effects" in mind. If this part runs a shell command or script, what happens if I run "terraform apply" again?

---

## 9 Forget about Cloud Agnostic / Vendor Lock-in

This might be controversial, but I'd like to make it clear: Terraform isn't "Cloud-Agnostic", and vendor lock-in doesn't matter (at least it not as much as you might think.)

In many cases, people are fighting hard to avoid vendor lock-in. Because we want to have a "backup plan" if things don't work out nicely with the current vendor. We want to have the option of moving to another vendor with as little trouble as possible.

It's not the case in the real world.

When you buy servers in bulk, you probably sign multi-year contracts with the vendor for a better price. When you are using the cloud, you rarely decide to move to another cloud. Having a multi-cloud setup, maybe yes, but migrating from one cloud to another isn't common, although situations like that do exist.

Even if you want to use Terraform to manage your AWS resource because you might want to move to GCP or Azure in the future, and you know Terraform works with GCP and Azure, in reality, you can't re-use your code. It goes without saying that if you want to switch from one cloud to another, you need to rewrite all your Terraform code: different cloud has different Terraform providers, and their resource name and parameters differ greatly.

Admit it or not, you are vendor locked-in, one way or another.

Once you are clear of this, it's, in fact, easier for you to choose the right tool for the job: because you are not afraid of vendor lock-in anymore, and you don't put it as the top priority one when making comparisons. Instead, you start to see the features, advantages, and disadvantages of each choice. For example, if you are already using Terraform with AWS, but for this specific piece of infrastructure, it might be even easier to use AWS CDK or some other tool (for example, `eksctl` to create a K8s cluster), why not?

## Summary

With a not-so-flat learning curve, Terraform can be intimidating, but once mastered, it provides you enough flexibility to manage your infrastructure. There are pitfalls and issues if you don't use it properly, but with some care and continuous refactoring, it can be manageable, and the code can be kept clean and easy to read. I hope these "best practices" help!

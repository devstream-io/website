---
slug: create-dtm-plugin-for-anything
title: Creating a DevStream (dtm) Plugin for Anything
authors: ironcore
tags: [how-to, DevStream]
---

![A cat outside a lake side Starbucks, Chengdu, China](./banner.jpg)
*A cat outside a lake side Starbucks, Chengdu, China. Photo: Tiexin Guo / CC-BY-CA*

Yes, the title of this post isn't bluffing: you can actually create a plugin for just about anything that takes your fancy.

> In my previous article, I walked you guys through DevStream's codebase.
> 
> If you haven't read it yet, here's a quick link for you:
> 
> [Hello, world!](hello-world).
 
In this blog, we will walk you through the steps of creating a DevStream plugin from scratch with an example. 

---

## What is DevStream

DevStream is an amazing tool that lets you install, update, manage, and integrate your DevOps tools quickly and flexibly.

Not to brag, but with DevStream, you can have your own DevOps toolchain that is specifically tailored to your need up and running in 5 minutes.

Don't believe it? Check out our [docs](/docs) and follow the quickstart guide!

## Existing Plugins

At the moment of publishing this article, we already support the following tools:

- Trello (including integration with GitHub)
- Jira (integration with GitHub)
- GitHub Repository bootstrapping (for Go)
- GitHub Actions (for Go, Python, and Nodejs)
- GitLab CI (for Go)
- Jenkins (installation)
- ArgoCD
- ArgoCD Application (the deployment of your apps)
- Prometheus + Grafana
- DevLake
- OpenLDAP

We aim to have 50 plugins at the end of 2022!

Check out our [README](https://github.com/devstream-io/devstream) for the latest status.

## Why Would I Want to Create a DevStream Plugin

Wait. YOU ALREADY HAVE TONS OF PLUGINS! Why on earth would I want to create yet another one?

I agree with you.

Can I get a show of hands, who here has made a DevStream plugin before?

Very few, if any, I guess.

However (I know it's just a fancy "but"), there are, in fact, things that you want to build a plugin for:

- Maybe you are building a nice and shiny DevOps tool, and you want to be able to set it up quickly without any hassle. You would have to write some automation scripts for it anyway, right? DevStream got you covered.
- Maybe you even need to integrate your tool with other tools to get the most out of it and you really don't want to reinvent a lot of wheels just to manage those boring integrations. Again, DevStream got you covered.
- Maybe you have both internal tools and open-source tools whose installation and integration need to be automated. The open-source tools are fine, but how to manage those internal ones and integrate them? DevStream got you covered.

Or, maybe you just want to learn Go's plugin, become a contributor, join our community and earn your certification (maybe a small present, too, who knows.) No problem.

No matter what your intention is and what thing you want to achieve, DevStream got you covered.

So hang tight, let's get started.

## Design: A "Local File" Plugin

In this example, let's build something dum but simple, just to show you the process of creating a plugin.

We are creating a "local file" plugin. You specify the name and the content, and the plugin will create a local file for you. Let's decide how we are going to use this plugin:

```yaml
tools:
- name: my-file
  plugin: localfile
  options:
    filename: foo.txt
    content: "hello, world"
```

Basically:
- the name of the plugin: `localfile`
- options of the plugin:
    - filename
    - content

The plugin will create a file with desired content according to this piece of config.

## Scaffolding Automagically

First, let's clone the DevStream repo and generate some scaffolding code:

```shell
git clone git@github.com:devstream-io/devstream.git
cd stream
# builds dtm locally to make sure it's using the same dependencies as your new plugin
make build-core
./dtm develop create-plugin --name=localfile
```

There will be some useful output to guide you through the whole process.

Now, if we do a `git status`, we can see some new stuff are already created automagically:

```shell
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    cmd/plugin/localfile/
    docs/plugins/localfile.md
    internal/pkg/plugin/localfile/
```

Let's have a quick recap of the directory structure:

### cmd/

`cmd/plugin/localfile/main.go` is the main entrance of your plugin. But here you don't need to do anything; nothing.

`dtm` has already generated the code for you, including the interfaces that you must implement.

### docs/

`docs/plugins/localfile.md` is the automatically generated documentation.

Yep, I know `dtm` is automagic, but it can't read your mind. I'm afraid that you will have to write your own doc.

But hey, at least here you get a reminder that you need to create a doc :)

### internal/pkg/

`internal/pkg/plugin/localfile` has your plugin's main logic.

Here, we need to:

- define your input parameters (options);
- implement the validation of the input parameters;
- implement four mandatory interfaces.

## Core Concepts

### Config/State/Resource 

Before explaining interfaces and implementing them, let's have a look at how DevStream actually works:

- _Config_ is a list of tools, each of which has a name, plugin, options, etc.
- _State_ is a map containing each tool's name, plugin, options, etc. It's used to store the result of `dtm`'s last action.
- _Resource_ is the tool that the plugin created. The `Read` interface returns a description of that resource, which should be the same as the _State_ if nothing has been changed after `dtm`'s last action.

DevStream decides what to do based on your _Config_, the _State_, and the _Resource_'s status. See the flowchart below:

![dtm config state resource](./config_state_resource.png)

### Interfaces

A quick recap: each DevStream plugin must satisfy the following four interfaces:

- `Create`
- `Read`
- `Update`
- `Delete`

Return values:

- `Create` and `Update` return two values `(map[string]interface{}, error)`. The first return value is considered as the _State_, which will be stored in DevStream's state file.
- `Read`'s first return value is a description of the _Resource_, which should be the same as the _State_ if nothing has changed.
- `Delete` returns `(true, nil)` if there is no error; otherwise it returns `(false, error)`.

## Coding

### Input Options/Validation

Now let's open `internal/pkg/plugin/localfile/options.go` and add options according to our design in the previous section.

The `internal/pkg/plugin/localfile/options.go` should look like:

```go
package localfile

// Options is the struct for configurations of the localfile plugin.
type Options struct {
    Filename string
    Content  string
}
```

Let's also implement the validation function of the input options.

Open `internal/pkg/plugin/localfile/validate.go` and change the logic to verify the options. It should look like this:

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

### Create()

We want to create the file based on the input options. So, let's do just that in the file `internal/pkg/plugin/localfile/create.go`.

OK, talk is cheap, show me the code:

```go
package localfile

import (
    "fmt"

    "github.com/mitchellh/mapstructure"

    "github.com/devstream-io/devstream/pkg/util/log"
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

If you compare the code above to the code generated by `dtm develop`, you will see that we basically did nothing here. We only filled some blanks which are marked by `dtm`'s comment. The same is true for all the other interfaces.

_A small tip: here, we can put the function `writefile` in `internal/pkg/plugin/localfile/localfile.go`, so that the code is better organized._

The `localfile.go` will look like this:

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

### Read()

Let's also implement the `Read` interface.

The logic is simple: we want to try to see if the file exists or not, and if yes, what's the filename and content.

`internal/pkg/plugin/localfile/read.go`:

```go
package localfile

import (
    "fmt"
    "os"
    "strings"

    "github.com/mitchellh/mapstructure"

    "github.com/devstream-io/devstream/pkg/util/log"
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

On the return value:

- If the file doesn't exist, return nil, no error, because it means the resource hasn't been created yet (or deleted by somebody)
- If the file exists, return the "status" of it and no error.
- Otherwise, return nil and the error.

### Update()

`Update` will be triggered if `Read` returns a different result than what's recorded in the _State_.

For the implementation, since we are updating a file, it's the same as `Create`, so we can actually reuse it here without duplicated code:

`internal/pkg/plugin/localfile/update.go`:

```go
package localfile

func Update(options map[string]interface{}) (map[string]interface{}, error) {
    return Create(options)
}
```

### Delete()

Last but not least, let's implement the `Delete` interface.

`internal/pkg/plugin/localfile/delete.go`:

```go
package localfile

import (
    "fmt"
    "os"

    "github.com/mitchellh/mapstructure"

    "github.com/devstream-io/devstream/pkg/util/log"
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

Just delete the file; nothing to look at here.

## Build

Now that we finished coding, let's build our new plugin. Our Makefile now supports building a specific plugin only:

```shell
make build-plugin.localfile
```

## Test

First, let's create a config file `config-localfile-test.yaml`:

```yaml
tools:
- name: my-file
  plugin: localfile
  options:
    filename: foo.txt
    content: "hello, world"
```

Now, let's `apply`:

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

As we can see, the plugin has created our file successfully. To verify, you can open the "foo.txt" file to have a look.

If we `apply` again, nothing should happen, since the file is already created with the desired content:

```shell
$ ./dtm -y apply -f config-localfile-test.yaml
2022-03-29 11:30:43 ℹ [INFO]  Apply started.
2022-03-29 11:30:43 ℹ [INFO]  Using dir <.devstream> to store plugins.
2022-03-29 11:30:45 ℹ [INFO]  No changes done since last apply. There is nothing to do.
2022-03-29 11:30:45 ✔ [SUCCESS]  Apply finished.
```

But, what if somebody changed the content of "foo.txt"? Let's experiment:

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

We can see that the file has drifted from the state, so it will be updated. After the operation, the file's content is changed back to what we defined in our config.

Heck, let's even try deleting this file and see what happens:

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

Apparently, DevStream thought the file should exist according to the state, but it doesn't, so it is created again.

Last, let's try to `delete` this file with `dtm`:

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

Hooray!

## Summary

I'm sorry that I put the "TL;DR" at the end; it's only because I want you to have a global feeling of DevStream. But for advanced developers, here's a "TL;DR" (or use it as a checklist) for you:

- Run `dtm develop create-plugin --name=your-plugin`.
- Do a `git status`, then:
    - find the generated files
    - edit/code at the places where there is already a comment mark
- Pay special attention to the return value of the interfaces. Figure out the relationship between _State_ and _Resource_. What the interfaces return decides how this plugin will behave.
- Last but not least, update the documentation.

If you enjoy reading this post, please like, comment, and subscribe! I will see you next time.

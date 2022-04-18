---
sidebar_position: 7
---

# Commands Explained

## 1 `dtm apply`

When _applying_ a config file using `dtm`, here's what happens:

### 1.1 For Each _Tool_ Defined in the _Config_

We compare the _Tool_, its _State_, and the _Resoruce_ it has created before (if the state exists).

We generate a plan of changes according to the comparison result:
- If the _Tool_ isn't in the _State_, the `Create` interface will be called.
- If the _Tool_ is in the _State_, but the _Config_ is different than the _State_ (meaning users probably updated the config after the last `apply`,) the `Update` interface will be called.
- If the _Tool_ is in the _State_, and the _Config_ is the same as the _State_, we try to read the _Resource_.
    - If the _Resource_ doesn't exist, the `Create` interface will be called. It probably suggests that the _Resource_ got deleted manually after the last successful `apply`.
    - If the _Resource_ does exist but drifted from the _State_ (meaning somebody modified it), the `Update` interface will be called.
    - Last but not least, nothing would happen if the _Resource_ is exactly the same as the _State_.

### 1.2 For Each _State_ That Doesn't Have a _Tool_ in the _Config_

We generate a "Delete" change to delete the _Resource_. Since there isn't a _Tool_ in the config but there is a _State_, it means maybe the _Resource_ had been created previously then the user removed the _Tool_ from the _Config_, which means the user doesn't want the _Resource_ any more.

## 2 `dtm delete`

### 2.1 Normal (Non-Force) Delete

When _deleting_ using `dtm`, here's what happens:

- Read the _Config_
- For each _Tool_ defined in the _Config_, if there is a corresponding _State_, the `Delete` interface will be called.

_Note: the `Delete` change will be executed only if the _State_ exists._

### 2.2 Force Delete

When _deleting_ using `dtm delete --force`, here's what happens:

- Read the _Config_
- The `Delete` interface will be called for each _Tool_ defined in the _Config_.

_Note: the difference between "force delete" and "normal delete" is that in force mode, no matter the _State_ exists or not, `dtm` will try to trigger the `Delete` interface. The purpose is for corner cases where the state gets corrupted or even lost during testing (I hope this only happens in the development environment), there is still a way to clean up the _Tools_._

## 3 `dtm destroy`

`dtm destroy` acts like `dtm apply -f an_empty_config.yaml`. 

The purpose of `destroy` is that in case you accidentally deleted your config file during testing, there would still be a way to destroy everything that is defined in the _State_ so that you can have a clean slate.

```{toctree}
---
maxdepth: 1
---
```
## 4 `dtm verify`

The command `dtm verify` checks the following:

### 4.1 Config File

`dtm verify` first verifies if the config file can be loaded successfully.

If not, the following information might be printed out:

- if the config file doesn't exist, it reminds you if you forgot to specify the config file by using the "-f" parameter;
- if the config format isn't correct, it would print some error.

### 4.2 Plugins

`dtm verify` then checks if all required plugins (according to the config file) exist.

If not, it tries to give you a hint that maybe you forgot to run `dtm init` first.

### 4.3 State

`dtm verify` also tries to create a state manager that operates a backend. If something is wrong with the state, it generates an error telling you what exactly the error is.

### 4.4 Config / State / Resource

For definitions of _Config_, _State_, and _Resource_, see the [config_state_resource_explanation.md](../core_concepts.md).

`dtm verify` tries to see if the _Config_ matches the _State_ and the _Resource_ or not. If not, it tells you what exactly is not the same, and what would happen if you run `dtm apply`.

If all the above checks are successful, `dtm verify` finishes with a success log "Verify succeeded."

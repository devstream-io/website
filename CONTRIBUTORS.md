# Maintain contributor info

The contributor pages are generated from the JSON file under `./contributor-info`.

```shell
$ npx tsx ./scripts/generate-contributor-pages.ts
```

## Credly contributors

* [Data file](./contributor-info/contributors.json)
* [Data file JSON schema](./contributor-info/contributors.schema.json)

In case if you want to add a new badge, please add it to the `./contributor-info/badges.json` file,
and update the `./contributor-info/badge-type.schema.json` file accordingly.

## Image Certificates

Image certificates are generated from the image file under `./static/img/community/contributor`.

```shell

* [Data file of members](./contributor-info/contributors-old.json)
* [Data file of contributors](./contributor-info/members-old.json)

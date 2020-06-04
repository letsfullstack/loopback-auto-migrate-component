![Publish Github Package](https://github.com/letsfullstack/loopback-auto-migrate-component/workflows/Publish%20Github%20Package/badge.svg)

# AutoMigrate from Boot Loopback Component

This loopback component enables you to migrate the database and import datas automatcally for the loopback application.

Original Author: Riceball Lee

Node version used for development: **v10.13.0**

## Contributing

:boom: In case you are making a commit for this package repository, **MAKE SURE TO READ AND UNDERSTAND THE FOLLOWING TOPICS**:

1\. Every commit that runs on the [master branch](https://github.com/letsfullstack/loopback-auto-migrate-component/tree/master) runs through the Publish Github Package Workflow on Github Actions. So **be sure to check if your code is well written and tested**, since it'll be published if the code passes the Continuous Integration (CI) unit tests.

2\. If the commit passes through the Github Actions workflow, the module will be released as a package in the Github Packages Registry. This workflow has an [underlying command](https://github.com/phips28/gh-action-bump-version) that **increments/bumps the version from the latest release based on commit messages**, such as:

- If the string "BREAKING CHANGE" or "major" is found anywhere in any of the commit messages or descriptions, the **major version** will be incremented (i.e. 1.X.X).

- If a commit message begins with the string "feat" or includes "minor" then the **minor version** will be increased (i.e. X.1.X). This works for most common commit metadata for feature additions: "feat: new API" and "feature: new API".

- All other changes will increment the **patch version** (i.e. X.X.1).

3\. Furthermore, the workflow has also an underlying command that deploys automatically a new release when a success test/deployment takes places. These releases can be found [here](https://github.com/letsfullstack/loopback-auto-migrate-component/releases).

## Installation

1. Install in you loopback project:

```shell
$ npm install @letsfullstack/loopback-automigrate-component
```

2. Create a component-config.json file in your server folder (if you don't already have one)

3. Configure options inside `component-config.json`:

  ```json
  {
    "loopback-component-auto-migrate": {
      "enabled": true,
      "raiseError": false,
      "migration": "auto-migrate-data",
      "models": ["Role"],
      "fixtures": "./test/fixtures/"
    }
  }
  ```
  - `enabled` *[Boolean]*: whether enable this component. *defaults: true*
  - `raiseError` *[Boolean]*: whether raise error. *defaults: false*
    * it wont stop to import data if not raise error.
  - `migration` *[String]* : the migration ways:
    * "auto-migrate": drop and recreate the tables of the database.
    * "auto-migrate-data": drop and recreate the tables, load datas from `fixtures` folder.
    * "auto-update" *defaults*: update the tables of the databse.
    * "auto-update-data": update the tables, load datas from `fixtures` folder.
    * "auto-load-data": load datas from `fixtures` folder.
  - `models` *[array of String]*: the models to process. *defaults to the all models in the model-config.json*
    * a JSON file location can be used instead of passing all list inside *component-config.json*: `"./test/models/model-list.json"`
  - `fixtures` *[String]*: the datas folder to import.
    * the file base name is the lowercase model name with dash seperated if any.
    * the file extension name is the data file format, the following format is supported:
      * cson
      * yaml
      * json

## Usage

### Automatically use it:

Just enable it on `component-config.json`.

or run `node_modules/.bin/slc-migrate` directly.

set `DEBUG=loopback:component:autoMigrate:*` env variable to show debug info.

When it runs through `component-config.json`, it is attaching the `autoMigrate` promise at `app.get('loopback-component-auto-migrate-done')` that you can use to know when all migrations, data importing etc have finished.

Also the `loopback-component-auto-migrate-status` will be set for convenience:

  * 'loaded': autoMigrate loaded.
  * 'failed': autoMigrate failed.
  * 'done': autoMigrate successful.

### Manually use it:

```js
autoMigrate = require('loopback-component-auto-migrate/lib/auto-migrate');
autoMigrate(app, {models:['Role'], fixtures: 'yourDataFolder'}).then()
```
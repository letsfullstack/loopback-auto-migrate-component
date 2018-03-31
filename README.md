Component AutoMigrate from Boot Loopback Component
=============

This loopback component enables you to migrate the database and import datas automatcally for the loopback application.

Original Author: Riceball LEE - snowyu.lee@gmail.com

Updated Author: Let's Comunica - fabio@letscomunica.com.br

**LAST VERSION: 0.0.1**

Installation
-------

1. Install in you loopback project:

```bash
  npm install --save git+ssh://git@bitbucket.org/letscomunicadev/loopback-lets-auto-migrate-component.git#v0.0.1
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


Usage
-------

#### Automatically use it:

Just enable it on `component-config.json`.

or run `node_modules/.bin/slc-migrate` directly.

set `DEBUG=loopback:component:autoMigrate:*` env variable to show debug info.

When it runs through `component-config.json`, it is attaching the `autoMigrate` promise at `app.get('loopback-component-auto-migrate-done')` that you can use to know when all migrations, data importing etc have finished.

Also the `loopback-component-auto-migrate-status` will be set for convenience:

  * 'loaded': autoMigrate loaded.
  * 'failed': autoMigrate failed.
  * 'done': autoMigrate successful.

#### Manually use it:

```js

autoMigrate = require('loopback-component-auto-migrate/lib/auto-migrate');
autoMigrate(app, {models:['Role'], fixtures: 'yourDataFolder'}).then()

```

Updates
-------

Made a modification? Test it at least in one project before submiting a version. It still needs unit testing and CI with projects. After everything seems perfectly up-to-date, run the following steps:

1\. Commit and push your updates using Let's Bitbucket credentials

2\. Change and commit a new tag version (always check and update the last version here and in package.json):

```bash
$ git tag -a vX.X.X -m "version_message"
```

3\. Push the new tag version to remote repository:

```bash
$ git push origin vX.X.X  # Version needs to be the same from commit
```

4\. Run npm installation with the newest version:

```bash
  npm install --save git+ssh://git@bitbucket.org/letscomunicadev/loopback-lets-auto-migrate-component.git#vX.X.X
```

Original History
-------

### v0.3.0

+ added load models option from JSON file.

### v0.2.3

+ attaching done Promise at the app.

### v0.2.0

+ hasMany relation data supports.



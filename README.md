# pontoonql

Get translation status for a Pontoon project.

## Installation

```sh
$ npm i pdehaan/pontoonql -D
```

## Usage

### API
The following example will query the Pontoon GraphQL endpoint for the "firefox-monitor-website" project and return all locales with at least 80% translated strings:

```js
const pontoonql = require("pontoonql");

pontoonql("firefox-monitor-website", 80)
  .then(languages => console.log(languages))
  .catch(err => {
    console.error(err.message);
    process.exitCode = 1;
  });
```

#### Output

The `pontoonql()` method will return an array of locale-like objects with the following shape:

```js
[ { locale: { code: 'en-CA', name: 'English (Canada)' },
    totalStrings: 263,
    approvedStrings: 263,
    stringsWithWarnings: 0,
    missingStrings: 0,
    progress: 100 },
  {...}
]
```

### CLI

You can also query the GraphQL endpoint using the CLI, as seen below.
Note that the first argument is the name of the Pontoon project and the optional
second parameter is the minimum threshold:

```sh
$ npx pdehaan/pontoonql firefox-monitor-website 80
```

You can also filter the output using something like [**jq**](https://stedolan.github.io/jq/):

```sh
$ npx pdehaan/pontoonql firefox-monitor-website 80 | jq '[.[] | {locale: .locale.code, progress: .progress, warnings: .stringsWithWarnings}]'
```

```js
[
  {
    "locale": "cy",
    "progress": 100,
    "warnings": 0
  },
  ...
]
```

Or, if you only want the locale codes for locales w/ 80%+ translations:

```sh
$ npx pdehaan/pontoonql firefox-monitor-website 80 | jq '[.[] | .locale.code]'

[
  "cy",
  "zh-TW",
  "de",
  "sv-SE",
  "cs",
  "zh-CN",
  "en-CA",
  "es-AR",
  "it",
  "id",
  "fr",
  "ru"
]
```

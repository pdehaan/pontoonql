# pontoonql

Get translation status for a Pontoon project.

## Installation:

```sh
$ npm i pdehaan/pontoonql -D
```

## Usage:

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

### Output:

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

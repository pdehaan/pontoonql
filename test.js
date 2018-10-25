/* eslint-disable no-console */

const pontoonql = require("./index");

pontoonql("firefox-monitor-website", 80)
  .then(languages => console.log(languages))
  .catch(err => {
    console.error(err.message);
    process.exitCode = 1;
  });

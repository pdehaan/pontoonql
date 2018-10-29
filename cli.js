#!/usr/bin/env node

const pontoonql = require("./index");

const argv = process.argv.slice(2);

main();

async function main() {
  const res = await pontoonql(...argv);
  console.log(res);
}

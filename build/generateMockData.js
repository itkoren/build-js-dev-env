'use strict';

/* eslint-disable no-console */
import jsf from 'json-schema-faker';
import {schema} from './mockDataSchema'; // our mock data schema
import fs from 'fs';
import chalk from 'chalk';

const json = JSON.stringify(jsf(schema)); // convert json schema faker results to json string

fs.writeFile('./src/api/db.json', json, function (err) { // write json string to file
  if (err) {
    return console.log(chalk.red(err));
  }
  else {
    console.log(chalk.green('Mock data generated.'));
  }
});

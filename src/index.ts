#!/usr/bin/env node

import { Check } from './cli/Check';

(async () => {
  const filePaths = process.argv.slice(2);
  try {
    await Check.execute(filePaths);
  } catch (err) {
    console.error(err);
  }
})();

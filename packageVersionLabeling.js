const process = require('process');
const fs = require('fs');

const env = process.env.NODE_ENV;

/* eslint-disable no-shadow */
fs.readFile('package.json', (err, data) => {
  if (err) throw err;

  const envs = ['staging', 'testing', 'production'];
  const pkg = JSON.parse(data);
  const parsedVersion = pkg.version.split('-');

  if (envs.includes(parsedVersion[parsedVersion.length - 1])) {
    parsedVersion.pop();
  }
  parsedVersion.push(env);

  pkg.version = parsedVersion.join('-');

  fs.writeFile('package.json', JSON.stringify(pkg), (err) => {
    if (err) throw err;
    console.log(pkg.version);
  });
});

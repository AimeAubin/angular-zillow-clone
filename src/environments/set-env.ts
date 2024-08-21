const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPathProd = './src/environments/environment.ts';
  const targetPathDev = './src/environments/environment.development.ts';
  // Load node modules
  // const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });

  const envConfigFileDev = `export const environment = {
  production: false,
  rapidApiUrl: '${process.env['rapidApiUrl']}',
  rapidApiKey: '${process.env['rapidApiKey']}',
  rapidApidhost: '${process.env['rapidApidhost']}',
  authBaseUrl: '${process.env['authBaseUrl']}',
  xapn: '${process.env['xapn']}',
  };`;

  const envConfigFileProd = `export const environment = {
  production: true,
  rapidApiUrl: '${process.env['rapidApiUrl']}',
  rapidApiKey: '${process.env['rapidApiKey']}',
  rapidApidhost: '${process.env['rapidApidhost']}',
  authBaseUrl: '${process.env['authBaseUrl']}',
  xapn: '${process.env['xapn']}',
  };`;

  writeFile(targetPathDev, envConfigFileDev, () => {
    console.log('Hello, development!');
  });

  writeFile(targetPathProd, envConfigFileProd, () => {
    console.log('Hello, production!');
  });
};
setEnv();

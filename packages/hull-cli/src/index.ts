#!/usr/bin/env node
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';
import hyperquest from 'hyperquest';
import cac from 'cac';
import fs from 'fs-extra';
import chalk from 'chalk';
import tmp from 'tmp';
import validateProjectName from 'validate-npm-package-name';
import { unpack } from 'tar-pack';
// hull create app --template temp-webpack-react-ts

const cli = cac();

cli.version(require('../package.json').version);

const checkAppDir = (appRoot:string, projectName:string) => {
  const isEsitDir = fs.existsSync(path.resolve(appRoot, projectName));
  if(isEsitDir) {
    console.log(chalk.red(`${appRoot} is exisit ${projectName} Dir!`));
    process.exit(1);
  };
};

const verifyAppName = (appName:string) => {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because of npm naming restrictions:\n`
      )
    );
    [
      ...(validationResult.errors || []),
      ...(validationResult.warnings || []),
    ].forEach((error) => {
      console.error(chalk.red(`  * ${error}`));
    });
    console.error(chalk.red('\nPlease choose a different project name.'));
    process.exit(1);
  };
};

function getTemporaryDirectory() {
  return new Promise((resolve, reject) => {
    tmp.dir({ unsafeCleanup: true }, (err:any, tmpdir:string, callback:any) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          tmpdir: tmpdir,
          cleanup: () => {
            callback();
          },
        });
      }
    });
  });
}

function extractStream(stream:any, dest:any) {
  return new Promise((resolve, reject) => {
    stream.pipe(
      unpack(dest, (err:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(dest);
        }
      })
    );
  });
}

const dowmLoadNpmTemplate = () => {
//   const lastPackage = execSync('npm view create-react-app dist.tarball').toString();
//   console.log(lastPackage);
  getTemporaryDirectory().then((obj:any) => {
    const stream = hyperquest('https://cdn.npmmirror.com/packages/create-react-app/5.0.1/create-react-app-5.0.1.tgz');
    return extractStream(stream, obj.tmpdir).then(() => obj);
  }).then((obj) => {
    console.log(obj);
  }).catch;
};

const copyTemplateToApp = (templateName:string, appRoot:string, projectName:string) => {
  fs.copySync(path.join(__dirname, `../template/${templateName}`), path.resolve(appRoot, projectName));
};
cli
  .command('init <app>', 'create app project!')
  .option('--template <template>', 'dev server port')
  .action((projectName:string, { template }) => {
    const appRoot = process.cwd();
    // 校验prjectName是否合法
    verifyAppName(projectName);
    // 检查是否存在该工程
    checkAppDir(appRoot, projectName);
    // 创建工程
    fs.ensureDirSync(path.resolve(appRoot, projectName));
    // 复制模板
    copyTemplateToApp('webpack-react-ts', appRoot, projectName);
    const packageJson = {
      name: projectName,
      version: '0.1.0',
      private: true,
    };
    const config = JSON.parse(fs.readFileSync(path.join(appRoot, `${projectName}/package.json`)).toString()) || {};
    console.log(config);

    fs.writeFileSync(
      path.join(appRoot, `${projectName}/package.json`),
      JSON.stringify({ ...config, ...packageJson }, null, 2) + os.EOL
    );
  });

cli.help();

cli.parse();

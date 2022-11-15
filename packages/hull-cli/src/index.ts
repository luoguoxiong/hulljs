import path from 'path';
import os from 'os';
import cac from 'cac';
import fs from 'fs-extra';
import { chalk } from '@hulljs/utils';
import { build, IBuildOptions, CliIn } from '@hulljs/build';
import validateProjectName from 'validate-npm-package-name';
import prompts from 'prompts';


const { version } = require('../package.json');

const cli = cac();

cli.version(version);

const checkAppDir = (appRoot: string, projectName: string) => {
  const isEsitDir = fs.existsSync(path.resolve(appRoot, projectName));
  if(isEsitDir) {
    console.log(chalk.red(`${appRoot} is exisit ${projectName} Dir!`));
    process.exit(1);
  }
};

const verifyAppName = (appName: string) => {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`,
        )} because of npm naming restrictions:\n`,
      ),
    );
    [
      ...(validationResult.errors || []),
      ...(validationResult.warnings || []),
    ].forEach((error) => {
      console.error(chalk.red(`  * ${error}`));
    });
    console.error(chalk.red('\nPlease choose a different project name.'));
    process.exit(1);
  }
};

const copyTemplateToApp = (templateName: string, appRoot: string, projectName: string) => {
  fs.copySync(path.join(__dirname, `../template/${templateName}`), path.resolve(appRoot, projectName));
};

cli
  .command('init <app>', 'create app project!')
  .action(async(projectName: string) => {
    const appRoot = process.cwd();
    // 校验prjectName是否合法
    verifyAppName(projectName);
    // 检查是否存在该工程
    checkAppDir(appRoot, projectName);
    const isReact = await prompts([
      {
        type: 'select',
        name: 'isReact',
        message: 'is use react or vue?',
        choices: [
          { title: 'react', value: true },
          { title: 'vue', value: false },
        ],
      },
    ]);

    if(isReact.isReact === undefined){
      return;
    }
    const isTs = await prompts([
      {
        type: 'select',
        name: 'isTs',
        message: 'is use TypeScript?',
        choices: [
          { title: 'true', value: true },
          { title: 'false', value: false },
        ],
      },
    ]);

    if(isTs.isTs === undefined){
      return;
    }

    // 创建工程
    fs.ensureDirSync(path.resolve(appRoot, projectName));

    const options = { ...isReact, isWebpack: true, ...isTs };

    const templateName = [
      `${options.isReact ? 'react' : 'vue'}`,
      `${options.isTs ? 'ts' : 'js'}`,
    ];
      // 复制模板
    copyTemplateToApp(templateName.join('-'), appRoot, projectName);



    const config = JSON.parse(fs.readFileSync(path.join(appRoot, `${projectName}/package.json`)).toString()) || {};


    const packageJson = {
      name: projectName,
      version: '0.1.0',
      ...config,
      devDependencies: {
        ...config.devDependencies,
        '@hulljs/cli': version,
        '@hulljs/eslint-config-hull-app': version,
      },
    };
    fs.writeFileSync(
      path.join(appRoot, `${projectName}/package.json`),
      JSON.stringify(packageJson, null, 2) + os.EOL,
    );
    console.log(chalk.green('create success!'));
    console.log(chalk.gray(`Created ${projectName} at ./${projectName}`));
    console.log(chalk.gray('Inside that directory, you can use commands:'));
    console.log();
    console.log(chalk.blue('    npm install'));
    console.log(chalk.gray('        Get the app dependencies.'));
    console.log();
    console.log(chalk.blue('    npm run dev'));
    console.log(chalk.gray('        Starts the development server.'));
    console.log();
    console.log(chalk.blue('    npm run build'));
    console.log(
      chalk.gray(
        '        Build the app into static files for production.',
      ),
    );
    console.log();
    console.log(chalk.blue('    npm run server'));
    console.log(
      chalk.gray(
        '        Build the app into static files for production and Run static Server.',
      ),
    );
  });

cli
  .command('dev', 'Start dev server!')
  .option('--port <port>', 'dev server port')
  .option('--vite', 'is use vite?')
  .action((options: CliIn) => {
    try {
      const option: IBuildOptions = {
        appDirectory: fs.realpathSync(process.cwd()),
        port: options.port,
        env: 'development',
        buildTool: options.vite ? 'vite' : 'webpack',
        analyzer: false,
      };
      build(option, 'dev');
    } catch (error: any) {
      throw Error(error);
    }
  });

cli
  .command('build', 'Build web app resource！')
  .option('--vite', 'is use vite?')
  .option('--analyzer', 'is use BundleAnalyzer?')
  .action((options: CliIn) => {
    try {
      const option: IBuildOptions = {
        appDirectory: fs.realpathSync(process.cwd()),
        env: 'production',
        buildTool: options.vite ? 'vite' : 'webpack',
        analyzer: options.analyzer,
      };
      build(option, 'build');
    } catch (error: any) {
      throw Error(error);
    }
  });

cli
  .command('server', 'Start static server for production app!')
  .option('--vite', 'is use vite?')
  .option('--port <port>', 'static server port')
  .action((options: CliIn) => {
    try {
      const option: IBuildOptions = {
        appDirectory: fs.realpathSync(process.cwd()),
        env: 'production',
        buildTool: options.vite ? 'vite' : 'webpack',
        port: options.port,
      };
      build(option, 'server');
    } catch (error: any) {
      throw Error(error);
    }
  });


cli.help();

cli.parse();

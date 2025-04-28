import fs from 'node:fs/promises';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora-classic';
import path from 'node:path';
import * as recast from "recast";
import {
    configTheme, reactNativeConfigContent,
    eslintConfigContent, vscodeJsonContent,
    babelConfigContent
} from '../content';
import { Audio } from './audio';


export class Setup  extends Audio{

      /**
     * @description this method used for initial project configuration
     * @param
     */
      async init() {
        const existsConfig = await this.checkConfigFileExists();
        // crete config file
        if (!existsConfig) {
            await this.creteConfig();
            await this.creteNecessaryFolder()
            await this.setupTheme()
            await this.install('npm install react-native-svg --save')
        } else {
            chalk.blue('Already initialized ')
        }
    }


    /**
     * @description this function using for setup theme
     */
    async setupTheme() {
        // creating theme configuration file 
        const isTS = await this.checkIsTsProject();
        const isExpo = await this.checkIsExpoProject();

        // setup font in project
        console.log(chalk.green('Setup theme in project, like font, color, border radius, gap, space,  etc'));
        const themeAns = await inquirer.prompt([
            {
                type: "confirm",
                message: "Are you sure to setup theme in your project",
                name: "theme"
            }
        ])
        if (themeAns.theme) {
            const fontPath = await inquirer.prompt([
                {
                    type: "input",
                    message: "Please gave me you font path",
                    name: "font_path",
                    default: "./assets/fonts"
                }
            ])
            if (isExpo) {
                await this.install('npm install expo-font');
            } else {
                await fs.writeFile('react-native.config.js', reactNativeConfigContent(fontPath.font_path))
                await this.executeNpx('npx react-native-asset')
            }

            // setup theme in project 
            await fs.writeFile(`meter.config.${isTS ? 'ts' : 'js'}`, await configTheme(isExpo, fontPath.font_path))
        }
    }



    /**
     * @description this function using for setup eslint , and also vs code config
     * 
     */
    async setupEslint() {
        const isTs = await this.checkIsTsProject();

        const spinier = ora(chalk.blue("Setup Eslint in your project. please wait ")).start()
        await this.install('npm install --save-dev eslint@^8.2.0')
        await this.install('npm install --save-dev eslint-config-airbnb@^19.0.4')
        await this.install('npm install --save-dev eslint-plugin-import@^2.25.3')
        await this.install('npm install --save-dev eslint-plugin-jsx-a11y@^6.5.1')
        await this.install('npm install --save-dev eslint-plugin-react@^7.28.0')
        await this.install('npm install --save-dev eslint-plugin-react-hooks@^4.3.0')
        if (isTs) {
            await this.install('npm install --save-dev @typescript-eslint/eslint-plugin@^8.8.1')
            await this.install('npm install --save-dev @typescript-eslint/parser@^8.8.1')
        }
        spinier.succeed(chalk.green('Done installing task in your project')).stop()

        chalk.blue("Creating Eslint config file please wait")
        await fs.writeFile(`.eslintrc.json`, eslintConfigContent());

        chalk.blue("Congratulation eslint setup done");

        const ans = await inquirer.prompt([
            {
                type: "confirm",
                message: "Are you sure to setup config vscode in your project",
                name: "vscode"
            }
        ]);
        if (ans.vscode) await this.setupVsCodeConfigForLint()
    }

    /**
     *  @description this function using for setup react native alias Setup 
    */
    async aliasSetup () {
        const isExpo = await this.checkIsExpoProject()
        if(isExpo){
            console.log('This is expo project, so we are not setup alias in this project'); 
            return 
        }

        const isTsProject = await this.checkIsTsProject()
        const rootDirs = await fs.readdir(process.cwd())
        const isBabelConfigExists = rootDirs.includes('babel.config.js') || rootDirs.includes('babel.config.ts');

        if(!isBabelConfigExists) {
            console.log(chalk.red('Babel config file not exists in your project'));
            console.log(chalk.blue('We are setup babel config file in your project'));
            await this.writeFile(babelConfigContent(), 'babel.config.js', process.cwd())
        }else {
          const code =  await fs.readFile(path.join(process.cwd(), 'babel.config.js'), 'utf-8');

          // Parse Code
          const ast = recast.parse(code);

          //Traverse and modify
          const b = recast.types.builders;
          
          recast.visit(ast, {
            visitObjectExpression(path) {
                const properties = path.node.properties;
                //@ts-ignore
                const pluginsProperty = properties.find(prop => prop.key.name === 'plugins');
                    
                // Build the new plugin node
                const newPlugin = b.arrayExpression([
                    b.literal('module-resolver'),
                    b.objectExpression([
                        b.property('init', b.identifier('extensions'), b.arrayExpression([
                            b.literal('.ios.js'),
                            b.literal('.android.js'),
                            b.literal('.ios.jsx'),
                            b.literal('.android.jsx'),
                            b.literal('.js'),
                            b.literal('.jsx'),
                            b.literal('.json'),
                            b.literal('.ts'),
                            b.literal('.tsx'),
                            b.literal('.d.ts'),
                        ])),
                        b.property('init', b.identifier('root'), b.arrayExpression([
                            b.literal('.'),
                        ])),
                        b.property('init', b.identifier('alias'), b.objectExpression([
                            b.property('init', b.literal('@src'), b.literal('./src')),
                        ])),
                    ])
                ]);
                newPlugin.comments = [
                   b.commentLine('if you already have other plugin just paste this lines below'),
                ]
              
                if (pluginsProperty) {
                        // plugins already exists, add the new plugin
                        // @ts-ignore
                        if (pluginsProperty.value.type === 'ArrayExpression')  pluginsProperty.value.elements.push(newPlugin);
                    } else {
                    const newPluginsProperty = b.property('init',b.identifier('plugins'),b.arrayExpression([newPlugin]));
                    properties.push(newPluginsProperty);
                    return false;
                }
                  
                this.traverse(path);
            },
          })
          // 4. Print updated code
          const output = recast.print(ast).code;
          await this.writeFile(output, 'babel.config.js', process.cwd());
          console.log(chalk.green('Babel config file setup successfully'))
        }
       
        if(isTsProject) {
           const jsonString =  await fs.readFile(path.join(process.cwd(), 'tsconfig.json'), 'utf-8');
           const tsConfig = JSON.parse(jsonString);
           tsConfig.compilerOptions = {
                strict: true,
                baseUrl: ".",
                types: [],
                paths: {
                    "@src/*": ["src/*"]
                }
           }
           const updatedJson = JSON.stringify(tsConfig, null, 2);
           await this.writeFile(updatedJson, 'tsconfig.json', process.cwd());
           console.log(chalk.green('Ts config file setup successfully'))
        }

        await this.install('npm install --save-dev babel-plugin-module-resolver')
    } 

    /**
     *  @description this function using for setup redux toolkit
     */
    async rtk () {
      if(!await this.checkConfigExists()) return;
      const config = await this.getConfig();
      const componentsPath = config.path.components as string;
      const newPath = componentsPath.split(path.sep);
      newPath.pop()
      const rtkPath = newPath.join(path.sep).concat(path.sep, "rtk")

        const ans = await inquirer.prompt([
            {
                type:"input",
                message:"Please gave a valid path for writing rtk code",
                default: rtkPath
            }
        ]) 
    }



    /**
     * @description this function using for setup vs code config
     */
    async setupVsCodeConfigForLint() {
        await fs.mkdir('.vscode');
        const vsPath = path.join('.vscode', "settings.json")
        await fs.writeFile(vsPath, vscodeJsonContent())
    }
}
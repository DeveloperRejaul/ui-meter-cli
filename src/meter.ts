import { Command } from 'commander'
import fs from 'node:fs/promises';
import inquirer from 'inquirer';
import { exec, ExecException } from 'node:child_process'
import { Commands } from './commands';
import packageJson from '../package.json';
import { buttonContent, configContent, configTheme, reactNativeConfigContent } from './content';
import figlet from 'figlet'
import chalk from 'chalk';
import ora from 'ora-classic';
import path from 'node:path';
import { existsSync } from 'node:fs';

export default class Meter {
    private program: Command;

    constructor() {
        this.program = new Command();
        this.program.version(packageJson.version).description("This is the react native ui-meter library cli tool");

        // get arguments from command line
        const command = process.argv.slice(2).join('-');

        // handle all command when run any command 
        switch (command) {
            case Commands.Init:
                this.init()
                break;
            case Commands.Button:
                this.button()
                break;
            default:
                break;
        }


        // handle program arguments
        this.program.parse(process.argv);
    }


    /**
     * @description this method used for initial project configuration
     * @param
     */
    async init() {
        // const existsConfig = await this.checkConfigFileExists();
        // crete config file
        // if (!existsConfig) {
        // await this.creteConfig();
        // await this.creteNecessaryFolder()
        await this.setupTheme()
        // await this.install('npm install react-native-svg --save')
        // }
    }

    /**
     * @description this method used for add button components
     * @param
     */
    async button() {
        const configExists = await this.checkConfigFileExists();
        // check if the config file exists
        if (!configExists) {
            console.log(chalk.red('Config file does not exist'));
            console.log(chalk.green('Run: `npx rn-meter init`'));
            return
        }

        const config = await this.getConfig();
        const isTs = await this.checkIsTsProject()
        const btnPath = path.join(process.cwd(), config.path.components, `button.${isTs ? 'tsx' : 'jsx'}`)
        if (existsSync(btnPath)) return console.log("Button already exists if you overwrite");
        await fs.writeFile(btnPath, buttonContent())
    }


    /***********************************************************************************************
     *@description Here all utility methods are available
     ************************************************************************************************/

    /**
     * @description this method used check project configuration ts or js
     * @returns boolean
     */
    async checkIsTsProject() {
        // get project configuration files 
        const files = await fs.readdir(process.cwd())
        // detect project ts or js 
        return files.includes('tsconfig.json')
    }

    /**
     * @description this function using for setup theme
     */
    async setupTheme() {
        // creating theme configaration fiile 
        const isTS = await this.checkIsTsProject();
        const isExpo = await this.checkIsExpoProject();

        // setup font in project
        console.log(chalk.green('Setup theme in project, like font, color, border radius, gap, spase,  etc'));
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
                // await this.install('npm install expo-font');
            } else {
                // await fs.writeFile('react-native.config.js', reactNativeConfigContent(fontPath.font_path))
                // await this.executeNpx('npx react-native-asset')
            }

            // setup theme in project 
            await fs.writeFile(`meter.config.${isTS ? 'ts' : 'js'}`, await configTheme(isExpo, fontPath.font_path))
        }
    }

    /**
     * @description this finction useing for check config file exists in project  
     * @returns boolean data 
     */
    async checkConfigFileExists() {
        // get project configuration files 
        const isTS = await this.checkIsTsProject()
        const files = await fs.readdir(process.cwd())

        // detect project ts or js 
        return files.includes('meter.config.json') && files.includes(`meter.config.${isTS ? 'ts' : 'js'}`)
    }



    /**
     * @description this function handle to crete config file for cli
     * file name must be: meter.config.json
     */
    async creteConfig() {
        console.log(figlet.textSync("RN METER CLI", { horizontalLayout: "full" }));
        // path input 
        const ans = await inquirer.prompt([
            {
                type: 'input',
                name: 'components_path',
                message: 'Type components path to configure config',
                default: "./meter/components"
            },
            {
                type: 'input',
                name: 'utils_path',
                message: 'Type utils path to configure config',
                default: "./meter/utils"
            },
            {
                type: 'input',
                name: 'hook_path',
                message: 'Type hook path to configure config',
                default: "./meter/hook"
            },
        ])
        await fs.writeFile(`meter.config.json`, configContent(ans))
    }

    /**
     * @description this function useing for get config information 
     * @returns config file information 
     */
    async getConfig() {
        const config = await fs.readFile(path.join(process.cwd(), 'meter.config.json'), 'utf-8');
        return JSON.parse(config);
    }


    /**
     * @description this function useing for createing folder 
     * @param destination path like : src/components/etc
     */
    async createFolder(destination: string) {
        let pt = process.cwd();
        for (const element of destination.split('/')) {
            pt = path.join(pt, element)
            if (!existsSync(pt)) await fs.mkdir(pt)
        }
    }


    /**
    * @description this funtion use for create folder when init command exicute 
     */
    async creteNecessaryFolder() {
        const config = await this.getConfig();
        const componentsPath = path.join(process.cwd(), config.path.components);
        const utilsPath = path.join(process.cwd(), config.path.utils);
        const hookPath = path.join(process.cwd(), config.path.hook);

        if (!existsSync(componentsPath)) await this.createFolder(config.path.components)
        if (!existsSync(utilsPath)) await this.createFolder(config.path.utils)
        if (!existsSync(hookPath)) await this.createFolder(config.path.hook)
    }

    /**
     * @description this funtion use for checking is expo project or native cli project;
     * if return true :this project is expo project S
     * if return is false : this project is not expo projcct. this is cli project or anythig else
     * @returns boolean data 
     */
    async checkIsExpoProject() {
        const files = await fs.readdir(process.cwd());
        return files.includes('.expo')
    }


    /**
     * @description this functiion useing install dependencies
     * 
     */
    async install(command: string) {
        return new Promise((res, rej) => {
            const spinier = ora(`Loading ${chalk.blue(`Installing ${command.split(" ").pop()}`)}`).start()
            exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
                if (error) {
                    // print error
                    spinier.fail(chalk.red(error.message)).stop()
                    rej()
                };
                // print success log 
                spinier.succeed(chalk.green('Done all task')).stop()
                res(null)
            })
        });
    }

    /**
     *  @description this functiion useing exicute npx command
     */
    async executeNpx(command: string) {
        return new Promise((res, rej) => {
            const spinier = ora(`Loading ${chalk.blue(`Exexute: ${command}`)}`).start()
            exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
                if (error) {
                    console.log(error);
                    spinier.fail(chalk.red(error.message)).stop()
                    rej()
                };
                console.log(stdout);
                console.log(stderr);
                spinier.succeed(chalk.green('Done all task')).stop()
                res(null)
            })
        })
    }

}

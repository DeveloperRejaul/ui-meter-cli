import { Command } from 'commander'
import fs from 'node:fs/promises';
import inquirer from 'inquirer';
import { exec, ExecException } from 'node:child_process'
import { Commands } from './commands';
import packageJson from '../package.json';
import { buttonContent, configContent } from './content';
import figlet from 'figlet'
import chalk from 'chalk';
import ora from 'ora-classic';
import path from 'node:path';
import { existsSync } from 'node:fs';


export default class Meter {
    private program: Command

    constructor() {
        this.program = new Command();
        this.program.version(packageJson.version).description("This is the react native ui-meter library cli tool");

        // get arguments from command line
        const command = process.argv.slice(2).join('-');

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
        const existsConfig = await this.checkConfigFileExists();

        // crete config file
        if (!existsConfig) {
            await this.creteConfig();
            await this.creteNecessaryFolder()
        }

        // install dependencies library ui-meter and react-native-svg
        const spinier = ora(`Loading ${chalk.blue('Installing dependencies...')}`).start()

        exec('npm install ui-meter react-native-svg --save', (error: ExecException | null, stdout: string, stderr: string) => {
            if (error) {
                // print error
                spinier.fail(chalk.red(error.message))
            };
            // print success log 
            spinier.succeed(chalk.green('Done all task')).stop()
        })

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
        if (existsSync(btnPath)) {
            console.log("Button already exists if you overwrite");
            return
        }
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

    async checkConfigFileExists() {
        // get project configuration files 
        const files = await fs.readdir(process.cwd())

        // detect project ts or js 
        return files.includes('meter.config.json')
    }

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
        ])
        await fs.writeFile(`meter.config.json`, configContent({ components_path: ans.components_path, utils_path: ans.utils_path }))
    }

    async getConfig() {
        const config = await fs.readFile(path.join(process.cwd(), 'meter.config.json'), 'utf-8');
        return JSON.parse(config);
    }

    async createFolder(destination: string) {
        let pt = process.cwd();
        for (const element of destination.split('/')) {
            pt = path.join(pt, element)
            if (!existsSync(pt)) {
                await fs.mkdir(pt)
            }
        }
    }

    async creteNecessaryFolder() {
        const config = await this.getConfig();
        const componentsPath = path.join(process.cwd(), config.path.components);
        const utilsPath = path.join(process.cwd(), config.path.utils);
        const isFileExitsComponents = existsSync(componentsPath);
        const isFileExitsUtils = existsSync(utilsPath);

        if (!isFileExitsComponents) await this.createFolder(config.path.components)
        if (!isFileExitsUtils) await this.createFolder(config.path.utils)
    }
}
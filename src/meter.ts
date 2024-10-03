import { Command } from 'commander'
import fs from 'node:fs/promises';
import inquirer from 'inquirer';
import { } from 'node:child_process'
import { Commands } from './commands';
import packageJson from '../package.json';
import { configContent } from './content';

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
        if (!existsConfig) await this.creteConfig()

    }

    /**
     * @description this method used for add button components
     * @param
     */
    async button() { }


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
        const isTs = await this.checkIsTsProject();

        // detect project ts or js 
        return files.includes(`ui-meter.config.${isTs ? 'ts' : 'js'}`)
    }

    async creteConfig() {
        const isTs = await this.checkIsTsProject();

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
        await fs.writeFile(`ui-meter.config.${isTs ? 'ts' : 'js'}`, configContent({ components_path: ans.components_path, utils_path: ans.utils_path }))
    }
}
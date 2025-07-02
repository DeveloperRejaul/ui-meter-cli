import fs from 'node:fs/promises';
import inquirer from 'inquirer';
import { exec, ExecException } from 'node:child_process'
import figlet from 'figlet'
import chalk from 'chalk';
import ora from 'ora';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { configContent } from 'content';


export class Utils {

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
     * @description this function using for check config file exists in project  
     * @returns boolean data 
     */
    async checkConfigFileExists() {
        // get project configuration files 
        const isTS = await this.checkIsTsProject()
        const files = await fs.readdir(process.cwd())

        // detect project ts or js 
        return files.includes('meter.config.json')
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
     * @description this function using for get config information 
     * @returns config file information 
     */
    async getConfig() {
        const config = await fs.readFile(path.join(process.cwd(), 'meter.config.json'), 'utf-8');
        return JSON.parse(config);
    }


    /**
     * @description this function using for creating folder 
     * @param destination path like : src/components/etc
     */
    async createFolder(destination: string) {
        let pt = process.cwd();
        for (const element of destination.split('/')) {
            pt = path.join(pt, element)
            if (!existsSync(pt)) await fs.mkdir(pt)
        }
        return pt
    }


    /**
    * @description this function use for create folder when init command execute 
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
     * @description this function use for checking is expo project or native cli project;
     * if return true :this project is expo project S
     * if return is false : this project is not expo project. this is cli project or anything else
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
            const spinier = ora(chalk.blue(`Installing ${command.split(" ").pop()}`)).start()
            exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
                if (error) {
                    // print error
                    spinier.fail(chalk.red(error.message)).stop()
                    rej()
                };
                // print success log 
                spinier.succeed(chalk.green('Done task')).stop()
                res(null)
            })
        });
    }

    /**
     *  @description this function using execute npx command
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


    /**
   *  @description this function using for checking configuration file exists 
   */
    async checkConfigExists() {
        const configExists = await this.checkConfigFileExists();
        // check if the config file exists
        if (!configExists) {
            console.log(chalk.red('Config file does not exist'));
            console.log(chalk.green('Run: `npx rn-meter init`'));
            return false
        }
        return true
    }


        /**
   *  @description this function using for write any kinds of file 
   */
    async writeFile (content:any,filename:string, pt:string) {
        try {
            await fs.writeFile(path.join(pt, filename), content);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description this function using for creating components 
     */
    async createComponent(content: string, componentName: string) {
        const isConfigExists = await this.checkConfigExists()
        if (isConfigExists) {
            const config = await this.getConfig();
            const isTs = await this.checkIsTsProject()

            if(componentName.includes("/")) {
                const arr = componentName.split("/")
                arr.pop()
                const newPath  = path.join(...arr)
                this.createFolder(path.join(config.path.components, newPath))
            }
            const componentPath = path.join(process.cwd(), config.path.components, `${componentName}.${isTs ? 'tsx' : 'jsx'}`)
            if (existsSync(componentPath)) return console.log(`${componentName} already exists if you overwrite`);
            await fs.writeFile(componentPath, content);
        } else {
            console.log(chalk.red("Library configuration not exists"));
            console.log(chalk.blue("Run: npx rn-meter init "));
        }
    }

    /**
     * @description this function using for creating utils function 
     */

    async createUtility(content: string, name: string) {
        const isConfigExists = await this.checkConfigExists();
        if (isConfigExists) {
            const config = await this.getConfig();
            const isTs = await this.checkIsTsProject()
            const componentPath = path.join(process.cwd(), config.path.utils, `${name}.${isTs ? 'ts' : 'js'}`)
            if (existsSync(componentPath)) return console.log(`${name} already exists if you overwrite`);
            await fs.writeFile(componentPath, content);
        } else {
            console.log(chalk.red("Library configuration not exists"));
            console.log(chalk.blue("Run: npx rn-meter init "));
        }
    }
}
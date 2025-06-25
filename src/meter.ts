import { Command } from 'commander'
import { Commands } from './commands';
import packageJson from '../package.json';
import chalk from 'chalk';
import {
    buttonContent,cardCarousalContent, radioContent,
    colorReduceOpacity, random, box, center, divider, HStackContent, VStackContent,
    checkBoxContent, switchContent, inputContent, animatedInput, bottomSheet,
    keyboardAvoidingScrollView,
    alert,
    toast,
} from './content';
import { Core } from 'core/1_core';

export default class Meter extends  Core {
    // private program: Command;

    constructor() {
        super();
        // get arguments from command line
        const command = process.argv.slice(2).join('-');

        // handle all command when run any command 
        switch (command) {
            case Commands.Init:
                this.init()
                break;
            // components related command
            case Commands.Box:
                this.createComponent(box(), "Box")
                break;
            case Commands.Center:
                this.createComponent(center(), "Center")
                break;
            case Commands.Divider:
                this.createComponent(divider(), "Divider")
                break;
            case Commands.alert:
                this.createComponent(alert(), "AnimatedAlert")
                break;
            case Commands.toast:
                this.createComponent(toast(), "Toast")
                break;
            case Commands.HStack:
                this.createComponent(HStackContent(), "HStack")
                break;
            case Commands.VStack:
                this.createComponent(VStackContent(), "VStack")
                break;
            case Commands.Button:
                this.createComponent(buttonContent(), "Button")
                break;
            case Commands.Carousal:
                this.createComponent(cardCarousalContent(), "Carousal")
                break;
            case Commands.ButtonSheet:
                this.createComponent(bottomSheet(), "BottomSheet")
                break;
            case Commands.Radio:
                this.createComponent(radioContent(), "Radio")
                break;
            case Commands.Switch:
                this.createComponent(switchContent(), "Switch")
                break;
            case Commands.CheckBox:
                this.createComponent(checkBoxContent(), "CheckBox")
                break;
            case Commands.Input:
                this.createComponent(inputContent(), "Input")
                break;
            case Commands.AnimatedInput:
                this.createComponent(animatedInput(), "AnimatedInput")
                break;
            case Commands.KeyboardAvoidingScrollView:
                this.createComponent(keyboardAvoidingScrollView(), "KeyboardAvoidingScrollView")
                break;

            // setup related command
            case Commands.eslintSetup:
                this.setupEslint()
                break;
            case Commands.themeSetup:
                this.setupTheme()
                break;
            case Commands.vscodeConfigSetup:
                this.setupVsCodeConfigForLint()
                break;
            case Commands.RTK:
                this.rtk()
                break;
            case Commands.aliasSetup:
                this.aliasSetup()
                break;

            // audion
            case Commands.AudioRecord:
                this.audioRecord()
                break;
            // utils function related command
            case Commands.colorOpacityReduce:
                this.createUtility(colorReduceOpacity(), 'colorReduceOpacity');
                break;
            case Commands.random:
                this.createUtility(random(), 'random');
                break;
            default:
                console.log(chalk.red("Hey!, Invalid command executed. Please read documentation :https://www.npmjs.com/package/rn-meter"));
                break;
        }
    }
}

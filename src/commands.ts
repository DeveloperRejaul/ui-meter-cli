export enum Commands {
    Init = 'init',

    // Components related command
    Box = "add-box",
    Center = 'add-center',
    Divider = "add-divider",
    HStack = "add-HStack",
    VStack = "add-VStack",
    Button = 'add-button',
    Radio = "add-radio",
    CheckBox = "add-checkbox",
    Carousal = "add-carousal",

    // setup related command
    themeSetup = 'setup-theme',
    eslintSetup = 'setup-eslint',
    vscodeConfigSetup = 'setup-vscode-config',

    //Utilities function 
    random = "add-fn-random",
    colorOpacityReduce = 'add-fn-cor'
}
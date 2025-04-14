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
    Switch = "add-switch",
    Input = "add-input",
    AnimatedInput = "add-animated-input",
    Carousal = "add-carousal",
    ButtonSheet = "add-bottom-sheet",
    KeyboardAvoidingScrollView = "add-keyboardAvoidingScrollView",

    // setup related command
    themeSetup = 'setup-theme',
    eslintSetup = 'setup-eslint',
    vscodeConfigSetup = 'setup-vscode-config',
    RTK="setup-rtk",

    // app build setup
    Rename = "app-rename",

    //Utilities function 
    random = "add-fn-random",
    colorOpacityReduce = 'add-fn-cor',

    // audio
    AudioRecord = "add-audio-record"
}
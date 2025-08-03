export enum Commands {
    Init = 'init',

    // Components related command
    Box = "add-box",
    Center = 'add-center',
    Divider = "add-divider",
    alert = "add-alert",
    toast = "add-toast",
    HStack = "add-HStack",
    VStack = "add-VStack",
    Button = 'add-button',
    Radio = "add-radio",
    CheckBox = "add-checkbox",
    Switch = "add-switch",
    Input = "add-input",
    ListView = "add-listview",
    AnimatedInput = "add-animated-input",
    Carousal = "add-carousal",
    ButtonSheet = "add-bottom-sheet",
    KeyboardAvoidingScrollView = "add-keyboardAvoidingScrollView",

    // Animations
    // chart 
    Piechart1 = 'add-piechart1',

    // setup related command
    themeSetup = 'setup-theme',
    eslintSetup = 'setup-eslint',
    vscodeConfigSetup = 'setup-vscode-config',
    aliasSetup = 'setup-alias',


    // app build setup
    Rename = "app-rename",

    //Utilities function 
    random = "add-fn-random",
    colorOpacityReduce = 'add-fn-cor',
    Nav = 'add-fn-nav',

    // audio
    AudioRecord = "add-audio-record"
}
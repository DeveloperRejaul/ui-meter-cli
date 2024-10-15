# React Native UI Meter Cli 
Introducing our comprehensive React Native UI library, designed to streamline your app development process. This library includes customizable App Themes, Cross-platform compatibility for both iOS and Android & web a rich collection of pre-built components, powerful hooks, intuitive form state management, and integrated query handling for efficient data management. With this library, you can create beautiful, functional, and responsive applications effortlessly, providing a seamless and efficient development experience.

![Alternative Text](./screenshots/demo.jpg)

## Initialize cli configuration  

```sh
npx rn-meter init
```

## Features

- App Theme
- Cross platform Universal
- Components
- Hooks
- From state handle
- Query support

## API Reference

- [Installation](#initialize-cli-configuration)
- [Configuration](#configuration)
    - [Theme Setup](#theme-setup)
    - [Eslint Setup](#eslint-setup)
    - [Vs Code Configuration Setup](#vs-code-configuration-setup)

- [Components](#components)
  - [Layout](#layout-components)
    - [Box](#box)
    - [Center](#center)
    - [HStack](#hstack)
    - [VStack](#vstack)
    - [Divider](#divider)
  - [Typography](#typography)
    - [Text](#text)
    - [Heading](#heading)
  - [From](#from-components)
    - [Button](#button)
    - [CheckBox](#checkbox)
    - [Radio](#radio)
    - [Switch](#switch)
    - [Input](#input)
  - [Helping UI Components](#helping-ui-components)
    - [Carousal](#carousal)
- [Utils Function](#utils-function)
  - [Random](#random-id-generator-function)
  - [Color Opacity reducer](#color-opacity-reducer-function)
- [Contributing](#contributing)
- [Support](#support)
- [Feedback](#feedback)
- [FAQ](#faq)
- [Links](#links)
- [Authors](#authors)
- [License](#license)

## Configuration
### Theme Setup
This Command setup your theme related configuration. Like Font, color, radius, etc, also create a meter.config file . You can customize all of this. 
```
npx rn-meter setup theme
```

### Eslint Setup
We are flowing Airbnb style. you can also customize all of role in .eslintrc.json file.

⚠️ **WARNING: CRITICAL ACTION REQUIRED!** ⚠️  
Before running this command, you **MUST** remove all ESLint-related configuration files like `.eslintrc.json` and uninstall all ESLint-related packages. Failure to do so **WILL** cause issues in your project. Proceed with caution!


```
npx rn-meter setup eslint
```

### Vs Code Configuration Setup
This setup for customizing vs code editor. we can fix all of linting related error passing ctrl+s 

⚠️ **WARNING: CRITICAL ACTION REQUIRED!** ⚠️ 
Before running this command, you **MUST** remove all vs code-related configuration files like `.vscode/settings.json ` . Failure to do so **WILL** cause issues in your project. Proceed with caution!

```
npx rn-meter setup vscode config
```

## Components

Introducing our comprehensive React Native UI library with customizable themes, universal components, powerful hooks, efficient form state handling, and integrated query support. Create beautiful, functional, and responsive applications effortlessly.
### Layout Components
#### Box
```
npx rn-meter add box 
```
#### Center
```
npx rn-meter add center 
```

#### HStack
```
npx rn-meter add HStack 
```

#### VStack
```
npx rn-meter add VStack 
```

#### Divider
```
npx rn-meter add divider 
```


### From Components
#### Button
```
npx rn-meter add button 
```

#### Radio
```
npx rn-meter add radio 
```
### Helping UI Components
#### Carousal
```
npx rn-meter add carousal 
```

## Utils Function

#### Random Id Generator Function
This function using for create random string id generation 
```
npx rn-meter add add fn random
```

#### Color Opacity Reducer Function
This function using for reducing color opacity
```
npx rn-meter add add fn cor
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Support

For support, email devrejaul.official@gmail.com

## Feedback

If you have any feedback, please reach out to us at devrejaul.official@gmail.com

## FAQ

#### Question 1

Answer 1

#### Question 2

Answer 2

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rezaul-karim-823a9a227/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/DeveloperRejaul)

## Authors

- [@rezaulkarim](https://github.com/DeveloperRejaul)

## License

[MIT](https://choosealicense.com/licenses/mit/)

![icon](/public/icon-128.png)

# Cron Lens Chrome extension

Cron Lens is a Chrome extension to replace all chrome expressions on webpages with a human readable format. The extension features a passive and active mode where passive allows you to add the human readable format with the press of a button and active mode activly replaces all cron expressions on a page.

The project is build with a combination of Vite + Vue.js. Where Vite serves as the bundler to package all the code into an extension and Vue.js is used for the popup.

## Table of Contents

- [Installation](#installation)
    - [Chrome web store](#chrome-web-store)
    - [Compile locally](#compile-locally)
- [Quick Start](#quick-start)
- [Contributing](#contributing)
- [Sponsor](#sponsor)

## Installation

Currently you can install this plugin by cloning the repository and compiling the code yourself see [Quick Start](#quick-start) for more details.

### Chrome web store

Go to the Chrome web store [here]() and click "Add to Chrome". After installation the extension will be ready to use.

### Compile locally

First clone the project and run `npm install` to install all dependencies. After that run `npm run build` which will create the extension and place all files in the `/dist` folder.

In Chrome go to Settings > Extensions and enable Developer mode. Then click Load unpacked and select the `/dist` folder. This will enable the extension in your browser.

## Quick Start

When isntalled the extension is set to active mode by default. The extension will automatically add a human readable cron format behind the cron expression telling you exactly when this cron will trigger.

You can click on the extension icon to open up the popup. Here you can find a toggle switch to switch from active to passive mode. In passive mode the extension will not automatically replace all cron expressions. Instead this will add a button in the popup which allows you to translate all cron expressions with the press of a button.

Below you'll find a foldout menu that says "more settings" where you can find a setting to switch from a 12 hour time format to 24 hours.

## Contributing

All contributions are welcome and I will gladly take all the support I can get on this project. If you want to contribute please visit the [contribution guide](.github/CONTRIBUTING.md) for details on how to contribute.

## Sponsor

If you want to support this project or want to buy me a coffee you can do so [here](https://buymeacoffee.com/justinleemans).
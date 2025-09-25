import chalk from 'chalk';
//Incase of rust it is cargo.toml -> package.json
//package.json is more like config file

// const chalk = require("chalk");


console.log("hloooooo")
// console.log(chalk)

console.log(chalk.red.bold("Hi danger!!"));


//Never push node modules
//By dependencies written in package.js we can install all the package in project locally by running npm install
//When ther major changes in packges from eg 5 to 6 than whole migration is took place for eg using new functions of package in prohect.
//for eg migrating prject from next15 to next18

//package-lock -> helps in installing same package when multiple dev install same directory.
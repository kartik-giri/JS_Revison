//CLI command strcuture
//program [command] [arguments] [options]

/*
program → the main executable (e.g., git, node app.js)
command → subcommand (e.g., init, commit, push)
arguments → required or optional values (e.g., a file name)
options (flags) → extra settings (usually start with - or --)
*/

/*
✅ So the structure of a CLI command is always:
Program → Command → Arguments → Options
*/

//<name> => There will be a required argument named name.
//process.argv used to get argument arrays passed in terminal.

const { program } = require('commander');
const fs = require('fs');

//Commander uses a design style called a fluent API (also called method chaining).
//This means that every method (like .option(), .argument(), etc.) returns the same program object so you can "chain" calls together.

program.name("CLI assignment")
       .description("ClI for counting number of words in a given file")
       .version("1.0.0")

program.command("count")
       .argument("<filePath>","path of the given file")
       .action((filePath)=>{
        fs.readFile(filePath, "utf-8", (err,content)=>{
            if(err){
                console.log("Can read file cause of this error:",err);
            }else{
              //The / ... / notation is how you write a regex pattern directly in your code.
                let wordsArr = content.trim().split(/\s+/); //split() takes a string and breaks it into an array based on a separator.
                console.log("The words in given file are:",wordsArr.length);
            }
        })
       })


program.parse();//It’s the method that tells Commander:
//“Okay, take everything the user typed in the terminal and parse it according to the arguments and options I defined.”
//Without program.parse(), Commander won’t read or process anything.
//  node index.js count file.txt

















/*
const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();
*/
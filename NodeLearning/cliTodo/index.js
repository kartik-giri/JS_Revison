const fs = require('fs');
const {program} = require('commander');


program.name("CLI_todo")
       .description("CLI to create todo in json file")
       .version("1.0.0")

program.command("addTodo")
       .argument("<todoName>", "Name of todo")
       .action((todoName)=>{
        fs.readFile("todo.json", "utf-8", (err,data)=>{
            if(err){
                console.log("Can't read file cause of error:", err);
            }
            else{
                let todoData = JSON.parse(data);

                let newId = todoData.length>0? todoData[todoData.length-1].id+1 : 1;

                todoData.push({id: newId,todo:todoName, flag: "undone"});

                fs.writeFile("todo.json", JSON.stringify(todoData, null, 2), (err)=>{
                    if(err){
                        console.log("Can't read file cause of error:", err);
                    }
                })

                console.log(todoName,"todo is added!");
            }
        })
       })

    program.command("dltTodo")
           .description("Command to delete todo")
           .argument("<dltTodo>", "argument needs which todo needs to be deleted")
            .action((todoName)=>{
        fs.readFile("todo.json", "utf-8", (err,data)=>{
            if(err){
                console.log("Can't read file cause of error:", err);
            }
            else{
                let todoData = JSON.parse(data);

                let newTodoData = todoData.filter((elem)=>elem.todo!== todoName);

                fs.writeFile("todo.json", JSON.stringify(newTodoData, null, 2), (err)=>{
                    if(err){
                        console.log("Can't read file cause of error:", err);
                    }
                })

                console.log(todoName,"todo is deleted!");
            }
        })
       })

program.parse();
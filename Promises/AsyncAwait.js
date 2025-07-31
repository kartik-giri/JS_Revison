const fs = require("fs");
const path = require("path");

// /*
// They are modern JavaScript keywords that make asynchronous code look like synchronous code.

// 🔹 async makes a function always return a Promise
// 🔹 await pauses execution until a Promise resolves
// */



let funTimeout =(sec)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,sec)
    })
}

let asyncTimeout =async ()=>{
    await funTimeout(1000);
    console.log("runs after 1 sec");
    
    await funTimeout(3000);
    console.log("runs after 3 sec")
}

asyncTimeout();

//async await file read


let funcReadFile = () => {
  const filePath = path.join(__dirname, "wish.txt");
  console.log("Current directory:", process.cwd());
  console.log("Looking for file at:", filePath);

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error("File does not exist"));
      return;
    }
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

let readFileAsync = async () => {
  try {
    let data = await funcReadFile();
    console.log("File content:\n", data);
  } catch (err) {
    console.error("Failed to read file:", err.message);
  }
};

readFileAsync();
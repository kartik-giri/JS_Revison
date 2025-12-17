//Record give us cleaner way to create object.
interface User {
  id: string;
  name: string;
}

// type Users = { [key: string]: User };

type Users = Record<string,User>

const users: Users = {
  'abc123': { id: 'abc123', name: 'John Doe' },
  'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};


//Map

const mapObj = new Map();

mapObj.set("name", "kartik");
console.log(mapObj.get("name"))

//Lets make it generic

interface student {
  stuName: string,
  rollNo:number
}

const mapObj2 = new Map<string, student>();


mapObj.set("2234", {stuName:"kartik", rollNo:23});
console.log(mapObj.get("2234"))
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = {
    'abc123': { id: 'abc123', name: 'John Doe' },
    'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};
//Map
const mapObj = new Map();
mapObj.set("name", "kartik");
console.log(mapObj.get("name"));
const mapObj2 = new Map();
mapObj.set("2234", { stuName: "kartik", rollNo: 23 });
console.log(mapObj.get("2234"));

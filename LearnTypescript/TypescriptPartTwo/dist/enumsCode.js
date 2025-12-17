"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//enum is used  to create a human-readable way to represent a set of constant values
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["left"] = 1] = "left";
    Direction[Direction["down"] = 2] = "down";
    Direction[Direction["right"] = 3] = "right";
})(Direction || (Direction = {}));
const doAction = (direction) => {
    console.log(direction);
};
doAction(Direction.Up);

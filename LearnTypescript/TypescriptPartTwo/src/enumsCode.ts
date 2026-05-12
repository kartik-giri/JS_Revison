//enum is used  to create a human-readable way to represent a set of constant values
// the enums is used to represent the se tof contant value in the human reabdble way.
enum Direction {
    Up,
    left,
    down,
    right
}

const doAction=(direction:Direction)=>{
    console.log(direction)
}

doAction(Direction.Up)
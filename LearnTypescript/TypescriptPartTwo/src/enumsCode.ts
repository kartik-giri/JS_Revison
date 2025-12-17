//enum is used  to create a human-readable way to represent a set of constant values
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
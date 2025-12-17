//In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.
//It allow us to create a type which exludes certain types.

type Event = `click`|`scroll`|`mousemove`;

type ExcludeEvent = Exclude<Event, `click`|`scroll`>;

const getEvent = (event: ExcludeEvent)=>{
    console.log(event)
}

// getEvent(`click`) //we cant pass excluded type
getEvent(`mousemove`)
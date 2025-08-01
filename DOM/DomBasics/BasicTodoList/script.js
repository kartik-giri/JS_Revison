console.log(document); //document represent html root node

//It selects the first element in the DOM that matches a CSS selector.
//"selector" = any valid CSS selector (like class, id, tag, etc.)
// Returns the first matching element or null if not found

let getFeedData = ()=>{
    let textFeed = document.querySelector("#textFeed");
    let feedValue = textFeed.value;
    console.log(feedValue)
}


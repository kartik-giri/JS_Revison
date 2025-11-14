import { useState } from 'react'


function App() {
  //We can change the internal elements of an array even though the vairbale is const.
  //Set and setCount are vairbales of array which we are getting by destructring an array.
const [count, setCount] = useState(0);

const onClickHadler = ()=>{
  setCount(count+1); //changed the state, react will do re-render auomatically. count++ doesn't work here cause it is post incremental
}
//Returning a markup
return (
    <>
    <div>
      <button onClick={onClickHadler}>Count {count}</button>
    </div>
 
    </>
  )
}

//It is syntax of module js we are exporting the function directly and can import directly using import syntax.
//The export default keywords specify the main component in the file. which is exporting
export default App

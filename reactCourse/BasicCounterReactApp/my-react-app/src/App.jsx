import { useState } from 'react'


function App() {
const [count, setCount] = useState(0);

const onClickHadler = ()=>{
  setCount(count+1); //changed the state, react will do re-render auomatically. count++ doesn't work here cause it is post incremental
}
return (
    <>
    <div>
      <button onClick={onClickHadler}>Count {count}</button>
    </div>
 
    </>
  )
}

export default App

import { useEffect, useState } from "react";
import { useFetch, useGetTodo } from "./hooks/useFetch.js";
import { usePrev, usePrevWithoutGlitch } from "./hooks/usePrev.js";
import { useDebounce, useDebounceGeneric } from "./hooks/useDebounce.js";
import { useOnline } from "./hooks/useOnline.js";

//Custom hook is react is powerfull way to encapsulate and resusse the state full logiv across components.
//Basically cusotm hooks are a JS function name starts with use and they uses the react hooks inside them.
//It is used to abstract the complex logic and make our compoent more clean and readable.
//It increases the reusability and separate the business logic from UI logic.
//All components which are using same custom hook will have there separate state variables.
const useCount = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((count) => {
      return count + 1;
    });
  };

  return {
    count: count,
    increaseCount: increaseCount,
  };
};

const App = () => {
  const { count, increaseCount } = useCount();

  return (
    <>
      <button onClick={increaseCount}>Increment {count}</button>
      <FetchTodo />
      <LearnUsePrev />
      <LearnDebounce />
      <LearnDebounce2/>
      <LearnUseOnline/>
    </>
  );
};

const FetchTodo = () => {
  //  const {resData}= useGetTodo();
  const [todoId, setTodoId] = useState();
  const { finalRes, loading } = useFetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    10
  );

  return (
    <>
      <button onClick={() => setTodoId(1)}>Todo 1</button>
      <button onClick={() => setTodoId(2)}>Todo 2</button>
      <button onClick={() => setTodoId(3)}>Todo 3</button>

      {/* <p>{resData.title}</p> */}
      <p>{loading ? <p>Loading..</p> : JSON.stringify(finalRes)}</p>
    </>
  );
};

const LearnUsePrev = () => {
  const [state, setState] = useState(0);
  const prevState = usePrev(state);

  const previousStateValue = usePrevWithoutGlitch(state, null);
  return (
    <>
      <p>Present State: {state}</p>

      <button
        onClick={() => {
          setState((state) => state + 1);
        }}
      >
        Increment
      </button>

      <p>Previous state: {prevState}</p>
      <p>Previous state without glitch: {previousStateValue}</p>
    </>
  );
};

//We want when users complete typing in search bar do the HTTP request.
//But probelm with simple code is that it sends request every time when users type something.
//To prevent it we have to use useDebouncer hook.
//Which will delay the function call for certain time after the final event.
//When the user stops typing after certain time we will send request.
const LearnDebounce = () => {
  const sendReq = () => {
    //just send API req.
    fetch(`api.amazon.com/search/`);
  };

  const debounceFunction = useDebounce(sendReq);
  return (
    <>
      <input type="text" onChange={debounceFunction} />
    </>
  );
};

//1. When users types in text field update the state.
//2. We might want to do HTTP request after state changes.
//3. In this case we should use value returned by useDebounce hook and not directly the state value.
const LearnDebounce2=()=>{
  const [userinput, setUserInout] = useState("");
  const debouncedValue = useDebounceGeneric(userinput,1000)

  //e stands for the event-> target element value
  const change=(e)=>{
    setUserInout(e.target.value)
  }

  useEffect(()=>{
    //DO expensive operations
    fetch(`api.amazon.com/search/`);
  }, [debouncedValue])
  
  return (
    <>
    <input type="text" onChange={change} placeholder="LearnBouncer2" />
    </>
  )
}

const LearnUseOnline = ()=>{
  const online = useOnline();
  return (
    <>
    {online ? <p>User is online</p> : <p>User is online</p>}
    </>
  )
}
export default App;

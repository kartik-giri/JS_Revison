import { useEffect, useState } from "react";
//useState is a Hook that lets you add state to functional components. It returns an array with the current state
//and a function to update it.
const App = () => {
  const [flag, setFlag] = useState(true);
  

  useEffect(()=>{
    const id = setInterval(()=>{
      setFlag((flag)=>{
        return !flag
      })
    },5000)
    return ()=> clearInterval(id)
  },[])

  return (
    <>
      <h1>Counter App</h1>
      {flag?<EffectLearn/>:null}
      <Counter/>
    </>
  );
};

//When ever state changes react calls the component with new state.
const Counter = () => {
  const [count, setCount] = useState(0);

  //will redner after mounted, unmounted and re-render when count state changes
  useEffect(()=>{
    alert("useEffect runs when count state changes");

    return ()=>{
      alert("clear the preivous effect")
    }
  },[count])

  const increaseHandler = () => {
    setCount(count + 1);
  };

  const decreaseHandler = () => {
    setCount(count - 1);
  };

  const resetHandler = () => {
    setCount(0);
  };
  return (
    <>
      <h2>{count}</h2>
      <button onClick={increaseHandler}>Increase</button>
      <button onClick={decreaseHandler}>Decrease</button>
      <button onClick={resetHandler}>Reset</button>
    </>
  );
};

const EffectLearn=()=>{
  const [count, setCount] = useState(0);
  
  //React runs useEffect twice in development:
  //
  useEffect(()=>{
    const id = setInterval(()=>{
    setCount((count)=>{return count+1});
  },1000)
  //stops the interval when the component unmounts or before the effect runs again.
  //Question We are starting the clock when component is mounted or rendered for the first time BUT?
  //Are we stopping the clock when component is unmounted or deleted from the DOM?
  //When unmounts clear the interval
  return ()=>{
    clearInterval(id);}
  },[])

  return (
    <>
    <h1>Clock: {count}</h1>
    </>
  )
}
export default App;

/*
So basicaaly the code inside the useEffect will run when the component is mounted and will be ignored at re-rendering of the component
and the function retunred by useEffect function will run when component is UNMOUNTED and prevent useEffect from re-running
And if we want to re-redner the useEffect if certain state changes then we have to add the dependicy state Than the useEffect will first clear and than call passed 
function.

*/

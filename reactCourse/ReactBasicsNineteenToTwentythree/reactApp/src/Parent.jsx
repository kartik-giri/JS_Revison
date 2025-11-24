import React from 'react';
import { useCountStore, useDataFetchStore } from './store';

function Parent() {
  return (
    <>
      <Increase />
      <Decrease />
      <Value />
      <DataShow/>
      <FetchBtn/>
    </>
  );
}

function Increase() {
  const increase = useCountStore((state) => state.increase);
  return <button onClick={increase}>Increase</button>;
}

function Decrease() {
  const decrease = useCountStore((state)=>state.decrease);
  return <button onClick={decrease}>Decrease</button>;
}

function Value() {
  const count = useCountStore((state) => state.count);
  return <p>Count: {count}</p>;
}

const DataShow=()=>{
  const resData = useDataFetchStore((state)=>state.resData)
  return (
    <>
    <h1>{resData}</h1>
    </>
  )
}

const FetchBtn=()=>{
  const fetchFunc = useDataFetchStore((state)=> state.fetchCall)
  return(
    <>
    <button onClick={fetchFunc}>Get Data!</button>
    </>
  )
}

export default Parent;


//The simple state mngmt approach re-renders the all components which access there state even though they don;t render it.
//We want the output in which component which is rendering the state only that component re-renders.

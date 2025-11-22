import React from 'react';
import { useCountStore } from './store';

function Parent() {
  return (
    <>
      <Increase />
      <Decrease />
      <Value />
    </>
  );
}

function Increase() {
  const increase = useCountStore((state) => state.increase);
  return <button onClick={increase}>Increase</button>;
}

function Decrease() {
  const decrease = useCountStore((state) => state.decrease);
  return <button onClick={decrease}>Decrease</button>;
}

function Value() {
  const count = useCountStore((state) => state.count);
  return <p>Count: {count}</p>;
}

export default Parent;


//The simple state mngmt approach re-renders the all components which access there state even though they don;t render it.
//We want the output in which component which is rendering the state only that component re-renders.

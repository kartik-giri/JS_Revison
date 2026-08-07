// import { create } from 'zustand';

// export const useCountStore = create((set) => ({
//   count: 0,
//   increase: () => set((state) => ({ count: state.count + 1 })),
//   decrease: () => set((state) => ({ count: state.count - 1 })),
// }));

import {create} from "zustand";

// export const useCountStore = create((set)=>({
//   count:0,
//   increase: ()=> set((state)=>({count: state.count+1})),
//   decrease: ()=> set((state)=> ({count: state.count-1}))
// }))

//Let's we want to do fetch call when user clicks the certain button.
export const useDataFetchStore = create((set)=>({
  resData: null,
  fetchCall : async ()=>{
    const resjson = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const res = await resjson.json();

    //Call set function to update the state now
    set({
      resData: res.title
    })
  }
}))


export const useCountStore = create((set)=>({
  count: 0,
  increase: ()=> set((state)=>({count: state.count+1})),
  decrease: ()=> set((state)=>({count: state.count-1}))
}))

// export const useCount = create((set)=>({
//   count:0,
//   increase: set((state)=>({count:state.count+1}))
// }))


/*
If you want to return an object using an arrow function, always wrap it with parentheses:
() => ({ key: value })
Otherwise JavaScript thinks it’s a function body, not an object.
*/

//1. Zustand allows us to create global state variables which are not necessary defined inside any component.
//2. So that's why it have NO limitation of passing state as props and wrapping it inside a provider.
//3. Store in zustand is a file where we store our states and functions to update these states.
//4. Then we can import it in components and use the state values and functions.
//5. We create stores using use keyword and that's why it is a hook.

//6. Selectors-> Zustand lets us select only a specific part of the store instead of subscribing to the entire store.
//7. For this we need to call useCountStore() hook this way it will return whole  object {}.
//8. To get specific value we should call function signture as arigument. Like this useCountStore((state) => state.count);
//9. This way it will prevent unnecssary re-rendering. 

/*
increase is a function that, when called, triggers Zustand's set() function.
set() is how you update the store, like:
set({ count: 10 })
or if you need the previous value:
set((state) => ({ count: state.count + 1 }));

// Components subscribed to count re-render
// create function have the access to set function. which we call to update the state.
*/

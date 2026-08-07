import { useEffect, useRef } from "react"

//For “old” we don’t really mean the “previous” value, but the value from the previous rendering.
export const usePrev =(state)=>{
    const prevRef = useRef(0);

    //react first returns and than call useEffect.
    useEffect(()=>{
        prevRef.current= state;
    },[state])
    return prevRef.current
}

/*
If NO → do nothing
→ Return the same previous value as before
→ This prevents the “glitch”

Move the old value into previous
Put the new value into target
*/

//This usePrev hook implementation takes: 
//value:- present value of the state.
//initial-> it will be null
//From subscribed component.
export const usePrevWithoutGlitch=(value, initial)=>{ 
    //Reference var will store object wiith 2 values. target = curent state value , previous = initial value or prev state value. 
    const ref = useRef({target: value, previous: initial})

    if(ref.current.target !== value){
        ref.current.previous = ref.current.target;
        ref.current.target= value
    }

    return ref.current.previous
}

// export const usePrevWithoutGlitch = (value, initial)=>{
//     const ref = useRef({target: value, previous: initial});

//     if(ref.current.target !== value){
//         ref.current.previous = ref.current.target;
//         ref.current.target = value;
//     }
//     return ref.current.previous
// }

//React first returns and than Effect gets called after.
//So thats why return function or value will have the access to previous variable.

/*
✅ Why do we use useRef() for storing previous value?
Because React re-renders the component before running the effect, and state updates cause re-renders, but ref updates DO NOT cause re-renders.


So, this is what usePrevious does when, let’s say, ComponentA calls it with a prop’s value of “1”:

creates the ref with an initial value of undefined
returns the ref’s undefined value
ComponentA finishes its rendering
the ref gets assigned the value “1”
Here we go again with the next rendering phase where the prop’s value now is “2” for some reasons concerning ComponentA:

a new ref is not created, rather its value is retrieved
the ref value, which is “1”, is returned
ComponentA finishes its rendering
the ref gets assigned the new value “2”

Issue rn is that if compoennet re-renders and state value does not change than usePrev hook will return the prev ref value whihc is same as the current state value.

*/
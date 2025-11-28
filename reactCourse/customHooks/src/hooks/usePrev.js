import { useEffect, useRef } from "react"

export const usePrev =(state)=>{
    const prevRef = useRef(0);

    useEffect(()=>{
        prevRef.current= state;
    },[state])
    return prevRef.current
}

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

Issue rn is that if compoennet re-renders and state value does not change than usePrev hook will return the prev ref value whihc is same asn the current state value.

*/
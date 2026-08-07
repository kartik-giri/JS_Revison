/*
1. Debouncing means delaying a call to a certain function for certain time after the last event.
2. It is very useful when the users is seraching in the search bar.
3. We can wait for user to stop typing for certain time and than run search function after the given time.
*/

import { useEffect, useRef, useState } from "react"

//1.UseDebounce hook takes actual function as input.
//2. Than start the clock and pass the actual function as call back and it will run after given time.
export const useDebounce=(reqFunction)=>{
    const refValue = useRef();
    
    const debounceFunc =()=>{
        //Before re-calling the clock we have to first clear the previus clock to prevent multiple calls 
        clearTimeout(refValue.current)
        refValue.current = setTimeout(reqFunction, 200)
        
    }

    return debounceFunc
}

// Thing is that when user type someting in serach bar. search function should be called after some delay.
//It returns the debounce func which call certain function after delay
// export const useDebounce = (funcCall)=>{
//     const ref = useRef();

//     const debounceFunc = ()=>{
//         clearTimeout(ref.current)
//         ref.current = setTimeout(funcCall,200)
//     }
//     return debounceFunc
// }

// setDebouncedValue(value); Does trigger one re-render, BUT
// ➡ It does NOT re-run the effect unless value changed.
export const useDebounceGeneric = (value, delay)=>{
   const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value); //delayed state value will be updated after certain time.
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
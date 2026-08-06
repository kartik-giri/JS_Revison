import { useState, useEffect } from "react";

export const useGetTodo = ()=>{
     const [resData, setResData]= useState({});
    
      const fetchReq = async ()=>{
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const resJson = await res.json();
        setResData(resJson);
      }
      //We can't make Effect function signature async.
      useEffect(()=>{
        fetchReq();
      },[])

      return {
        resData:resData
      }
}

//Create usefetch hook.
//How it works:
//1. It takes url as an input and does the fetch request every time when the url changes.
//2. And return the resp to the component which have subsribe to the hook.


/*
URL is not a state than how changing of url causes the effect to re-run?

Because the URL string itself changes, and therefore the value of the url prop passed to the custom hook changes.
React doesn’t care whether a value comes from state or not.
React only checks this:
Is the value in the dependency array different from last render?
If YES → re-run the effect.
*/

//What if we want to fetch data in real time?
//Than we can make fetch calls after every specified time.
export const useFetch = (url, time)=>{
    const [finalRes, setfinalRes] = useState({});
    const [loading, setLoading] = useState(true);

    const getDetails=async ()=>{
        setLoading(true);
        const res = await fetch(url);
        const resJson = await res.json();
        setfinalRes(resJson);
         setLoading(false)
    }
    useEffect(()=>{
        const id = setInterval(getDetails, time*1000) //refetching // sedning http request repeatledely to get fresh data. 

        getDetails();

        return ()=>{
            clearInterval(id);
        }
    }, [url])

    return ({
        finalRes:finalRes,
        loading:loading
    })
}
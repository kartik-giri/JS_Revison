import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useContent = ()=>{
    const [content, setContent] = useState([]);

    const getContent = ()=>{
          axios.get(`${BACKEND_URL}api/v1/content`,{
            headers:{
                authorization: localStorage.getItem("jwt_Token")
            }
        }).then((response)=>{
            setContent(response.data.message)
        })
    }
    useEffect(()=>{
        getContent(); 

        // let interval = setInterval(()=>{
        //     getContent()
        // },1*1000);

        // return ()=>{
        //     clearInterval(interval)
        // }
    },[])

    return ({
        content,
        getContent
    })
}
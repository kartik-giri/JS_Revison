import { useEffect, useState } from "react"

export const useWindowSize = ()=>{
    const [windowSize, setWindowSize] = useState({
        width:0,
        height:0
    });

    useEffect(()=>{

        const getSize = ()=>{
            setWindowSize({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }

        getSize();

        window.addEventListener("resize", getSize);

        return ()=>{
            window.removeEventListener("resize", getSize)
        }
    },[])

    return windowSize
}





















// import { useEffect, useState } from "react"

// export const useWindowSize = () => {
//     const [windowSize, setWindowSize] = useState({
//         width: 0,
//         height: 0
//     })

//     useEffect(() => {
//         const handleResize = () => {
//             setWindowSize({
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             })
//         }

//         handleResize() // get size on mount

//         window.addEventListener("resize", handleResize) //get new width and height on resize

//         return () => window.removeEventListener("resize", handleResize)  // cleanup
//     }, [])

//     return windowSize
// }
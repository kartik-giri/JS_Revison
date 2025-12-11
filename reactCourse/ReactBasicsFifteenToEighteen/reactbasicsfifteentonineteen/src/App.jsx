import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/class-6/" element={<ClassSix />}></Route>
            <Route path="/class-7/" element={<ClassSeven />}></Route>
            <Route path="/class-8/" element={<ClassEight />}></Route>
            <Route path="/" element={<Landing />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
            <Route path="/Use-Effect" element={<LearnUseEffect />}></Route>
            <Route path="/Stop-watch" element={<StopWatch />}></Route>
            <Route path="/Fix-Ref-Stop-watch" element={<FixRefStopWatch />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

/*
✔️ Creates a parent layout route
✔️ Uses <Outlet /> to show child pages
✔️ Matches any route that starts with /
✔️ Ensures shared UI (header/footer) wraps all pages
*/
const Layout = () => {

  return (
    <>
      <div style={{ height: "10vh" }}><Header /> </div>

      <div style={{ height: "90vh" }}> <Outlet /> </div>

      <Footer />
    </>
  )
}

const Header = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/class-6"}>Class 6</Link>
      <Link to={"/class-7"}>Class 7</Link>
      <Link to={"/class-8"}>Class 8</Link>
      <Link to={"/Use-Effect"}>Use-Effect</Link>
      <Link to={"/Stop-Watch"}>Stop-Watch</Link>
      <Link to={"/Fix-Ref-Stop-watch"}>Fix-Ref-Stop-Watch</Link>
    </>
  )
}

const Footer = () => {
  return (
    <>
      <p>This is the footer!!</p>
    </>
  )
}

const Landing = () => {
  return (<>
    <h1>Allen Site....</h1></>)
}

const ErrorPage = () => {
  return (<>
    <h1>Sorry no page found....</h1></>)
}
const ClassSix = () => {
  return (
    <>
      <h1>Allen for class 6</h1>
    </>
  )
}

const ClassSeven = () => {
  return (
    <>
      <h1>Allen for class 7</h1>
    </>
  )
}

const ClassEight = () => {

  const [count, setCount] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {

    let id = setInterval(() => {
      setCount((count) => {
        console.log(count)
        return count - 1; //passing the change in a state to the setState function so that it can update the state ans react and trigger the re-rendnering.
      })
    }, 1000)

    if (count <= 0) {
      navigate("/");
      clearInterval(id);
    }

    return () => {
      clearInterval(id)
    }
  }, [count])

  return (
    <>
      {/* //Rule of thumb never update state or Never cause navigation in JSX */}
      {count > 0 && <h2>You will be navigated to the home page in {count} seconds!!!</h2>}
      <h1>Allen for class 8</h1>
    </>
  )
}

//Learn useRef 
const LearnUseEffect = () => {
  //UseRef value will persist across re-renders and will not reset to its previous value as like other vairables.
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus()
  }

  return (
    <>
      SignUp: <input type="text" ref={inputRef} />
      <input type="text" />
      <button onClick={focusInput}>Submit</button>
    </>
  )
}

//Clock with start and stop functionality using useEffect.
//well it is working perfectly with useEfffect approach
//BUT THE ISSUE IS THAT FLAG STATE UPDATION IS CAUSING RE-RENDERING BUT WE ARE NOT RENDERNING FLAG STATE ANYWHERE. It is causing faltu ka re-rendinring 
//Component re-rendering should be minimized
const StopWatch = () => {

  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(true);
  
  useEffect(() => {

    if (flag) {
      return
    }

    const id = setInterval(() => {
      setCount((count) => {
        return count + 1
      })
    }, 1000)

    return () => {
      clearInterval(id);
    }
  }, [flag])

  return (
    <>
      <h1>Clock count: {count}</h1>

      <button onClick={() => {
        setFlag(true)
      }}>Stop</button>

      <button onClick={() => {
        setFlag(false)
      }}>Start</button>
    </>
  )
}

const FixRefStopWatch = () => {

  const [count, setCount] = useState(0);
  //useRef is the hook which sllowa us to create reference of the react varible or the dom elements and value of these reference will persist across re-renders and will not trigger re-redering when the reference value is upated.
  //The key away is that we should not create the state varables which we are not rendering cause updation of them causes unneccesary re-render.
  let idRef = useRef(null);

  const startInterval = ()=>{
    if(idRef.current!== null) return; // This prevents from multiple calls to setInterval.
    idRef.current = setInterval(()=>{ //set value of referernce which will persist across re-renders.
      setCount(count=>count+1) 
    },1000)
  }

  const stopInterval = ()=>{
    clearInterval(idRef.current);
  }
  

  return (
    <>
      <h1>Clock count: {count}</h1>

      <button onClick={startInterval}>Start</button>

      <button onClick={stopInterval}>Stop</button>
    </>
  )
}
export default App;
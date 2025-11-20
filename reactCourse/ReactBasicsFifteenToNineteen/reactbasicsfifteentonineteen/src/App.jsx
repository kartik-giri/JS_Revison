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
            <Route path="/Use-Effect" element={<LearnUseEffect/>}></Route>
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
      setCount((count) =>{
        console.log(count)
          return count - 1;
      })
    }, 1000)

    if(count<=0){
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
      {count >0 && <h2>You will be navigated to the home page in {count} seconds!!!</h2>}
      <h1>Allen for class 8</h1>
    </>
  )
}


const LearnUseEffect=()=>{
  const inputRef = useRef(null);

  const focusInput=()=>{
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
export default App;
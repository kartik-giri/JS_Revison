import DashBoard from "./Pages/DashBoard"
import { SignIn } from "./Pages/SignIn"
import { SignUp } from "./Pages/SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const App = ()=>{
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
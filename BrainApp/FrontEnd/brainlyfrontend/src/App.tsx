import { Button } from "./components/ui/Button";

const App=()=>{
  return (
    <>
    <Button variant="Primary" size="lg" text="Click me" startIcon={"+"}  onclick={()=>console.log("heloo")}/>
    </>
  )
}

export default App;
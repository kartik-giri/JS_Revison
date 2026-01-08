import { Button } from "./components/ui/Button";
import { PlusIcon } from "./Icons/PlusIcon";
import { ShareIcon } from "./Icons/ShareIcon";

const App=()=>{
  return (
    <>
    <div className=" flex gap-3">
    <Button variant="Secondary" size="lg" text="Share Brain" startIcon={<ShareIcon size="md"/>}  onclick={()=>console.log("Share Brain")}/>
    <Button variant="Primary" size="lg" text="Add Content" startIcon={<PlusIcon size="md"/>}  onclick={()=>console.log("Add Content")}/>
     <Button variant="Primary" size="sm" text="Add Content" startIcon={<PlusIcon size="sm"/>}  onclick={()=>console.log("Add Content")}/>
    </div>
      
    </>
  )
}

export default App;
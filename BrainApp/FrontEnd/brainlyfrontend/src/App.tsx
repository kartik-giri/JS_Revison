import Card from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./Icons/PlusIcon";
import { ShareIcon } from "./Icons/ShareIcon";

const App=()=>{
  return (
    <>
    <div>

    <div className=" flex gap-3">
    <Button variant="Secondary" size="lg" text="Share Brain" startIcon={<ShareIcon size="md"/>}  onclick={()=>console.log("Share Brain")}/>
    <Button variant="Primary" size="lg" text="Add Content" startIcon={<PlusIcon size="md"/>}  onclick={()=>console.log("Add Content")}/>
    </div>
    <Card link="https://twitter.com/Indianinfoguide/status/2009959060024746266?s=20" title="Modi tweet" type="twitter"/>
    <Card link="https://youtu.be/c6SzMmGEPlM?si=I3nkgyFQWPZb_d22" title="Harkirat video" type="youtube"/>
    </div>  
    </>
  )
}

export default App;
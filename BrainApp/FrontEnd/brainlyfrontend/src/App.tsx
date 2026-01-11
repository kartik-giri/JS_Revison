import Card from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./Icons/PlusIcon";
import { ShareIcon } from "./Icons/ShareIcon";
import CreateContentModal from "./components/ui/CreateContentModal";
import { useState } from "react";
import { SideBar } from "./components/ui/SideBar";

const App=()=>{
  const [modaLOpen, setModal] = useState(false);
  return (
    <>
    <div className="flex justify-around">
      <div>
         <SideBar/>
      </div>

      <div>
      <CreateContentModal open={modaLOpen} onClose={()=>{
        setModal(false)
      }}/>
    <div className="flex items-baseline justify-between  mr-8 mt-6">
      <div className="font-bold text-2xl">All Notes</div>
      <div className="flex gap-4">
    <Button variant="Secondary" size="lg" text="Share Brain" startIcon={<ShareIcon size="md"/>}  onclick={()=>console.log("Share Brain")}/>
    <Button variant="Primary" size="lg" text="Add Content" startIcon={<PlusIcon size="md"/>}  onclick={()=>{
      setModal(true)
    }}/>
    </div>
    </div>

    {/* <div className=" grid md:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"> */}
    <div className="columns-1 sm:columns-2 md:columns-2 md:gap-4 lg:columns-3 lg:gap-8 mt-8">
    <Card link="https://twitter.com/Indianinfoguide/status/2009959060024746266?s=20" title="Modi tweet" type="twitter"/>
    <Card link="https://youtu.be/c6SzMmGEPlM?si=I3nkgyFQWPZb_d22" title="Harkirat video" type="youtube"/>
    <Card link="https://x.com/PTI_News/status/2010045565451809096?s=20" title="Dog Tweet" type="twitter"/>
    <Card link="https://twitter.com/Indianinfoguide/status/2009959060024746266?s=20" title="Modi tweet" type="twitter"/>
    <Card link="https://youtu.be/c6SzMmGEPlM?si=I3nkgyFQWPZb_d22" title="Harkirat video" type="youtube"/>
    <Card link="https://x.com/PTI_News/status/2010045565451809096?s=20" title="Dog Tweet" type="twitter"/>
    <Card link="https://twitter.com/Indianinfoguide/status/2009959060024746266?s=20" title="Modi tweet" type="twitter"/>
    <Card link="https://youtu.be/c6SzMmGEPlM?si=I3nkgyFQWPZb_d22" title="Harkirat video" type="youtube"/>
    <Card link="https://x.com/PTI_News/status/2010045565451809096?s=20" title="Dog Tweet" type="twitter"/>
    <Card link="https://twitter.com/Indianinfoguide/status/2009959060024746266?s=20" title="Modi tweet" type="twitter"/>
    <Card link="https://youtu.be/c6SzMmGEPlM?si=I3nkgyFQWPZb_d22" title="Harkirat video" type="youtube"/>
    <Card link="https://x.com/PTI_News/status/2010045565451809096?s=20" title="Dog Tweet" type="twitter"/>
    </div>
    </div>
    </div>  
    </>
  )
}

export default App;
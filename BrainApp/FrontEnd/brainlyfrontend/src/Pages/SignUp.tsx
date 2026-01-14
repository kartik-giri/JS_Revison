import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
export const SignUp = ()=>{
    return (
        <>
        <div className="h-screen w-screen bg-myLightBlue inline-flex justify-center items-center">
            <div className="bg-white rounded-sm gap-4 p-10">
             <Input placeholder="Name.." onchange={()=>{}}/>
              <Input placeholder="Email.." onchange={()=>{}}/>
              <Input placeholder="Password.." onchange={()=>{}}/>
              <div className="text-center mt-2">
               <Button text="Submit" onclick={()=>{}} variant="Primary" size="md"/>
              </div>
            </div>

        </div>
        </>
    )
}


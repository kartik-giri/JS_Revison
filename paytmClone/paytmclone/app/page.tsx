import { BtnComponentsignin, BtnComponentsignup } from "@/UI/BtnCompoent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


const Home = async ()=>{
 const session = await getServerSession();
     if(session){
      redirect("dashboard")
     }
  return(
    <>
    <nav className="flex justify-between p-4">
                <h1 className="font-bold text-2xl">Payment App</h1>
                <div>
                  <BtnComponentsignup>Sign up</BtnComponentsignup>
                  <BtnComponentsignin>Sign in</BtnComponentsignin>
                  
                </div>
      </nav>
    
    </>
  )
  
}
export default Home


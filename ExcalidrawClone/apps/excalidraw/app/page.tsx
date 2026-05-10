import { redirect } from "next/navigation"
import {  BtnComponentsignin, BtnComponentsignup } from "./(auth)/components/btnComponent"

const Home = ()=>{
  return (
    <section >
      <div>
      <BtnComponentsignup>Sign up</BtnComponentsignup>

      <BtnComponentsignin>Sign in</BtnComponentsignin>
      </div>
      <h1 className="text-2xl">Landing page</h1>
    </section>
  )
}

export default Home

            //       <button className="px-6 py-2 bg-[#6965db] text-white font-bold rounded-xl border-2 border-[#1e1e1e] shadow-[3px_3px_0px_0px_#1e1e1e] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
            //   Sign Up
            // </button>
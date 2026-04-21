import { getServerSession } from "next-auth"

const Home = async ()=>{
  const session = await getServerSession();
  
  return(
    <>
    {JSON.stringify(session)}
    </>
  )
}

export default Home




















//CLient compoennet to check if user is sign in or not.
// "use client"
// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

// const Home= ()=> {

//   //How to know if user is sing in or not?
//   return (
//   <>
//   <SessionProvider>
//     <RealHome/>
//   </SessionProvider>
//   </>
//   );
// }

// export default Home

// const RealHome = ()=>{

//   const session = useSession(); //this hook will run client browser to check if user is sign in or not. if sign in user object will be returned
//   return (
//     <div>
//       {session.status === "authenticated" && <button onClick={()=>{signOut()}}>Log out</button>}
//        {session.status === "unauthenticated" && <button onClick={()=>{signIn()}}>Log in</button>}
//     </div>
//   )
// }

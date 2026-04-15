import Link from "next/link"

const Home = ()=>{
  return (
    <>
    <div className=" text-lg h-screen w-screen flex flex-col items-center justify-center">
      Todo appilcation

      <div>
        
        <div>
        <Link href={"/signup"}>User sign up</Link>
        </div>
        
        <div>
           <Link href={"/signin"}>User sign in</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
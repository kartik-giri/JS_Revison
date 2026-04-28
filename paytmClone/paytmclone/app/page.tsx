import { getServerSession } from "next-auth";

const Home = async ()=>{
 const session = await getServerSession();
  
  return(
    <>
    {JSON.stringify(session)}
    </>
  )
  
}
export default Home
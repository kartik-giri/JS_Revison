import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import {Button} from "../../UI/Button"
import prisma from "@/lib/prisma";
import { email } from "zod";
import { getUsers } from "../serverFunction/getUsers";
import { ReactNode } from "react";
import { SendButton } from "@/UI/SendButton";

//The rule is: server components cannot pass functions as props to client components. 

const Dashboard = async()=>{
    const session = await getServerSession();
    if(!session?.user?.email){
        redirect("/")
    }

    const user = await prisma.users.findUnique({
        where:{
            email:session.user.email
        },
        include:{
            account:true,
            sent_transaction:true,
            recieved_trasaction:true,
        }
    })

    const allUsers = await getUsers()
    return (

        <section>
            <nav className="flex justify-between p-4">
                <h1 className="font-bold text-2xl">Payment App</h1>
                <div className="flex">
                    <p className="text-2xl mx-4">Hello, {user!.username.toUpperCase()}</p>
                <Button>Sign out</Button>
                </div>
            </nav>

            <h1 className=" px-4 font-bold">You Balance: {user?.account?.balance}</h1>

            <h1 className=" px-4 font-bold">Users</h1>

            <div className="px-4">
                 <input className="border-2 w-full px-4 py-2 border-black" type="text" placeholder="search users" />
            </div>
            {/* Render user list below */}
            <UserComponent senderid={user!.id} Users={allUsers}></UserComponent>
        </section>
    )
} 

export default Dashboard;

const UserComponent = ({senderid, Users}:{Users: any, senderid:number})=>{
    return (
        <section>
            {Users.map((user:any)=>{
                return <div key={user.id} className="font-bold  mx-4 border my-2 p-2 flex justify-between items-center">
                    <p>User {user.username}</p>
                    <SendButton senderId={senderid} recieverId={user.id}/>
                </div>
                
            })}
        </section>
    )
}


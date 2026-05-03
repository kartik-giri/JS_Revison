import prisma from "@/lib/prisma"

export const getUsers = async ()=>{
    const userArr = await prisma.users.findMany();
    return userArr
}

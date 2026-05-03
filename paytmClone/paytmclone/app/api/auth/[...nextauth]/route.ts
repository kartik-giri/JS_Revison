import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

const handler = NextAuth({
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "email", type: "text", placeholder: "kartik@gmail.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const user = await prisma.users.findUnique({
        where:{
            email: credentials?.email
        }
      })

      console.log("USER:", user);

  if (!user) return null;

      const isvalid = await bcrypt.compare(credentials!.password, user!.password);

      console.log("valid:", isvalid)

      if(!isvalid){
        return null
      }

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return {
           id: user.id.toString(),
           name: user.username,
           email: user.email,
        }
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  })
],
secret: process.env.NEXTAUTH_SECRET,
pages:{
    signIn: "/signin"
},
//“Where should the user be sent now?” decide this
callbacks: {
    async redirect({ url, baseUrl }) {
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  }
  }
})

export {handler as POST, handler as GET};
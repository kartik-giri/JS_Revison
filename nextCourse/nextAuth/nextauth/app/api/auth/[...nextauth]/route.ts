import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
//This will return function which is similar to wahat we have created like it will have request param.
// const handler = (request)=>{
// }
//just with handler name which we change while ecporting.
//ANd it will catch all the mutiple dynamic params in the api/route/232/343/signin

const handler = NextAuth({
    providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "email",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith@gmail.com" },
      password: { label: "Password", type: "password" },
      // adminPassword: {label: "Admin password", type:"Password"}
    },

    //Key is authorize -> value is function.
    //It is just short form to define function in object key value pair.
    async authorize(credentials, req) {

      const userName = credentials?.username;
      const password = credentials?.password;
      console.log({
        userName,
        password
      })
      // Add logic here to look up the user from the credentials supplied
      const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  }),

    GoogleProvider({
    clientId: "ksncj",
    clientSecret: "njdnc"
  }),

 GitHubProvider({
    clientId: "jnjn",
    clientSecret: "jnjn"
  })
],
secret: process.env.AUTH_SECRET,

})

export { handler as GET, handler as POST }
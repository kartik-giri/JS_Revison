import express, { response } from 'express';
import { Client } from "pg";

const app = express();
app.use(express.json())

const pgClient = new Client({
   connectionString:  "postgresql://neondb_owner:npg_anI36hdexiWm@ep-solitary-truth-aiwruhbm-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=verify-full",
   ssl:{
    rejectUnauthorized:true
   }
});

const main= async()=>{
    await pgClient.connect();

    // await pgClient.query("CREATE TABLE todo(id SERIAL PRIMARY KEY, title VARCHAR(200) NOT NULL, description VARCHAR(800) NOT NULL, done BOOLEAN )");

    // await pgClient.query("UPDATE users SET password='neeraj121G' WHERE id=2")
    // const result = await pgClient.query('SELECT *FROM users');
    // console.log(result.rows);


}

main();

app.post("/signup", async(req, res)=>{
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;

    //Solution to sql injection, we are not appending user given strings and input strings are not exuting instead we are passing input as array and these values are used by taking each element.
    const insertQuery = `INSERT INTO users(username, email, password) VALUES($1, $2, $3)`
    const value = [userName, email, password]
    await pgClient.query(insertQuery, value)
    res.json({
        message: `${userName} is signed up!`
    })
})

app.listen(3000);
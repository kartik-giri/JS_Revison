import express from "express";
import { Client } from "pg";
const pgCLient = new Client({
    connectionString: "postgresql://neondb_owner:npg_anI36hdexiWm@ep-solitary-truth-aiwruhbm-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=verify-full",
    ssl: {
        rejectUnauthorized: true
    }
});
const main = async () => {
    await pgCLient.connect();
    // "double quotes" → for column/table identifiers
    //  'single quotes' → for string values
};
main();
const app = express();
app.use(express.json());
app.post("/sing-up", async (request, response) => {
    let userName = request.body.userName;
    let email = request.body.email;
    let password = request.body.password;
    let city = request.body.city;
    let pincode = request.body.pincode;
    let country = request.body.country;
    let street = request.body.street;
    //Solution to sql injection, we are not appending user given strings and input strings are not exuting instead we are passing input as array and these values are used by taking each element.
    const userQuery = "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id";
    const addressQuery = "INSERT INTO address(city, pincode, country, street, user_id) VALUES($1,$2,$3,$4,$5)";
    //Problem is what if one of the tx fails? it will create partial entries.
    //SOlution is to wrap queries into txs just like we do in blockchain to revert the wohole tx if any query fials.
    try {
        await pgCLient.query("BEGIN;");
        const userQueryRes = await pgCLient.query(userQuery, [userName, email, password]);
        const userID = userQueryRes.rows[0].id;
        const addressQueryRes = await pgCLient.query(addressQuery, [city, pincode, country, street, userID]);
        await pgCLient.query("COMMIT;");
        response.json({
            message: `${userName} is signed up!`
        });
    }
    catch (e) {
        response.json({
            message: `${e}ERROR occured while user signing up!`
        });
    }
});
//Join allow us to join data from 2 tables.
app.get("/metadata", async (req, res) => {
    const id = req.query.id;
    const metaQuery = "SELECT users.id, users.username, users.email, address.city, address.country, address.street FROM users JOIN address ON users.id = address.user_id WHERE users.id=$1 ";
    try {
        const metaRes = await pgCLient.query(metaQuery, [id]);
        res.json({
            message: metaRes.rows
        });
    }
    catch (e) {
        res.json({
            message: `${e} Error occured while fetching user metadata from more than 1 table!`
        });
    }
});
app.listen(3000);
// import express, { response } from 'express';
// import { Client } from "pg";
// const app = express();
// app.use(express.json())
// const pgClient = new Client({
//    connectionString:  "postgresql://neondb_owner:npg_anI36hdexiWm@ep-solitary-truth-aiwruhbm-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=verify-full",
//    ssl:{
//     rejectUnauthorized:true
//    }
// });
// const main = async()=>{
//     await pgClient.connect();
//     // await pgClient.query("CREATE TABLE todo(id SERIAL PRIMARY KEY, title VARCHAR(200) NOT NULL, description VARCHAR(800) NOT NULL, done BOOLEAN )");
// //     "double quotes" → for column/table identifiers
// //     'single quotes' → for string values
//     // await pgClient.query("UPDATE users SET password='neeraj121G' WHERE id=2")
//     // const result = await pgClient.query('SELECT *FROM users');
//     // console.log(result.rows);
// }
// main();
// app.post("/signup", async(req, res)=>{
//     let userName = req.body.userName;
//     let password = req.body.password;
//     let email = req.body.email;
//     let city = req.body.city;
//     let country = req.body.country;
//     let street = req.body.street;
//     let pincode = req.body.pincode;
//     //Solution to sql injection, we are not appending user given strings and input strings are not exuting instead we are passing input as array and these values are used by taking each element.
//     const insertuserQuery = `INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id`
//     const usersvalue = [userName, email, password]
//     //The issue is ifour backend crashed before running 2nd insert query in this case only half db is being updated.
//     const insertaddressQuery = `INSERT INTO address(userid,city,country,street,pincode) VALUES($1, $2, $3, $4, $5)`;
//     try{
//         //SOLUTION IS THIS CREATING TXS WRAPPING MULTIPLE QUIRIES.
//         pgClient.query("BEGIN;")
//     const usersResopense = await pgClient.query(insertuserQuery, usersvalue);
//     const userId = usersResopense.rows[0].id;
//     const addressValues = [userId, city, country, street, pincode];
//     await pgClient.query(insertaddressQuery, addressValues);
//     pgClient.query("COMMIT;")
//     res.json({
//         message: `${userName} is signed up!`
//     })}catch(e){
//         res.json({
//             message: `Error occured while user signing up!`
//         })
//     }
// })
// app.listen(3000);
//# sourceMappingURL=index.js.map
import express, { response } from 'express';
import { Client } from "pg";
const app = express();
app.use(express.json());
const pgClient = new Client({
    connectionString: "postgresql://neondb_owner:npg_anI36hdexiWm@ep-solitary-truth-aiwruhbm-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=verify-full",
    ssl: {
        rejectUnauthorized: true
    }
});
const main = async () => {
    await pgClient.connect();
    // await pgClient.query("CREATE TABLE todo(id SERIAL PRIMARY KEY, title VARCHAR(200) NOT NULL, description VARCHAR(800) NOT NULL, done BOOLEAN )");
    //     "double quotes" → for column/table identifiers
    //     'single quotes' → for string values
    // await pgClient.query("UPDATE users SET password='neeraj121G' WHERE id=2")
    // const result = await pgClient.query('SELECT *FROM users');
    // console.log(result.rows);
};
main();
app.post("/signup", async (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let city = req.body.city;
    let country = req.body.country;
    let street = req.body.street;
    let pincode = req.body.pincode;
    //Solution to sql injection, we are not appending user given strings and input strings are not exuting instead we are passing input as array and these values are used by taking each element.
    const insertuserQuery = `INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id`;
    const usersvalue = [userName, email, password];
    //The issue is ifour backend crashed before running 2nd insert query in this case only half db is being updated.
    const insertaddressQuery = `INSERT INTO address(userid,city,country,street,pincode) VALUES($1, $2, $3, $4, $5)`;
    try {
        //SOLUTION IS THIS CREATING TXS WRAPPING MULTIPLE QUIRIES.
        pgClient.query("BEGIN;");
        const usersResopense = await pgClient.query(insertuserQuery, usersvalue);
        const userId = usersResopense.rows[0].id;
        const addressValues = [userId, city, country, street, pincode];
        await pgClient.query(insertaddressQuery, addressValues);
        pgClient.query("COMMIT;");
        res.json({
            message: `${userName} is signed up!`
        });
    }
    catch (e) {
        res.json({
            message: `Error occured while user signing up!`
        });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map
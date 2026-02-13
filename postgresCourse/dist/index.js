import { Client } from "pg";
const pgClient = new Client({
    connectionString: "postgresql://neondb_owner:npg_anI36hdexiWm@ep-solitary-truth-aiwruhbm-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=verify-full",
    ssl: {
        rejectUnauthorized: true
    }
});
const main = async () => {
    await pgClient.connect();
    const result = await pgClient.query('SELECT *FROM users');
    console.log(result.rows);
};
main();
//# sourceMappingURL=index.js.map
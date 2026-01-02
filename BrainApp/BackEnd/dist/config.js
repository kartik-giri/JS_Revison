import dotenv from "dotenv";
dotenv.config();
import z from "zod";
//using zod config schema for schecking if env variables are valid.
const envValidate = z.object({
    JWT_SECRET: z.string().min(3, "secret should be more than 3 letters.")
});
// const parse = envValidate.safeParse(process.env);
const envParse = envValidate.parse(process.env);
// if(!parse.success){
//     console.log("ENV variables does not follow schema.");
//     console.log(parse.error.format())
//     process.exit(1);
// }
console.log("🔍 DEBUG: JWT_SECRET from process.env =", envParse.JWT_SECRET);
export default envParse;
// export default {
//     jwtSecret: parse.data.JWT_SECRET
// }
//# sourceMappingURL=config.js.map
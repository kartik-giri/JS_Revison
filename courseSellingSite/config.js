//Centralized config loader
// ✅ Clean, reliable, scalable
module.exports= {
    admin_secret: process.env.USER_JWT_SECRET,
    user_secret: process.env.ADMIN_JWT_SECRET,
}


// require("dotenv").config(); //dotenv file is loaded only one like this if it nont loaded env vairables will return undefined.
//that's we should config file to export evn vairables and make it centralized.
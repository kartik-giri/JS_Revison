const jwt = require("jsonwebtoken");
const {user_secret} = require("../config");


const userAuth = (req, res, next)=>{
    const jwtToken = req.headers.authorization;
    try{
    const verifyResult = jwt.verify(jwtToken, user_secret);
    
    if(verifyResult){
        req.userId = verifyResult.Id;
        next();
    }
    }catch(err){
        res.status(400).json({
            message: `JWT is not correct`
        })
    }
}

module.exports={
    userAuthMiddleware : userAuth
}
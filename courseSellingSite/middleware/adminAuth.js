const jwt = require("jsonwebtoken");
const {admin_secret} = require("../config");


const adminAuth= (req, res, next)=>{
    const jwtToken = req.headers.authorization;
    try{
    const verifyResult = jwt.verify(jwtToken, admin_secret);
    
    if(verifyResult){
        req.adminId = verifyResult.Id;
        next();
    }
    }catch(err){
        res.status(400).json({
            message: `JWT is not correct`
        })
    }
}

module.exports={
    adminAuthMiddleware : adminAuth
}
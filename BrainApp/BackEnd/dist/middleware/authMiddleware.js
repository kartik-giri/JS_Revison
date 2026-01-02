import envParse from "../config.js";
import jwt, {} from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    try {
        const jwtToken = req.headers.authorization;
        if (!jwtToken) {
            res.status(400).json({
                message: `Error occured in auth`
            });
        }
        else {
            //“ as means Trust me — this value is an object that has all standard JWT fields AND an id property. means intersection”
            //to implement the type checking.
            const verifyJwt = jwt.verify(jwtToken, envParse.JWT_SECRET);
            if (!verifyJwt) {
                res.status(400).json({
                    message: `Error occured while verifying jwt`
                });
            }
            else {
                req.userId = verifyJwt.id;
                next();
            }
        }
    }
    catch (err) {
        res.status(400).json({
            message: `Error occured in auth middleware`
        });
    }
};
//# sourceMappingURL=authMiddleware.js.map
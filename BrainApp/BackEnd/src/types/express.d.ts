import type { ObjectId, ObjectIdQueryTypeCasting } from "mongoose";

declare global{
    namespace Express{
        interface Request{
            userId?: string  //the type of userId is scrting not object
        }
    }
    // namespace cors{
    //     interface cors{
    //         domain:string
    //     }
    // }
}

export {}
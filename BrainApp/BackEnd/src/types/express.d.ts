import type { ObjectId, ObjectIdQueryTypeCasting } from "mongoose";

declare global{
    namespace Express{
        interface Request{
            userId?: ObjectIdQueryTypeCasting
        }
    }
}

export {}
import { Schema } from "mongoose";

interface Token extends Object {
    id: Schema.Types.ObjectId,
    expires_in: number
}

export default Token;
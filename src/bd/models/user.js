import { model, Schema } from "mongoose";
import { ROLES } from "../../constans/index.js";

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ROLES.TEACHER, ROLES.Parent],
        default: ROLES.TEACHER,
    }
},
    { timestamps: true, versionKey: false },
);

usersSchema.method('toJSON', function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
});

export const userCollection = model("users", usersSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ["SuperAdmin", "Admin", "User"],
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    profileImageUrl: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("MovieUserSchema", userSchema);

export default User;

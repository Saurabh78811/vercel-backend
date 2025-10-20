import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // hash before save
    role: { type: String, enum: ["student", "educator"], required: true },
    photoUrl: { type: String, default: "" },
    enrolledCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: "course" }
    ],
    resetOtp: { type: String },
    otpExpires: { type: Date },
    description: { type: String, maxlength: 500 },
    isOtpVerified: { type: Boolean, default: false } // fixed typo
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;

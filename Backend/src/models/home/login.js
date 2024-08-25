import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    mail: String,
    pass: String
});

const Login = mongoose.model('Login', loginSchema);

export default Login;

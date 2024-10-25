import bcrypt from 'bcrypt';

export default async function HashPassword(password){
    if (!password) {
        throw new Error("Password is required for hashing");
    }
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error during password hashing:", error);
        throw new Error("Password hashing failed");
    }
}

// async function hlo(){
//     const str=await HashPassword('password')
//     console.log(str)
// }


// hlo()
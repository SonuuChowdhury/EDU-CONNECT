import bcrypt from 'bcrypt'

export default async function HashPassword(password){
    const saltRounds=10
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

import bcrypt from 'bcrypt'
const password=''

const saltRounds=10
const hashedPassword = await bcrypt.hash(password, saltRounds);
console.log(hashedPassword)
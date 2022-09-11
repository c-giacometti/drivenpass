import Cryptr from "cryptr";
import bcrypt from "bcrypt";

const cryptr = new Cryptr(process.env.CRYPT_SECRET as string);

export async function encryptPasswords(password: string){

    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
    
}

export function encryptSensitiveData(data: string){

    return cryptr.encrypt(data);

}

export function decryptPasswords(password: string, hashPassword: string){

    return bcrypt.compareSync(password, hashPassword);

}

export function decryptSensitiveData(data: string){

    return cryptr.decrypt(data);
    
}
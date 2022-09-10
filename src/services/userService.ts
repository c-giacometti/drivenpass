import jwt from 'jsonwebtoken';
import * as userRepository from "../repositories/userRepository.js";
import { encryptPasswords, decryptPasswords } from '../utils/encryptUtil.js';

export async function create(
    email: string, 
    password: string
){

    const user = await userRepository.findByEmail(email);

    if(user){
        throw {
            type: "error_bad_request",
            message: "you already have an account"
        }
    }

    const hashPassword = await encryptPasswords(password);

    await userRepository.insert({ email, password: hashPassword });
    
}


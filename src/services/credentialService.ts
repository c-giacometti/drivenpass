import * as credentialRepository from "../repositories/credentialRepository.js";
import { decryptSensitiveData, encryptSensitiveData } from "../utils/encryptUtil.js";

export async function create(
    credentialData: credentialRepository.ICredentialData
){

    const { userId, title, url, username, password } = credentialData;

    const titleExists = await credentialRepository.findByUserIdAndTitle(userId, title);

    if(titleExists){
        throw {
            type: "error_conflict",
            message: "credential already exists, pick another title"
        }
    }

    const hashData = encryptSensitiveData(password);

    await credentialRepository.insertCredential({ userId, title, url, username, password: hashData});
    
}

export async function getAll(
    userId: number
){

    const credentials = await credentialRepository.findAllCredentials(userId);

    const decryptedCredentials = credentials.map(
        (credential) => ({ ...credential, password: decryptSensitiveData(credential.password) })
    );

    return decryptedCredentials;

}

export async function getById(
    userId: number, 
    id: number
){

    const credential = await credentialRepository.findCredentialById(id);

    if(!credential){
        throw {
            type: "error_not_found",
            message: "credential does not exist"
        }
    }

    if(userId !== credential.userId){
        throw {
            type: "error_forbidden",
            message: "you can't access this credential"
        }
    }

    const decryptedPassword = decryptSensitiveData(credential.password);

    return {...credential, password: decryptedPassword };

}
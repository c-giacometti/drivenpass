import { Credential } from "@prisma/client";
import connection from "../../database/database.js";

export type ICredentialData = Omit<Credential, 'id' | 'createdAt'>;

export async function insertCredential(credentialData: ICredentialData){

    const { userId, title, url, username, password } = credentialData;

    await connection.credential.create({
        data: { userId, title, url, username, password }
    });

}

export async function findByUserIdAndTitle(userId: number, title: string){

    const result = await connection.credential.findUnique({
        where: {
            userId_title: { userId, title }
        }
    });

    return result;
    
}

export async function findAllCredentials(userId: number){

    const result = await connection.credential.findMany({
        where: { userId }
    });

    return result;

}

export async function findCredentialById(id: number){

    const result = await connection.credential.findFirst({
        where: { id }
    });

    return result;

}

export async function deleteCredential(id: number){

    await connection.credential.delete({
        where: { id }
    });

}
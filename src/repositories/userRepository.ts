import { User } from "@prisma/client";
import connection from "../../database/database.js";

export type IUserInsertData = Omit<User, 'id' | 'createdAt'>;

export async function findById(id: number){

    const result = await connection.user.findUnique({
        where: { id },
    });

    return result;
    
}

export async function findByEmail(email: string){

    const result = await connection.user.findUnique({
        where: { email },
    });

    return result;

}

export async function insert(userData: IUserInsertData){

    const { email, password } = userData;

    await connection.user.create({
        data: { email, password },
    });

}
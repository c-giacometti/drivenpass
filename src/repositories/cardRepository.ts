import { Card } from "@prisma/client";
import connection from "../../database/database.js";

export type ICardData = Omit<Card, "id" | "createdAt">;

export async function insertCard(cardData: ICardData){

    const { userId, title, number, cardHolderName, expirationDate,cvv, password, isVirtual, type } = cardData;

    await connection.card.create({
        data: { userId, title, number, cardHolderName, expirationDate,cvv, password, isVirtual, type }
    });

}

export async function findByUserIdAndTitle(userId: number, title: string){

    const result = await connection.card.findUnique({
        where: {userId_title: { userId, title }}
    });

    return result;

}

export async function findAllCards(userId: number){

    const result = await connection.card.findMany({
        where: { userId }
    });

    return result;

}

export async function findById(id: number) {
    
    const result = await connection.card.findFirst({
        where: { id }
    });

    return result;

}

export async function deleteCard(id: number){

    await connection.card.delete({
        where: { id }
    });
    
}
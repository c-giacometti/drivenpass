import { Note } from "@prisma/client";
import connection from "../../database/database.js";

export type INoteData = Omit<Note, "id" | "createdAt">;

export async function insertNote(noteData: INoteData){

    const { userId, title, note } = noteData;

    await connection.note.create({
        data: { userId, title, note }
    });

}

export async function findAllNotes(userId: number){

    const result = await connection.note.findMany({
        where: { userId }
    });

    return result;

}

export async function findById(id: number){

    const result = await connection.note.findFirst({
        where: { id }
    });

    return result;

}

export async function findByUserIdAndTitle(userId: number, title: string){

    const result = await connection.note.findUnique({
        where: { userId_title: { userId, title } }
    });

    return result;

}

export async function deleteNote(id: number){

    await connection.note.delete({
        where: { id }
    });

}
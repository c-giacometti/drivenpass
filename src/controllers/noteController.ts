import { Request, Response } from "express";
import { noteSchema } from "../schemas/noteSchema.js";
import * as noteService from "../services/noteService.js";

export async function createNote(req: Request, res: Response){

    const { userId } = res.locals;
    const { title, note } = req.body;

    const validRequest = noteSchema.validate({ title, note });

    if(validRequest.error){
        return res.status(422).send("incorrect data format");
    }

    await noteService.create({ userId, title, note });

    res.status(201).send("note created successfully");

}

export async function getAllNotes(req: Request, res: Response){
    
    const { userId } = res.locals;

    const notes = await noteService.getAll(userId);

    return res.status(200).send(notes);
    
}

export async function getNoteById(req: Request, res: Response){

    const { id } = req.params;

}

export async function deleteNote(req: Request, res: Response){

    const { id } = req.params;

    res.status(200).send("note deleted successfully");
}
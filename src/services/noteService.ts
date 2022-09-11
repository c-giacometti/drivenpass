import * as noteRepository from "../repositories/noteRepository.js";

export async function create(
    noteData: noteRepository.INoteData
){

    const { userId, title, note } = noteData;

    const titleExists = await noteRepository.findByUserIdAndTitle(userId, title);

    if(titleExists){
        throw {
            type: "error_conflict",
            message: "note already exists, pick another title"
        }
    }

    await noteRepository.insertNote({ userId, title, note });
    
}

export async function getAll(
    userId: number
){

    const notes = await noteRepository.findAllNotes(userId);

    return notes;

}

export async function getById(
    userId: number, 
    id: number,
    action: string
){

    const note = await noteRepository.findById(id);

    if(!note){
        throw {
            type: "error_not_found",
            message: "note does not exist"
        }
    }

    if(userId !== note.userId){
        throw {
            type: "error_forbidden",
            message: "access denied"
        }
    }

    if(action === "find"){
        return note;
    }

    if(action === "delete"){
        await noteRepository.deleteNote(id);
        return;
    }

    throw {
        type: "error_bad_request",
        message: "coundn't proccess request"
    }    

}
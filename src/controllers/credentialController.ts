import { Request, Response } from "express";
import { credentialShema } from "../schemas/credentialSchema.js";
import * as credentialService from "../services/credentialService.js";

export async function createCredential(req: Request, res: Response){

    const { userId } = res.locals;
    const { title, url, username, password } = req.body;

    const validRequest = credentialShema.validate({ title, url, username, password });

    if(validRequest.error){
        return res.status(422).send("incorrect data format");
    }

    await credentialService.create({
        userId,
        title,
        url,
        username,
        password
    });

    res.status(201).send("credential successfully created");

}

export async function getAllCredentials(_req: Request, res: Response){

    const { userId } = res.locals;

    const credentials = await credentialService.getAll(userId);

    res.status(200).send(credentials);

}

export async function getCredentialById(req: Request, res: Response){

    const { userId } = res.locals;
    const { id } = req.params;

    if(isNaN(parseInt(id))){
        return res.sendStatus(400);
    }

    const credential = await credentialService.getById(userId, parseInt(id));

    res.status(200).send(credential);

}
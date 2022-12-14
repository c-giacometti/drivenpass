import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";
import { cardSchema } from "../schemas/cardSchema.js";

export async function createCard(req: Request, res: Response){

    const { userId } = res.locals;
    const { title, number, cardHolderName, expirationDate, cvv, password, isVirtual, type } = req.body;

    const validRequest = cardSchema.validate(req.body);

    if(validRequest.error){
        return res.status(422).send("incorrect data format");
    }

    await cardService.create({ 
        userId, 
        title, 
        number, 
        cardHolderName, 
        expirationDate, 
        cvv, 
        password, 
        isVirtual, 
        type });

    return res.status(201).send("card created successfully");

}

export async function getAllCards(req: Request, res: Response){

    const { userId } = res.locals;

    const cards = await cardService.getAll(userId);

    return res.status(200).send(cards);
    
}

export async function getCardById(req: Request, res: Response){
    
    const { userId } = res.locals;
    const { id } = req.params;

    if(isNaN(parseInt(id))){
        return res.sendStatus(400);
    }

    const card = await cardService.getById(userId, parseInt(id), "find");

    return res.status(200).send(card);

}

export async function deleteCard(req: Request, res: Response){
    
    const { userId } = res.locals;
    const { id } = req.params;

    if(isNaN(parseInt(id))){
        return res.sendStatus(400);
    }

    await cardService.getById(userId, parseInt(id), "delete");

    return res.status(200).send("card deleted sucessfully");

}
import { Request, Response } from "express";
import { wifiSchema } from "../schemas/wifiSchema.js";
import * as wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response){

    const { userId } = res.locals;
    const { title, networkName, password } = req.body;

    const validRequest = wifiSchema.validate(req.body);

    if(validRequest.error){
        return res.status(422).send("incorrect data format");
    }

    await wifiService.create({ userId, title, networkName, password });

    return res.status(201).send("wifi created successfully");

}

export async function getAllWifis(req: Request, res: Response){
    
}

export async function getWifiById(req: Request, res: Response){
    
}

export async function deleteWifi(req: Request, res: Response){
    
}
import { Request, Response } from "express";
import * as userService from "../services/userService.js";
import { authSchema } from "../schemas/authSchema.js";

export async function createUser(req: Request, res: Response){

    const { email, password } = req.body;

    const validRequest = authSchema.validate(req.body);

    if(validRequest.error){
        return res.status(422).send("incorrect data format");
    }

    await userService.create(email, password);

    res.status(201).send("user created successfully");

}

export async function loginUser(req: Request, res: Response){

    const { email, password } = req.body;

    const validRequest = authSchema.validate(req.body);

    if(validRequest.error){
        return res.status(422).send("incorrect data format");
    }

    const { token } = await userService.login(email, password);

    res.status(200).send({ token });

}
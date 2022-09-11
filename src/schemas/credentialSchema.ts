import joi from "joi";

export const credentialShema = joi.object({
    title: joi.string().required(),
    url: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required()
})
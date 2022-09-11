import joi from "joi";

export const cardSchema = joi.object({
    title: joi.string().required(),
    number: joi.string().required(),
    cardHolderName: joi.string().required(),
    expirationDate: joi.string().required(),
    cvv: joi.string().required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    type: joi.string().valid("credit", "debit", "both").required()
});
import * as cardRepository from "../repositories/cardRepository.js";
import { decryptSensitiveData, encryptSensitiveData } from "../utils/encryptUtil.js";

export async function create(
    cardData: cardRepository.ICardData
){

    const { userId, title, number, cardHolderName, expirationDate, cvv, password, isVirtual, type } = cardData;

    const titleExists = await cardRepository.findByUserIdAndTitle(userId, title);

    if(titleExists){
        throw {
            type: "error_conflict",
            message: "card already exists, pick another title"
        }
    }

    const encryptCvv = encryptSensitiveData(cvv);
    const encryptPassword = encryptSensitiveData(password);

    await cardRepository.insertCard({
        userId, 
        title, 
        number, 
        cardHolderName, 
        expirationDate, 
        cvv: encryptCvv, 
        password: encryptPassword, 
        isVirtual, 
        type 
    });
    
}

export async function getAll(
    userId: number
){

    const cards = await cardRepository.findAllCards(userId);

    const decryptedCards = cards.map((card) => ({
        ...card,
        cvv: decryptSensitiveData(card.cvv),
        password: decryptSensitiveData(card.password)
    }));

    return decryptedCards;

}

/* export async function getById(
    userId: number, 
    id: number,
    action: string
){

    const card = await cardRepository.findById(id);

    if(!card){
        throw {
            type: "error_not_found",
            message: "card does not exist"
        }
    }

    if(userId !== card.userId){
        throw {
            type: "error_forbidden",
            message: "access denied"
        }
    }

    if(action === "find"){
        return card;
    }

    if(action === "delete"){
        await cardRepository.deletecard(id);
        return;
    }

    throw {
        type: "error_bad_request",
        message: "coundn't proccess request"
    }    

} */
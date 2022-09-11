import * as wifiRepository from "../repositories/wifiRepository.js";
import { decryptSensitiveData, encryptSensitiveData } from "../utils/encryptUtil.js";

export async function create(
    wifiData: wifiRepository.IWifiData
){
    const { userId, title, networkName, password} = wifiData;

    const encryptedPassword = encryptSensitiveData(password);

    await wifiRepository.insertWifi({
        userId,
        title,
        networkName,
        password: encryptedPassword
    });

}

export async function getAll(
    userId: number
){

    const wifis = await wifiRepository.findAllWifis(userId);

    const decryptWifis = wifis.map((wifi) => ({
        ...wifi,
        password: decryptSensitiveData(wifi.password)
    }));

    return decryptWifis;

}

export async function getById(
    userId: number,
    id: number,
    action: string
){

    const wifi = await wifiRepository.findById(id);

    if(!wifi){
        throw {
            type: "error_not_found",
            message: "wifi does not exist"
        }
    }

    if(userId !== wifi.userId){
        throw {
            type: "error_forbidden",
            message: "access denied"
        }
    }

    if(action === "find"){
        return {
            ...wifi, 
            password: decryptSensitiveData(wifi.password)
        }
    }

    if(action === "delete"){
        await wifiRepository.deleteWifi(id);
        return;
    }

    throw {
        type: "error_bad_request",
        message: "coundn't proccess request"
    }    

}
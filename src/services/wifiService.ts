import * as wifiRepository from "../repositories/wifiRepository.js";
import { encryptSensitiveData } from "../utils/encryptUtil.js";

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

}

export async function getById(
    userId: number,
    id: number
){

}
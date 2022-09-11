import { Wifi } from "@prisma/client";
import connection from "../../database/database.js";

export type IWifiData = Omit<Wifi, "id" | "createdAt">;

export async function insertWifi(wifiData: IWifiData){

    const { userId, title, networkName, password} = wifiData;

    await connection.wifi.create({
        data: {
            userId,
            title,
            networkName,
            password
        }
    });

}

export async function findAllWifis(userId: number){

    const result = await connection.wifi.findMany({
        where: { userId }
    });

    return result;

}

export async function findById(id: number){

    const result = await connection.wifi.findFirst({
        where: { id }
    });

    return result;

}

export async function deleteWifi(id: number){

    await connection.wifi.delete({
        where: { id }
    });

}
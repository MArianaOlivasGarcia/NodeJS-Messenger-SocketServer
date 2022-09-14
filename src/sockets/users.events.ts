import { Not } from "typeorm";
import { User } from "../entities/user.entity"



export const userConnected = async ( id: string ) => {
    
    const user = await User.findOneBy({ id });

    if ( ! user ) return null;

    user.isOnline = true;

    await user.save();

    return user;
}




export const userDisconnected = async ( id: string ) => {
    
    const user = await User.findOneBy({ id });

    if ( ! user ) return null;

    user.isOnline = false;

    await user.save();

    return user;
}


export const getAllUsers = async ( id: string ) => {

    const users = await User.find({
        order: {
            isOnline: "DESC", 
        }
    });

    return users;

}
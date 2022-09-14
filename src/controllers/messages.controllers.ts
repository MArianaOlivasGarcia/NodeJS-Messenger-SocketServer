
import { validate } from "class-validator";
import { Response } from "express"
import { CreateMessageDto } from "../dtos";
import { Message } from "../entities/message.entity";
import { User } from "../entities/user.entity";
import { mapErrors } from "../helpers/map-errors.helper";
import { RequestWithUserId } from "../interfaces/request.interface"


export const getChat = async( req: RequestWithUserId, res: Response ) => {

    const id = req.id as string;
    const messagesTo = req.params.to;

    const last30 = await Message.find({
        relations: {
            to: true,
            from: true
        },
        where: [{
            from: { id },
            to: { id: messagesTo },
        },
        {
            from: { id: messagesTo },
            to: { id },
        }],
        take: 30,
        order: {
            created_at: 'ASC'
        }
    })

    res.json({
        status: true,
        last30
    })


}



export const create = async( req: RequestWithUserId, res: Response ) => { 

    const id = req.id;

    const createMessageDto = new CreateMessageDto( req.body );

    const errors = await validate(createMessageDto);

    if ( errors.length > 0 ) {
        return res.status(400).json({ 
            status: false,
            errors: mapErrors(errors) 
        })
    }


    
    const user = await User.findOneBy({ id });

    if ( !user ) {
        return res.status(404).json({
            status: false,
            message: `User with id "${ id }" not found`
        })
    }

    // const message = new Message()
    // message.content = createMessageDto.content;
    // message.to = user;
    // message.from = user; 

    const message = Message.create({
        ...createMessageDto,
        to: user,
        from: user
    })


    await Message.save( message );

    res.json({
        status: true,
        message
    })




} 
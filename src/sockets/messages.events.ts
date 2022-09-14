import { Message } from "../entities/message.entity"
import { User } from "../entities/user.entity"



interface IMessage {
    to: string,
    from: string
    content: string
}

export const addMessage = async( message: IMessage ) => {

    const [to, from] = await Promise.all<any>([
        User.findOneBy({ id: message.to  }),
        User.findOneBy({ id: message.from  })
    ])

    const messagedb: Message = Message.create({
        ...message,
        to,
        from
    })


    return await Message.save( messagedb );

}
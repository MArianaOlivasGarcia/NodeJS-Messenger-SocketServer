
import { DataSource } from 'typeorm';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';


export let AppDataSource: DataSource;

export const dbConnection = async() => {

    try {
        
        AppDataSource = await new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT!,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: [
                User,
                Message
            ],
            // logging: true,
            // solo en desarrollo, en producción no
            // (sincroniza automaricamente las columnas al cambiar la definicion de los esquemas)
            synchronize: true
        }).initialize()


        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - vea logs');
    }


}

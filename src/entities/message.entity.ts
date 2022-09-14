import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";



@Entity({ name: 'messages' })
export class Message extends BaseEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => User, // regresara un User
        {
            cascade: true,
            eager: true // Cada que usemos algún metodo find* se haran las relaciones y obtendremos la data automaticamente
        }
    )
    @JoinColumn()
    from: User;

    @ManyToOne(
        () => User, // regresara un User
        {
            cascade: true,
            eager: true // Cada que usemos algún metodo find* se haran las relaciones y obtendremos la data automaticamente
        }
    )
    @JoinColumn()
    to: User;

    @Column('text')
    content: string;


    @CreateDateColumn()
    created_at: Date;
        
    @UpdateDateColumn()
    updated_at: Date;

}
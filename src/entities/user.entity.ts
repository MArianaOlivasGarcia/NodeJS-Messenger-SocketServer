
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('text')
    fullName: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: true
    })
    password?: string;

    @Column('text', {
        nullable: true
    })
    image?: string;

    @Column('bool',{
        default: false
    })
    isOnline?: boolean


}
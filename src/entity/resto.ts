import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, Length } from 'class-validator';

@Entity()
export class Resto {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nom!: string

    @Column()
    @Length(4)
    secret!: number

    @Column()
    position!: string

    @Column()
    proprietaire!: string

    @Column({ default: 0 })
    likes?: number

    @Column()
    @IsEmail()
    email!: string

    @Column()
    numero!: number
}
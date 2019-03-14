
import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from 'typeorm'
import { IsEmail, Length, validate, IsNotEmpty } from 'class-validator'
import crypto from 'crypto'

@Entity()
export class Client extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 20, unique: true })
    @IsNotEmpty()
    nomUtilisateur!: string

    @Column()
    @IsNotEmpty()
    password!: string

    @Column({ length: 50, unique: true })
    @IsEmail()
    email!: string

    @Column()
    @Length(8, 12)
    @IsNotEmpty()
    numero?: number

    async hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex')
    }

    async verify() {
        let valid = await this.valid(this)
        if (valid != null || undefined)
            return valid
        try {
            await this.save()
            return true
        } catch (err) {
            return false
        }
    }

    async valid(client: Client) {
        let error = await validate(client)
        if (error.length > 0) {
            return error[0].property
        }
    }

    async verifyPassword(password: string) {
        let pass = crypto.createHmac('sha256', password).digest('hex')
        return this.password === pass
    }
}

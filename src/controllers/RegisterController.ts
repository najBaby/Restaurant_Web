import { Client } from '../entity/client'
import { Request, Response } from 'express'



export class RegisterController {

    static registerClient = async (req: Request, res: Response) => {
        let client = new Client
        let { nomUtilisateur, email, password, numero } = req.body
        client.nomUtilisateur = nomUtilisateur
        client.email = email
        client.password = password
        client.numero = numero

        let verify = await client.verify()
        switch (verify) {
            case true:
                res.status(200).send('Success')
            case false:
                res.status(401).send('Cet utilisateur existe déja.')
            default:
                res.status(400).send("Votre " + verify + " n'est pas corrêt.")
                break;
        }
    }
    // static regiisterResto = async (req: Request, res: Response, next: NextFunction) => {
}

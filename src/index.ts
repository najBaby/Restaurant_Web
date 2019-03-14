import express from 'express'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import { RegisterController } from './controllers/RegisterController'

createConnection().then(async () => {
    let app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post('/user', await RegisterController.registerClient)

    app.listen(3000, () => {
        console.log("listening on port:3000")
    })
}).catch(err => console.log('voici l\'erreur %s', err))

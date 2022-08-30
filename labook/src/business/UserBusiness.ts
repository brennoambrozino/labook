import UserData from "../data/UserData"
import User from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { LoginDTO } from "../types/loginDTO"
import { LoginUser } from "../types/loginUser"
import { SignupInputDTO } from "../types/signupInputDTO"

export default class UserBusiness{

    constructor(
        private userData:UserData,
        private idGenerator:IdGenerator,
        private hashManager:HashManager,
        private authenticator:Authenticator
    ){}

    signup = async(input:SignupInputDTO) => {
        // validação
        const {name, email, password} = input
        if(!name || !email || !password) {
            throw new Error("Campos inválidos")
        }

        if(email.indexOf("@") === -1) {
            throw new Error("É necessário conter '@' no email")   
        }

        if(password.length < 6) {
            throw new Error("A senha deve ter no mínimo 6 caracteres")
            
        }

        // conferir se o usuário existe
        const registeredUser = await this.userData.findByEmail(email)
        if(registeredUser){
            throw new Error("Email já cadastrado")
        }

        // criar uma id pro usuario
        const id = this.idGenerator.generateId()

        // hashear o password
        const hashedPassword = await this.hashManager.hash(password)

        // criar o usuario no banco
        const user = new User(
            id, 
            name, 
            email,
            hashedPassword
        )
        await this.userData.insert(user)

        // criar o token
        const token = this.authenticator.generateToken({id})

        // retornar o token
        return token
    }

    login = async(loginDTO: LoginDTO) => {
        const {email, password} = loginDTO

        if(!email || !password) {
            throw new Error("Campos Inválidos")
        }

        const registeredUser = await this.userData.findByEmail(email)

        if(!registeredUser){
            throw new Error("Email inválido")
        }

        const passwordIsCorrect = await this.hashManager.compare(password, registeredUser.getPassword())

        if(!passwordIsCorrect){
            throw new Error("Senha inválida")
        }

        const token = this.authenticator.generateToken({id: registeredUser.getId()})

        return token
    }
}
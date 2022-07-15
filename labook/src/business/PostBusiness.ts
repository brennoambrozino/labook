
import PostData from "../data/PostData"
import Post from "../model/Post"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { authenticationData } from "../types/authData"
import { createInputDTO } from "../types/createInputDTO"
import { getPostDTO } from "../types/getPostDTO"

export default class PostBusiness{

    constructor(
        private postData:PostData,
        private idGenerator:IdGenerator,
        private hashManager:HashManager,
        private authenticator:Authenticator
    ){}

    create = async(input:createInputDTO, token:string) => {
        const {photo, description, type } = input

        if(!photo || !description || !type) {
            throw new Error("Campos inválidos")
        }

        const tokenData:authenticationData = this.authenticator.getTokenData(token)
        const author_id = tokenData.id

        const id:string = this.idGenerator.generateId() 

        const post = new Post(
            id,
            photo,
            description,
            type,
            author_id
        )

        await this.postData.insert(post)

        return id
    }

    get = async(id:string) => {
       const post = await this.postData.findById(id)

       if(!post) {
        throw new Error("Erro ao encontrar o post")
       }

       return post
    }


}
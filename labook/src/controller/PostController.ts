import { Request, Response } from "express"
import PostBusiness from "../business/PostBusiness"
import { createInputDTO } from "../types/createInputDTO"
import { getPostDTO } from "../types/getPostDTO"

export default class PostController {

    constructor(
        private postBusiness: PostBusiness
    ){}

    create = async(req:Request, res:Response) => {
        const {photo, description, type} = req.body
        const input: createInputDTO = {
            photo,
            description,
            type
        }

        const token = req.headers.authorization as string

        try {
            const id = await this.postBusiness.create(input, token)
            res.status(201).send({message: "Post criado com sucesso", id})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro na criação do Post")
        }

    }

    get = async(req:Request, res:Response) => {
        const { id } = req.params
        
        const queryResult:any = await this.postBusiness.get(id)

        const post: getPostDTO = {
            id: queryResult.id,
            photo: queryResult.photo,
            description: queryResult.description,
            type:queryResult.type ,
            createdAt: queryResult.createdAt,
            authorId: queryResult.authorId
        }
        try {
            res.status(200).send({ post })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro ao Localizar o Post")
        }
    }



    
}
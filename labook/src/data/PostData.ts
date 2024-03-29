import Post from "../model/Post"
import { findByIdResponse } from "../types/findByIdResponse"
import { getPostDTO } from "../types/getPostDTO"
import { BaseDataBase } from "./BaseDataBase"

export default class PostData extends BaseDataBase{
    protected TABLE_NAME = "labook_posts"

    insert = async (post: Post) => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(post)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    findById = async(id:string): Promise<getPostDTO | undefined> => {
        try {
            const queryResult: findByIdResponse = await this
            .connection(this.TABLE_NAME)
            .select("*")
            .where( {id} )

            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }
    
}
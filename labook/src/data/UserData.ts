import User from "../model/User"
import { FindByEmailResponse } from "../types/findByEmailResponse"
import { BaseDataBase } from "./BaseDataBase"

export default class UserData extends BaseDataBase{
    protected TABLE_NAME = "labook_users"

    
    insert = async (user: User) => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(user)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    findByEmail = async(email: string):Promise<User | undefined> => {
        try {
            const queryResult:User[] = await this
                .connection(this.TABLE_NAME)
                .select()
                .where({email})
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
import UserData from "../../src/data/UserData"
import User from "../../src/model/User"
import { UserMock } from "./UserMock"

export default class UserDataMock extends UserData {
    protected TABLE_NAME = "table_mock"

    insert = async (user: User) => {
        
    }

    findByEmail = async(email: string) => {
        if(email === "brennoambrozino@gmail.com") {
            return UserMock
        } else {
            return undefined
        }
    }
    
}
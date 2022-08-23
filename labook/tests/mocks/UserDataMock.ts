import { BaseDataBase } from "../../src/data/BaseDataBase"
import UserData from "../../src/data/UserData"
import User from "../../src/model/User"
import { UserMock } from "./UserMock"

export default class UserDataMock extends UserData {
    // protected connection = "connection_mock"
    protected TABLE_NAME = "table_mock"

    
    insert = async (user: User) => {
        
    }

    findByEmail = async(email: string) => {
        if(email === "user1@gmail.com") {
            return UserMock
        } else {
            return undefined
        }
    }
    
}
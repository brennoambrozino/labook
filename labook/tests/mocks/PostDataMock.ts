import PostData from "../../src/data/PostData"
import Post from "../../src/model/Post"
import { PostMock } from "./PostMock"

export default class PostDataMock extends PostData {
    protected TABLE_NAME = "table_mock"

    insert = async (post: Post) => {
        
    }

    findById = async(id: string) => {
        if(id === "id_post_1") {
            return PostMock
        } else {
            return undefined
        }
    }
    
}
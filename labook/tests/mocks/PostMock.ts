import Post from "../../src/model/Post";
import { getPostDTO } from "../../src/types/getPostDTO";
import { POST_TYPES } from "../../src/types/POST_TYPES";

export const PostMock:getPostDTO = {
    id:"id_post_1",
    photo: "https://www.adorocinema.com/personalidades/personalidade-417702/",
    description:"Lady Gaga",
    type: POST_TYPES.NORMAL,
    createdAt: new Date(),
    authorId: "id_user_1"
}
import { POST_TYPES } from "../types/POST_TYPES";

export default class Post{
    constructor(
        private id:string,
        private photo: string,
        private description: string,
        private type: POST_TYPES,
        private author_id: string
    ){}
}
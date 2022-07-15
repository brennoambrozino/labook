import { POST_TYPES } from './POST_TYPES'

export type getPostDTO = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date,
    authorId: string
}
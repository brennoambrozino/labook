import { POST_TYPES } from "./POST_TYPES"

export type createInputDTO = {
    photo:string,
    description:string,
    type:POST_TYPES
}
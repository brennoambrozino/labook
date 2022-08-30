import PostBusiness from "../src/business/PostBusiness";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { HashManagerMock } from "./mocks/HashManagerMock"
import PostDataMock from "./mocks/PostDataMock";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { createInputDTO } from "../src/types/createInputDTO";
import { POST_TYPES } from "../src/types/POST_TYPES";
import { PostMock } from "./mocks/PostMock";

const PostBusinessMock = new PostBusiness(
    new PostDataMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
)

describe("Testando o Create", () => {
    test("Deve retornar erro quando o campo 'photo' estiver vazio", async () => {
        try {
            const input: createInputDTO = {  
                    photo: "",
                    description: "Lady Gaga",
                    type: POST_TYPES.NORMAL,
        }
            const token = "token"
            await PostBusinessMock.create(input, token)
        } catch (error: any) {
            expect(error.message).toEqual("Campos inválidos")
        } finally {
            expect.assertions(1)
        }
    })

    test("Deve retornar erro se o 'token' for inválido", async () => {
        try {
            const input: createInputDTO = {  
                    photo: "https://www.adorocinema.com/personalidades/personalidade-417702/",
                    description: "Lady Gaga",
                    type: POST_TYPES.NORMAL,
        }
            const token = "token2"
            await PostBusinessMock.create(input, token)
        } catch (error: any) {
            expect(error.message).toEqual("Token Inválido")
        } finally {
            expect.assertions(1)
        }
    } )

    test("Sucesso na criação do Post e vereificação de token", async() => {
        try {
            const input: createInputDTO = {
                photo: "https://www.adorocinema.com/personalidades/personalidade-417702/",
                    description: "Lady Gaga",
                    type: POST_TYPES.NORMAL,
            }
            const token = "token"
            const id = await PostBusinessMock.create(input, token)
            expect(id).toEqual("id")
        } catch (error:any) {
        } finally {
            expect.assertions(1)
        }
    } )
})

describe("Testando o get", () => {
    test("Deve retornar erro se o 'id' for inválido", async() => {
        try {
            const id = "id_post_2"
            await PostBusinessMock.get(id)
        } catch (error: any) {
            expect(error.message).toEqual("Erro ao encontrar o post, verifique se o 'id' do post está correto")
        } finally {
            expect.assertions(1)
        }
    })
    test("Sucesso na requisição do Post", async() => {
        try {
            const id = "id_post_1"
            const post = await PostBusinessMock.get(id)
            expect(post).toEqual(PostMock)
        } catch (error: any) {
        } finally {
            expect.assertions(1)
        }
    })
})
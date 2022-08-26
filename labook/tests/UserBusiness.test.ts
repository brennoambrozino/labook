import UserBusiness from "../src/business/UserBusiness";
import { LoginDTO } from "../src/types/loginDTO";
import { SignupInputDTO } from "../src/types/signupInputDTO";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { HashManagerMock } from "./mocks/HashManagerMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import UserDataMock from "./mocks/UserDataMock";

const userBusinessMock = new UserBusiness (
    new UserDataMock(), // as UserDataBase
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
)

describe("Testando o Sign Up", () => {
    test("Deve retornar erro quando o nome está vazio", async () => {
        try {
            const input: SignupInputDTO = {
                name: "", 
                email: "brennoambrozino@gmail.com",
                password:"123456"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("Campos inválidos")
        } finally {
            expect.assertions(1)
        }
    })

    test("Deve retornar erro quando email for inválido", async () => {
        try {
            const input: SignupInputDTO = {
                name: "brenno", 
                email: "brennoambrozinogmail.com",
                password:"123456"
            }
            await userBusinessMock.signup(input)
        } catch (error:any) {
            expect(error.message).toEqual("É necessário conter '@' no email")
        } finally {
            expect.assertions(1)
        }
    })

    test("Deve retornar erro quando a senha for inválida", async () => {
        try {
            const input: SignupInputDTO = {
                name: "brenno", 
                email: "brennoambrozino@gmail.com",
                password:"12345"
            }
            await userBusinessMock.signup(input)
        } catch (error:any) {
            expect(error.message).toEqual("A senha deve ter no mínimo 6 caracteres")
        } finally {
            expect.assertions(1)
        }
    })

    test("Sucesso no cadastro e verificação de token", async () => {
        try {
            const input: SignupInputDTO = {
                name: "brenno", 
                email: "brenno@gmail.com",
                password:"123456"
            }
            const accessToken = await userBusinessMock.signup(input)
            expect(accessToken).toEqual("token") 
        } catch (error:any) {
            console.log(error)
        } finally {
            expect.assertions(1)
        }
    })
})

describe("Testando o Login", () => {
    test("Deve retornar erro quando o email for inválido", async () => {
        try {
            const input: LoginDTO = {
                email: "brenno@gmail.com",
                password: "123456"
            }
            await userBusinessMock.login(input)
        } catch (error:any) {
            expect(error.message).toEqual("Email inválido")
        } finally {
            expect.assertions(1)
        }
    })

    test("Deve retornar erro quando a senha for inválida", async() => {
        try {
            const input: LoginDTO = {
                email: "brennoambrozino@gmail.com",
                password: "12345678"
            }
            await userBusinessMock.login(input)
        } catch (error:any) {
            expect(error.message).toEqual("Senha inválida")
        } finally {
            expect.assertions(1)
        }
    })

    test("Sucesso no Login e verificação do token de acesso", async() => {
        try {
            const input: LoginDTO = {
                email: "brennoambrozino@gmail.com",
                password: "123456"
            } 

            const token = await userBusinessMock.login(input)
            console.log(token)
            expect(token).toEqual("token")
        } catch (error:any) {
            console.log(error)
        } finally {
            expect.assertions(1)
        }
    })
})

import { authenticationData } from "../../src/types/authData"

export class AuthenticatorMock {

    generateToken = (
        payload: authenticationData
    ): string => {
        return "token"
    }

    getTokenData = (
        token:string
    ): authenticationData => {
        return {
            id: "id_mock"
        }
    }
}
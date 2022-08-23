export class HashManagerMock {
    hash = async (plainText: string): Promise<string> => {
        return "hash"
    }

    compare = async (plainText:string, cypherText:string): Promise<boolean> => {
        return plainText === cypherText
    }
}
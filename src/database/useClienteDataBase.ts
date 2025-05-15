import {useSQLiteContext} from 'expo-sqlite';

export type ClienteDatabase = {
    id: number
    nome: string
    telefone: string
    endereco: string
}

export function useClienteDataBase(){
    const dataBase = useSQLiteContext()//Acessar todos os mt do BD

    async function create(data:Omit<ClienteDatabase, "id">) {
        const statement = await dataBase.prepareAsync(
            "insert into pessoa(nome,telefone,endereco) values($nome, $telefone, $endereco)"
        )//interpolação

        try {
            const result = await statement.executeAsync({
                $nome: data.nome,
                $telefone: data.telefone,
                $endereco: data.endereco
            })

            //ultimo id
            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}

        } catch (error) {
            throw error
        }finally{
            await statement.finalizeAsync()
        }
    }//create


    async function consultar(nome:string) {
        try {
            const query = "select * from pessoa where like ?" //? serve para subisituir 
            const response = await dataBase.getAllAsync<ClienteDatabase>(query,`% ${nome} %`)
        } catch (error) {
            throw error
        }
    }


    return {create, consultar}
}
import {useSQLiteContext} from 'expo-sqlite';

export type ClienteDataBase = {
    id: number
    nome: string
    telefone: string
    endereco: string
}//Criando o local de variáveis do Banco

export function useClienteDataBase(){
    const dataBase = useSQLiteContext()//Acessar todos os mt do BD

    async function create(data:Omit<ClienteDataBase, "id">) {
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
            const query = "select * from pessoa where nome like ?"
            const response = await dataBase.getAllAsync<ClienteDataBase>(query,`%${nome}%`)
            return response
        } catch (error) {
            throw error
        }
    }

    async function remove(id:number) {
        try {
            await dataBase.execAsync("Delete from pessoa where id = " + id)
        } catch (error) {
            throw (error)
        }
    }

    async function atualizar(data:ClienteDataBase) {
        const statement = await dataBase.prepareAsync(

            "update pessoa set nome = $nome, telefone = $telefone, endereco = $endereco where id = $id"
            )
        try {
                await statement.executeAsync({
                    $id: data.id,
                    $nome: data.nome,
                    $telefone: data.telefone,
                    $endereco: data.endereco,
                })
        } catch (error) {
            throw error
        }finally{
            await statement.finalizeAsync()
        }
    }

    return {create, consultar, remove, atualizar}
}
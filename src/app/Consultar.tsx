
import {View, Text, StyleSheet, Button, Alert, FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import {Campos} from '@/components/Campos';
import {Cliente} from '@/components/Cliente';
import { ClienteDatabase, useClienteDataBase } from '@/database/useClienteDataBase';

import {useNavigation} from 'expo-router';

export default function Consultar(){
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [busca, setBusca] = useState("")
    const [cliente, setCliente] = useState<ClienteDatabase[]>()
    const clienteDatabase = useClienteDataBase()

    const navigation = useNavigation()


    async function list() {
        try {
            const response = await clienteDatabase.consultar(busca)
            setCliente(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function details(item:ClienteDatabase) {
        setId(String(item.id))
        setNome(item.nome)
        setTelefone(item.telefone)
        setEndereco(item.endereco)
    }

    //carrega a lista
    useEffect(() => {list()}, [busca])
    return (
        <View style={styles.container}>
            <Campos placeholder='Pesquisar' onChangeText={setBusca} />
            
            <FlatList
                data={cliente}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item})=> <Cliente data={item}/>}
                contentContainerStyle={{gap:16}}
            />
            <Button title='Voltar' onPress={() => navigation.navigate('Index')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        backgroundColor: "#898989",
        alignItems: "center",
    },
});
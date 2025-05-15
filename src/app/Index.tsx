
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {useState} from 'react';
import {Campos} from '@/components/Campos';
import { ClienteDatabase, useClienteDataBase } from '@/database/useClienteDataBase';

import {useNavigation} from 'expo-router'

export default function Index(){
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cliente, setCliente] = useState<ClienteDatabase[]>()
    const clienteDatabase = useClienteDataBase();

    const navigation = useNavigation()

    async function create() {
        try{
            const response = await clienteDatabase.create({
                nome,telefone,endereco
            })
            Alert.alert("Cliente cadastrado com sucesso! ID: " + response.insertedRowId)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Campos placeholder='Nome' onChangeText={setNome} value={nome}/>
            <Campos placeholder='Telefone' onChangeText={setTelefone} value={telefone}/>
            <Campos placeholder='Endereco' onChangeText={setEndereco} value={endereco}/>
            <Button title="Cadastrar" onPress={create}/>
            <Button title='Consultar' onPress={() => navigation.navigate("Consultar")}/>
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
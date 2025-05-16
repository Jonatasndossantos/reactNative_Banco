
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {useState} from 'react';
import {Campo} from '@/components/Campos';
import { ClienteDataBase, useClienteDataBase } from '@/database/useClienteDataBase';

import {useNavigation} from 'expo-router'

export default function Index(){
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cliente, setCliente] = useState<ClienteDataBase[]>()
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
            <Campo placeholder='Nome' onChangeText={setNome} value={nome}/>
            <Campo placeholder='Telefone' onChangeText={setTelefone} value={telefone}/>
            <Campo placeholder='Endereco' onChangeText={setEndereco} value={endereco}/>
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
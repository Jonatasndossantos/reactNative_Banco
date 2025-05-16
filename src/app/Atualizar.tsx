
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {Campo} from '@/components/Campos';
import { ClienteDataBase, useClienteDataBase } from '@/database/useClienteDataBase';
import {useRoute} from '@react-navigation/native'
import {useNavigation} from 'expo-router'

export default function Atualizar(){
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cliente, setCliente] = useState<ClienteDataBase[]>()
    const clienteDataBase = useClienteDataBase()
    const route = useRoute()
    const navigation = useNavigation()
    const { item } = route.params

    useEffect(() => {
        if(item){
            setId(item.id.toString())
            setNome(item.nome)
            setTelefone(item.telefone)
            setEndereco(item.endereco)
        }
    }, [])


    async function atualizar() {
        try {
            await clienteDataBase.atualizar({
                id: Number(id),
                nome,
                telefone,
                endereco
            })

            Alert.alert(
                "sucesso!",
                "Dados do Cliente atuaizados com sucesso",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Consultar")
                    },
                ],
                {cancelable: false}
            )
        } catch (error) {
            console.log(error)
        }
    }

    async function salvarAtualizacao(){
        try {
            if(id){
                await atualizar()
            }
        } catch (error) {
            console.log(error)
        }
        setId("")
        setNome("")
        setTelefone("")
        setEndereco("")
    }

    return (
        <View style={styles.container}>
            <Campo placeholder='Nome' onChangeText={setNome} value={nome}/>
            <Campo placeholder='Telefone' onChangeText={setTelefone} value={telefone}/>
            <Campo placeholder='Endereco' onChangeText={setEndereco} value={endereco}/>
            <Button title="Atualizar" onPress={salvarAtualizacao}/>
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
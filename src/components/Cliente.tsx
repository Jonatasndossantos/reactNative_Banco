import {View, PressableProps, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

type Props = PressableProps & {
    data:{
        id: string
        nome: string
        telefone: string
        endereco: string
    }
    onDelete: () => void
    onEditar: () => void
}

export function Cliente({ data, onDelete, onEditar, ...rest}:Props){
    return(
        <View>

            <Pressable style={styles.fundo} {...rest}>
                <Text style={styles.texto}>
                    {data.id} - {data.nome} - {data.telefone} - {data.endereco}
                </Text>

                <TouchableOpacity onPress={onEditar}>
                    <MaterialIcons name='edit' size={24} color="#3232aa"/>
                </TouchableOpacity>


                <TouchableOpacity onPress={onDelete}>
                    <MaterialIcons name='delete' size={24} color="red"/>  
                </TouchableOpacity>

            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        marginLeft: 20,
        marginRight: 20,
    },
    fundo:{
        backgroundColor: "#cecece",
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
    },
});
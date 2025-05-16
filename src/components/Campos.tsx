import {View, TextInput, TextInputProps, StyleSheet} from 'react-native';

export function Campo({...rest}:TextInputProps){
    return(
        <View>
            <TextInput style={styles.cmp} {...rest}/>
        </View>
    );
}

const styles = StyleSheet.create({
    cmp:{
        width: 300,
        borderRadius: 20,
        backgroundColor: "#fff",
        margin: 10,
    },
})
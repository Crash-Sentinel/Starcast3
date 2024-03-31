import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    pressable: {
        borderWidth:2,
        borderColor:'black',
        borderRadius:5,
        backgroundColor:'white',
    },
    textCenterAlign: {
        textAlign:'center',
    },
    bold: {
        fontWeight:'bold',
    },
    header: {
        backgroundColor: "white",
        height: 60,
        justifyContent: "center",
        alignItems: 'center',
        borderColor: "lightgray",
        borderWidth:1,
    }
});
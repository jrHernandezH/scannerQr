import { StyleSheet } from "react-native";
export const stylesCamera = StyleSheet.create({
    text: {
        fontSize: 18,
        margin: 16,
        textAlign: 'center',
    },
    barcodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
    },
    scanner: {
        height: 400,
        width: 400,
    },
});
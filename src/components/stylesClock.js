import { StyleSheet } from 'react-native';

export const stylesClock = StyleSheet.create({
    clockContainer: {
        backgroundColor: '#f1f1f1',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#f2f2f2",
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    digitalClock: {
        fontSize: 24,
        fontFamily: 'monospace',
    },
    textC:{
        paddingHorizontal: '10%',
        marginVertical:10,
        color:'#0f02aa',
        fontSize: 20,
        fontFamily: 'monospace'
    }
});
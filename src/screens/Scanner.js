import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

//componentes
import Clock from '../components/Clock';
//controladores
import { requestCameraPermission } from '../controller/permissionsCam.controller';
//estilos
import { stylesCamera } from './styleScann.js';

function Scanner() {
    const [text, setText] = useState('Escanea un código');
    const [scanned, setScanned] = useState(false);
    const [scannedText, setScannedText] = useState(null);


    useEffect(() => {
        (async () => {
            await requestCameraPermission();
        });
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setText(`Código escaneado: ${data}`);
        setScannedText(data);
    };

    return (
        <View style={stylesCamera.barcodeBox}>
            {scanned ? (
                <Clock
                onCountdownComplete={() => setScanned(false)}
                scannedText={scannedText}
              />
            ) : (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={stylesCamera.scanner}
                />
            )}
        </View>
    );
}

export default Scanner;

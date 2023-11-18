import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { stylesClock } from './stylesClock';
import { formatTime } from '../controller/temporisator';

function Clock({ onCountdownComplete, scannedText }) {
    const [countdown, setCountdown] = useState(900);
    const [isRequestSent, setIsRequestSent] = useState(false);
    let timer;

    const requestApi = () => {
        fetch('https://send-message-production.up.railway.app/enviar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({coleccion: scannedText })
        })
            .then(response => {
                if (response.ok) {
                    setIsRequestSent(true);
                } else {
                    onCountdownComplete();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert('Error', 'Hubo un error en la solicitud', [
                    {
                        text: 'Aceptar',
                        onPress: () => {
                            onCountdownComplete();
                        },
                    },
                ]);
            });
    };

    useEffect(() => {
        requestApi();
    }, []);

    useEffect(() => {
        if (isRequestSent) {
            let timer = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown > 0) {
                        return prevCountdown - 1;
                    } else {
                        clearInterval(timer);
                        // Retrasar la llamada a setScanned(false) en 1 segundo
                        setTimeout(() => {
                            onCountdownComplete();
                        }, 1000);
                        return 0;
                    }
                });
            }, 1000);
        }
    }, [onCountdownComplete, isRequestSent]);


    return (
        <View style={stylesClock.clockContainer}>
            <Text style={stylesClock.digitalClock}>{formatTime(countdown)}</Text>
            <Text style={stylesClock.textC}>Los alumnos deberan de llegar en este tiempo </Text>
        </View>
    );
}

export default Clock;

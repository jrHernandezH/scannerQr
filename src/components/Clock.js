import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { stylesClock } from './stylesClock';
import { formatTime } from '../controller/temporisator';

function Clock({ onCountdownComplete }) {
    const [countdown, setCountdown] = useState(12);
    const [isRequestSent, setIsRequestSent] = useState(false);
    let timer;

    const requestApi = () => {
        fetch('http://172.16.0.219:3000/enviar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: 'fmYEJXf0Tmysyy4xYTj2Jf:APA91bGEXnQYcpQzNRzziyv3xncyaAL3ivp2vSIXpvKlswSiDsutoHWvzvtPGIay6R0QfV11gx2y0eI2Rt_FezTHu11BTAUjuNocDVjJ9YlTvLTb_s10CNgO-LbsTO_0EDglFBc3rbuh', mensaje: "hola" })
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
        </View>
    );
}

export default Clock;

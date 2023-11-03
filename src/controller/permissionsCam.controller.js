import { BarCodeScanner } from 'expo-barcode-scanner';

export const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('Permisos de cámara no otorgados');
    }
};

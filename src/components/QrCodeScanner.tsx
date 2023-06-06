import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native';

interface Props {
    setIsScanning: (e: boolean) => void;
}

export default function QrCodeScanner(props: Props) {
    const [hasPermisson, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        }

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        alert(`Bar code with ${type} and ${data} has been scanned!`);
    }

    if (hasPermisson === null) return <Text>Requesting for camera permission</Text>;
    if (hasPermisson === false) return <Text>No access to camera</Text>;

    return (
        <View
            style={{ ...styles.container, ...StyleSheet.absoluteFillObject }}
        >
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.qrCodeScanner}
            />
            <Button 
                title='Cancelar' 
                onPress={() => { props.setIsScanning(false) }}                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000"
    },
    qrCodeScanner: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
import { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';

import { MaterialIcons } from '@expo/vector-icons';

import Header from '../components/Header';
import QrCodeScanner from '../components/QrCodeScanner';

export default function Home() {
    const [isScanning, setIsScanning] = useState(false);

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            <Header
                setIsScanning={setIsScanning}
            />
            <View style={styles.content}>
                <TouchableOpacity style={styles.locationContainer}>
                    <MaterialIcons name="my-location" size={20} color="#717171" />
                    {/* <Text style={styles.title}>Habilitar localização para encontrar jogos próximos</Text> */}
                    <Text style={styles.title}>{text}</Text>
                </TouchableOpacity>
            </View>

            {isScanning && <QrCodeScanner setIsScanning={setIsScanning} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    content: {
        paddingHorizontal: 32,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginTop: 58,
    },
    title: {
        fontFamily: 'Inter500',
        color: "#717171",
        fontSize: 14,
    }
})
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    setIsScanning: (e: boolean) => void;
}

export default function Header(props: Props) {
    return (
        <View style={styles.header}>
            <Image
                source={require('../../assets/logo-header.png')}
            />
            <View style={styles.headerItems}>
                <TouchableOpacity onPress={() => { props.setIsScanning(true) }}>
                    <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={24}
                        color="#717171"
                    />
                </TouchableOpacity>
                <MaterialCommunityIcons name="menu" size={24} color="#717171" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        padding: 16,
    },
    headerItems: {
        flexDirection: 'row',
        columnGap: 24,
    }
})
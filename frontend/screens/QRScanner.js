import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRScanner = ({ navigation }) => {
    const handleScan = (e) => {
        const { data } = e;
        const params = new URLSearchParams(data.split('?')[1]);
        const restaurantId = params.get('restaurantId');
        const tableNumber = params.get('table');
        navigation.navigate('Menu', { restaurantId, tableNumber });
    };

    return (
        <View style={styles.container}>
            <QRCodeScanner onRead={handleScan} />
            <Text>Scan a QR code to begin</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default QRScanner;

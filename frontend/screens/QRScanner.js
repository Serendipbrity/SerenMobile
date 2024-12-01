// screens/QRScanner.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRScanner = ({ navigation }) => {
  const handleScan = (e) => {
    const data = JSON.parse(e.data); // Assuming QR code returns JSON with restaurantId
    navigation.navigate('Menu', { restaurantId: data.restaurantId });
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner onRead={handleScan} />
      <Text>Scan a QR code to get started.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default QRScanner;

// screens/QRScanner.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRScanner = ({ navigation }) => {
    const handleScan = (e) => {
        try {
          const data = JSON.parse(e.data); // Parse the scanned data as JSON
          if (data.franchiseId && data.locationId) {
            navigation.navigate('Menu', {
              franchiseId: data.franchiseId,
              locationId: data.locationId
            });
          } else {
            console.error('Invalid QR code format: Missing franchiseId or locationId');
          }
        } catch (err) {
          console.error('Error parsing scanned QR code:', err.message);
        }
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

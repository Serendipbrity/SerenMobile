import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const Menu = ({ route }) => {
    const { restaurantId, tableNumber } = route.params;
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`https://yourapi.com/api/restaurant/${restaurantId}/menu`);
                setMenu(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        fetchMenu();
    }, [restaurantId]);

    return (
        <View style={styles.container}>
            <Text>Table: {tableNumber}</Text>
            <FlatList
                data={menu}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.name} - ${item.price}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
});

export default Menu;

import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SHIPMENTS, MARK_ALL } from '../constants/stringConstants';
import { useAuthStore } from '../store/useAuthStore';

const Header = () => {
    const { markAll, markedAllSelected, filteredShipments, filters, applyFilter } = useAuthStore();
    return (
        <View style={styles.container}>
            <Text style={styles.shipmentsTextStyle}>{SHIPMENTS}</Text>
            {!filteredShipments.length && filters.length === 0 ? <Pressable style={styles.rowContainer} onPress={markAll}>
                <FastImage
                    source={markedAllSelected ? require('../assets/images/checkedBox.png') : require('../assets/images/checkbox.png')}
                    style={styles.imageStyle}
                    resizeMode='contain'
                />
                <Text style={styles.markAllTextStyle}>{MARK_ALL}</Text>
            </Pressable>
                :
                <></>}
            {filters.length > 0 ?
                <Pressable onPress={() => applyFilter([])}>
                    <Text style={styles.clearAllTextStyle}>Clear All</Text>
                </Pressable>
                :
                <></>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 36,
        marginBottom: 6
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyle: {
        height: 20,
        width: 20,
        marginRight: 8
    },
    markAllTextStyle: {
        fontSize: 18,
        color: '#2F50C1'
    },
    shipmentsTextStyle: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600'
    },
    clearAllTextStyle: {
        fontSize: 14,
        color: '#2F50C1'
    }
})

export default memo(Header);

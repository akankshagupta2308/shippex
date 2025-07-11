import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HELLO, NO_SHIPMENT_FOUND } from '../../constants/stringConstants';
import ShipmentCard from '../../components/ShipmentCard';
import Header from '../../components/Header';
import FilterModal from '../../components/FilterModal';
import { useAuthStore } from '../../store/useAuthStore';

const HomeScreen = () => {
    const [searchedAWB, setSearchedAWB] = useState('');
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const { userData, shipments, fetchShipments, isLoading, onSearch, filteredShipments, filters } = useAuthStore();

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    useEffect(() => {
        fetchShipments(userData?.token);
    }, [fetchShipments, userData?.token])

    const listEmptyComponent = useMemo(() => {
        return (
            isLoading ? <View style={styles.centerStyle}>
                <ActivityIndicator size={24} color={'#58536E'} />
            </View> : <Text style={styles.interTextStyle}>{NO_SHIPMENT_FOUND}</Text>
        )
    }, [isLoading])

    const onSearchAWB = () => {
        onSearch(searchedAWB);
    }

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView />
            <View style={styles.header}>
                <FastImage
                    source={require('../../assets/images/persona.png')}
                    style={styles.personaImageStyle}
                    resizeMode='contain'
                />
                <FastImage
                    source={require('../../assets/images/full-logo-blue.png')}
                    style={styles.headerImageStyle}
                    resizeMode='contain'
                />
                <FastImage
                    source={require('../../assets/images/bell.png')}
                    style={styles.bellLogoImageStyle}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.profileContainer}>
                <Text style={styles.interTextStyle}>{HELLO}</Text>
                <Text style={styles.nameTextStyle}>{userData?.name}</Text>
            </View>
            <View style={styles.searchContainer}>
                <FastImage
                    source={require('../../assets/images/search.png')}
                    style={styles.iconStyle}
                    resizeMode='contain'
                />

                <TextInput
                    value={searchedAWB}
                    onChangeText={(text) => setSearchedAWB(text)}
                    style={styles.searchInputStyle}
                    placeholder='Search by AWB number'
                    placeholderTextColor={'#A7A3B3'}
                    onSubmitEditing={onSearchAWB}
                    onBlur={onSearchAWB}
                />
            </View>
            <View style={styles.rowContainer}>
                <Pressable style={styles.filtersActionButtonStyle} onPress={() => setIsModalVisible(true)}>

                    <FastImage
                        source={require('../../assets/images/filter.png')}
                        style={styles.iconStyle}
                        resizeMode='contain'
                    />
                    <Text style={styles.actionButtonTextStyle}>Filters</Text>
                    {filters.length  ?
                        <Text style={styles.filterNumberTextStyle}>{filters.length}</Text>
                        :
                        <></>
                    }

                </Pressable>
                <View style={styles.scanActionButtonStyle}>

                    <FastImage
                        source={require('../../assets/images/add-scan.png')}
                        style={styles.iconStyle}
                        resizeMode='contain'
                    />
                    <Text style={styles.addScanTextStyle}>Add Scan</Text>

                </View>
            </View>
            <Header />
            <FlatList
                keyExtractor={item => item.id}
                data={filteredShipments.length ? filteredShipments : shipments}
                renderItem={({ item, index }) => <ShipmentCard data={item} index={index} />}
                contentContainerStyle={styles.listStyle}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={listEmptyComponent}
            />

            <FilterModal
                isModalVisible={isModalVisible}
                closeModal={handleModal}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16
    },
    interTextStyle: {
        fontSize: 14,
        color: '#000000'
    },
    nameTextStyle: {
        fontSize: 28,
        color: '#000000'
    },
    actionButtonTextStyle: {
        fontSize: 16,
        color: '#58536E'
    },
    addScanTextStyle: {
        fontSize: 16,
        color: '#FFFFFF'
    },
    profileContainer: {
        marginVertical: 20
    },
    headerImageStyle: {
        width: 92,
        height: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bellLogoImageStyle: {
        height: 40,
        width: 40
    },
    filtersActionButtonStyle: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F4F2F8',
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center'
    },
    scanActionButtonStyle: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2F50C1',
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 10,
        justifyContent: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    iconStyle: {
        width: 24,
        height: 24,
        marginRight: 8
    },
    listStyle: {
        paddingBottom: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F2F8',
        borderRadius: 10,
        height: 44,
        paddingHorizontal: 12
    },
    searchInputStyle: {
        flex: 1,
        color: '#2F50C1'
    },
    centerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    personaImageStyle: {
        width: 40,
        height: 40,
    },
    filterNumberTextStyle: {
        fontSize: 10,
        color: '#58536E',
        borderColor: '#58536E',
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        textAlign: 'center',
        marginLeft: 6,
        fontWeight: '500'
    }
})

export default HomeScreen;
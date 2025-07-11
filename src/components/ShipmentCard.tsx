import React, { useState, memo } from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AWB, CALL, DESTINATION, ORIGIN, WHATSAPP } from '../constants/stringConstants';
import { Shipment, useAuthStore } from '../store/useAuthStore';
import { getStatusColor } from '../utills/commonUtils';


const ShipmentCard = ({ data, index }: { data: Shipment, index: number }) => {
    const [openExpandedView, setOpenExpandedView] = useState(false);
    const { toggleSelectShipment } = useAuthStore();
    const {
        id,
        awbNumber,
        status,
        sender,
        receiver,
        fromAddress,
        toAddress,
        isSelected,
        callNumber,
        whatsappNumber
    } = data;

    const onPressCard = () => {
        setOpenExpandedView(!openExpandedView);
    }

    const onPressWAButton = () => {
        const message = 'Hello from Shippex app!';
        const url = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
        Linking.openURL(url)
            .then(data => {
                console.log('WhatsApp Opened successfully', data);
            })
            .catch(() => {
                Alert.alert('Make sure WhatsApp is installed on your device.');
            });
    }

    const onPressCallButton = () => {
        const callUrl = `tel:${callNumber}`;
        Linking.openURL(callUrl)
            .then(data => {
                console.log('WhatsApp Opened successfully', data);
            })
            .catch(() => {
                Alert.alert('Make sure WhatsApp is installed on your device.');
            });
    }

    return (
        <Pressable onPress={onPressCard} key={id}>
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Pressable hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => toggleSelectShipment(index)}>
                        <FastImage
                            source={isSelected ? require('../assets/images/checkedBox.png') : require('../assets/images/checkbox.png')}
                            style={styles.checkBoxStyle}
                            resizeMode='contain'
                        />
                    </Pressable>
                    <FastImage
                        source={require('../assets/images/shipment-box.png')}
                        style={styles.shipmentBoxImageStyle}
                        resizeMode='contain'
                    />
                    <View style={styles.shipmentContainer}>
                        <Text style={styles.awbTextStyle}>{AWB}</Text>
                        <Text style={styles.awbNumberTextStyle}>{awbNumber}</Text>
                        <View style={styles.shipmentInfoStyle}>
                            <Text style={styles.nameTextstyle}>{sender}</Text>
                            <FastImage
                                source={require('../assets/images/arrow-icon.png')}
                                style={styles.iconStyle}
                                resizeMode='contain'
                            />
                            <Text style={styles.nameTextstyle}>{receiver}</Text>
                        </View>
                    </View>
                    <View style={[styles.statusContainer, { backgroundColor: getStatusColor(status).bgColor }]}>
                        <Text style={{ color: getStatusColor(status).textColor }} >{status}</Text>
                    </View>
                    <FastImage
                        source={openExpandedView ? require('../assets/images/selected-arrow.png') : require('../assets/images/arrow.png')}
                        style={styles.arrowImageStyle}
                        resizeMode='contain'
                    />
                </View>
                {openExpandedView ?
                    <View style={styles.expandedViewStyle}>
                        <View style={styles.rowContainer}>
                            <View>
                                <Text style={styles.addressTextStyle}>{ORIGIN}</Text>
                                <Text style={styles.boldNameTextStyle}>{sender}</Text>
                                <Text style={styles.addressFullTextStyle} numberOfLines={1}>{fromAddress}</Text>
                            </View>
                            <FastImage
                                source={require('../assets/images/arrow-icon.png')}
                                style={styles.arrowIconStyle}
                                resizeMode='contain'
                            />
                            <View>
                                <Text style={styles.addressTextStyle}>{DESTINATION}</Text>
                                <Text style={styles.boldNameTextStyle}>{receiver}</Text>
                                <Text style={styles.addressFullTextStyle} numberOfLines={1}>{toAddress}</Text>
                            </View>
                        </View>

                        <View style={styles.rowEndContainer}>
                            <Pressable style={styles.callButtonStyle} onPress={onPressCallButton}>
                                <Text style={styles.buttonTextStyle}>{CALL}</Text>
                            </Pressable>
                            <Pressable style={styles.waButtonStyle} onPress={onPressWAButton}>
                                <Text style={styles.buttonTextStyle}>{WHATSAPP}</Text>
                            </Pressable>
                        </View>
                    </View>
                    :
                    <></>

                }
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        borderRadius: 10,
        paddingVertical: 12,
        backgroundColor: '#F4F2F8',
        marginTop: 10,
    },
    checkBoxStyle: {
        width: 20,
        height: 20
    },
    shipmentBoxImageStyle: {
        width: 40,
        height: 40,
        marginLeft: 14
    },
    awbTextStyle: {
        color: '#3F395C',
        fontSize: 13
    },
    awbNumberTextStyle: {
        fontWeight: '600',
        fontSize: 18,
        color: '#000000'
    },
    nameTextstyle: {
        color: '#757281',
        fontSize: 13
    },
    iconStyle: {
        width: 10,
        height: 10,
        marginHorizontal: 4,
        marginTop: 2
    },
    shipmentInfoStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shipmentContainer: {
        marginLeft: 14,
        width: 150,

    },
    statusContainer: {
        padding: 4,
        paddingHorizontal: 6,
        borderRadius: 4,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    arrowImageStyle: {
        width: 24,
        height: 24,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12
    },
    arrowIconStyle: {
        width: 24,
        height: 24
    },
    callButtonStyle: {
        width: 100,
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#6E91EC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    waButtonStyle: {
        width: 100,
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#25D366',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12
    },
    rowEndContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 24
    },
    expandedViewStyle: {
        borderColor: 'white',
        borderTopWidth: 2,
        borderStyle: 'dashed',
        paddingVertical: 10,
        marginTop: 10,
        backgroundColor: '#f4f2f880',

    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 16
    },
    addressTextStyle: {
         color: '#2F50C1',
        fontSize: 11
    },
    boldNameTextStyle: {
        color: '#000000',
        fontSize: 16
    },
    addressFullTextStyle: {
        color: '#58536E',
        fontSize: 13
    }
})

export default memo(ShipmentCard);
import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, Extrapolate } from 'react-native-reanimated';
import { LOGIN } from '../constants/stringConstants';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';

const SplashScreen = () => {
    const navigation = useNavigation();

    const transformAnimatedValue = useSharedValue(0);
    const logoAnimatedValue = useSharedValue(0);
    const backgroundAnimatedValue = useSharedValue('white');
    const fullLogoAnimatedValue = useSharedValue(0);
    const { userData } = useAuthStore();

    useEffect(() => {
        if(userData?.token) {
            navigation.navigate('tabs');
        }
    },[navigation, userData?.token])

    useEffect(() => {
        logoAnimatedValue.value = withTiming(1, { duration: 1000 }, () => {
            transformAnimatedValue.value = withTiming(1, { duration: 1000 });
            backgroundAnimatedValue.value = withTiming('#2F50C1', { duration: 1000 }, () => {
                fullLogoAnimatedValue.value = withTiming(1, { duration: 500 });
            })
        });
    }, [backgroundAnimatedValue, fullLogoAnimatedValue, logoAnimatedValue, transformAnimatedValue]);


    const topLogoAnimatedStyle = useAnimatedStyle(() => {
        const transformY = interpolate(
            transformAnimatedValue.value,
            [0, 1], // Input range (e.g., pan distance)
            [0, -200],  // Output range (e.g., rotation in degrees)
            Extrapolate.CLAMP // Clamps the output within the defined range
        );

        const transformX = interpolate(
            transformAnimatedValue.value,
            [0, 1], // Input range (e.g., pan distance)
            [0, 120],  // Output range (e.g., rotation in degrees) //right
            Extrapolate.CLAMP // Clamps the output within the defined range
        );

        const scale = interpolate(
            transformAnimatedValue.value,
            [0, 1],
            [1, 8],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { translateY: transformY },
                { translateX: transformX },
                { scale: scale },
            ],
        };
    });

    const bottomLogoAnimatedStyle = useAnimatedStyle(() => {
        const transformY = interpolate(
            transformAnimatedValue.value,
            [0, 1], // Input range (e.g., pan distance)
            [0, -300],  // Output range (e.g., rotation in degrees)
            Extrapolate.CLAMP // Clamps the output within the defined range
        );

        const transformX = interpolate(
            transformAnimatedValue.value,
            [0, 1], // Input range (e.g., pan distance)
            [0, -120],  // Output range (e.g., rotation in degrees) //right
            Extrapolate.CLAMP // Clamps the output within the defined range
        );

        const scale = interpolate(
            transformAnimatedValue.value,
            [0, 1],
            [1, 8],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { translateY: transformY },
                { translateX: transformX },
                { scale: scale },
            ],
        };
    });

    const logoAnimatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            logoAnimatedValue.value,
            [0, 1],
            [1, 3],
            Extrapolate.CLAMP
        );
        return {
            transform: [
                { scale: scale },
            ],
        };
    });

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundAnimatedValue.value
        }
    });

    const animatedFullLogoStyle = useAnimatedStyle(() => {
        return {
            opacity: fullLogoAnimatedValue.value
        }
    })

    const onPress = useCallback(() => {
        navigation.navigate('login');
    }, [navigation])

    return (
        <>
            <Animated.View style={[styles.mainContainer, animatedBackgroundStyle]}>
                <Animated.View style={logoAnimatedStyle}>
                    <Animated.Image
                        source={require('../assets/images/logo-top.png')}
                        style={[styles.topLogoImageStyle, topLogoAnimatedStyle]}
                        resizeMode='contain'
                    />
                    <Animated.Image
                        source={require('../assets/images/logo-bottom.png')}
                        style={[styles.bottomLogoImageStyle, bottomLogoAnimatedStyle]}
                        resizeMode='contain'
                    />
                </Animated.View>
                <Animated.Image
                    source={require('../assets/images/full-logo.png')}
                    style={[styles.fullLogoImageStyle, animatedFullLogoStyle]}
                    resizeMode='contain'
                />
            </Animated.View>
            <Animated.View style={animatedFullLogoStyle}>
                <Button
                    title={LOGIN}
                    onPress={onPress}
                    state='default'
                    type='secondary'
                />
            </Animated.View>
        </>
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    topLogoImageStyle: {
        height: 12,
        width: 36
    },
    bottomLogoImageStyle: {
        height: 22,
        width: 36
    },
    fullLogoImageStyle: {
        height: 36,
        width: 208
    },
})

export default SplashScreen;
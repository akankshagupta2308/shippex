import React, { useMemo, memo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type State = 'loading' | 'disabled' | 'active' | 'default' | 'pressed';
export type Type = 'primary' | 'secondary';

type ButtonProps = {
    title: string,
    state: State,
    onPress: () => void,
    type: Type
}

const Button = ({ title, state, onPress, type }: ButtonProps) => {
    const insets = useSafeAreaInsets();
    const buttonStyle = useMemo(() => {
        switch (state) {
            case 'pressed':
            case 'loading':
                return { backgroundColor: type === 'primary' ? '#4169E1' : '#D9E6FD' };
            case 'disabled':
                return { backgroundColor: type === 'primary' ? '#EAE7F2' : '#F4F2F8' };
            default:
                return { backgroundColor: type === 'primary' ? '#2F50C1' : '#ffffff' };
        }
    }, [state, type])

    const buttonTextStyle = useMemo(() => {
        switch (state) {
            case 'pressed':
            case 'loading':
                return { color: type === 'primary' ? '#FFFFFF' : '#2F50C1' };
            case 'disabled':
                return { color: type === 'primary' ? '#A7A3B3' : '#CDCAD9' };
            default:
                return { color: type === 'primary' ? '#FFFFFF' : '#2F50C1' };
        }
    }, [state, type])

    return (
        <Pressable style={[buttonStyle, styles.buttonContainer, { bottom: insets.bottom + 32 }]} onPress={onPress}>
            {state === 'loading' ?
                <ActivityIndicator size={24} color={'white'} />
                :
                <Text style={[styles.titleStyle, buttonTextStyle]}>{title}</Text>
            }
        </Pressable>
    )
}

export default memo(Button);

const styles = StyleSheet.create({
    buttonContainer: {
        height: 56,
        width: 361,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
    },
    titleStyle: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontStyle: 'normal',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
    }
})
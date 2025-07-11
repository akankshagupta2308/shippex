import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type FloatingLabelInputProps = {
  label: string, value: string, onChangeText: (text:string) => void, secureTextEntry: boolean,
}

const FloatingLabelInput = ({ label, value, onChangeText, secureTextEntry }: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useSharedValue(0);
  const labelBackgroundColorValue = useSharedValue('#A7A3B3');

  useEffect(() => {
    animatedIsFocused.value = withTiming(isFocused || value ? 1 : 0, {
      duration: 150,
    });
    labelBackgroundColorValue.value = withTiming('#58536E', {
      duration: 150,
    })
  }, [animatedIsFocused, isFocused, labelBackgroundColorValue, value]);

  const labelStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(
        animatedIsFocused.value,
        [0, 1],
       [18, 8],
      ),
      fontSize: interpolate(
        animatedIsFocused.value,
        [0, 1],
        [16, 11],
      ),
      color: labelBackgroundColorValue.value
    }
  }, [animatedIsFocused]);

  return (
    <View style={[styles.inputContainer, {borderColor: isFocused ? '#2F50c1' : '#F4F2F8', borderWidth: isFocused ? 1 : 0}]}>
      <Animated.Text style={[labelStyle, styles.textContainer]}>
        {label}
      </Animated.Text>
       <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        secureTextEntry={secureTextEntry}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 10,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#F4F2F8',
    marginTop: 31
  },
  input: {
    height: 56,
    fontSize: 16,
    color: '#2F50C1',
  },
  textContainer: {
    paddingHorizontal: 4,
    position: 'absolute',
    left: 14,
  },
});

export default FloatingLabelInput;

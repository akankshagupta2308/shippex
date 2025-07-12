import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LOGIN, LOGIN_MESSAGE, URL, USER_NAME_EMAIL, PASSWORD } from '../../constants/stringConstants';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Button, { State, Type } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Api } from '../../network/api';
import { useAuthStore } from '../../store/useAuthStore';
import { validateEmail, validateURL } from '../../utills/commonUtils';

type Errors = {
  url?: string;
  email?: string;
  password?: string;
}

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonStatus, setButtonStatus] = useState<{ state: State, type: Type }>({ state: 'disabled', type: 'secondary' })
  const [errors, setErrors] = useState<Errors>({});
  const { setUserData } = useAuthStore();

  useEffect(() => {
    if (!errors.url && !errors.email && !errors.password && !!url && !!email && !!password) {
      setButtonStatus({ state: 'default', type: 'primary' });
    }
  }, [email, errors, password, url])

  const handleLogin = async () => {
    let tempErrors: Errors = {};
    if (!validateURL(url)) {
      tempErrors.url = 'Enter a valid URL';
    }
    if (!validateEmail(email)) {
      tempErrors.email = 'Enter a valid email';
    }
    if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);

    try {
      if (!!tempErrors.url && !!tempErrors.email && !!tempErrors.password) {
        Alert.alert('Please fill all the information correctly');
      }
      const response = await Api.login({ email, password, url });
      if (response?.success) {
        setUserData(response?.data);
        navigation.reset({ index: 0, routes: [{ name: 'tabs' }] });
      }
    } catch (error) {
      Alert.alert('Login Failed', error?.message);
    }
  };

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.headerTextStyle}>{LOGIN}</Text>
      <Text style={styles.bodyTextStyle}>{LOGIN_MESSAGE}</Text>
      <FloatingLabelInput
        label={URL}
        value={url}
        onChangeText={setUrl}
        secureTextEntry={false}

      />
      {errors.url && <Text style={styles.error}>{errors.url}</Text>}
      <FloatingLabelInput label={USER_NAME_EMAIL} value={email}
        onChangeText={setEmail} secureTextEntry={false}

      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <FloatingLabelInput label={PASSWORD}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}

      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <Button
        title={LOGIN}
        onPress={handleLogin}
        state={buttonStatus.state}
        type={buttonStatus.type}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  },
  headerTextStyle: {
    color: '#000000',
    fontSize: 34,
    fontWeight: '600',
    lineHeight: 41,
    marginTop: 20,
    textAlign: 'left'
  },
  bodyTextStyle: {
    color: '#757281',
    fontSize: 17,
    lineHeight: 24,
    marginTop: 8,
    textAlign: 'left'
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: 'red',
    marginLeft: 4
  },
})

export default memo(LoginScreen);
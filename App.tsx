/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {  useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;

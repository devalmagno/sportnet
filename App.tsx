import { Button, View, Text, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import Home from './src/screens/Home';

interface UserInfoInterface {
  name: string;
}

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfoInterface | null>(null);

  const [fontsLoaded] = useFonts({
    'Inter400': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter500': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter600': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Poppins400': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins500': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins600': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '',
    androidClientId: '',
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded)
      await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication!.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    }
  }

  if (!fontsLoaded) return null;

  return (
    <View
      onLayout={onLayoutRootView}
      style={styles.container}
    >
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: "#000",
  }
})

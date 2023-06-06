/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Plant } from './src/types/types';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { store, RootState } from './src/redux/store';
import { fetchMe } from './src/redux/authSlice';
import { AuthContext, AuthProvider } from './src/AuthContext';
import { AuthStackNavigator, MainStackNavigator } from './src/navigation/StackNavigator';
import LoadingScreen from './src/screens/LoadingScreen'

import ApiFunctions from './src/api/apiHelper';
import TabNavigator from './src/navigation/TabNavigator';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </Provider>
  )
}

function App(): JSX.Element {
  console.log("[APP INITIALIZED]");
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState<Array<Plant> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log('Dispatching...');
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    ApiFunctions.fetchAllPlants()
      .then(json => {
        console.log("returning data");
        console.log(json);
        if (json.error) {
          setError(json.error);
        } else {
          setData(json.data || null);
        }
        setLoading(false);
      })
      .catch(error => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
        setLoading(false);
      });
  }, []);


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log("Loading state changed:", auth.loading);
  }, [auth.loading]);

  return (
    <NavigationContainer>
        {auth.loading === 'loading' ? (
          <LoadingScreen />  // This could be a simple spinner
        ) : auth.user ? (
          <MainStackNavigator />
        ) : (
          <AuthStackNavigator />
        )}
    </NavigationContainer>
);
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

// export default App;
export default AppWrapper;
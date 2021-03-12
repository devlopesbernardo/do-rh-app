import React from 'react';
import * as eva from '@eva-design/eva';
import { StyleSheet, ImageBackground, Text, ScrollView } from 'react-native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import Header from '../molecules/Header';
import SingleService from '../molecules/SingleService';
import Featured from '../molecules/Featured';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView
      style={{
        display: 'flex',

        //fontFamily: 'Poppins_800ExtraBold',
      }}
    >
      <Header />
      <Featured />
      <Text style={styles.h1}>Nossos Serviços</Text>
      <SingleService
        service="Upgrade de apresentação"
        descriptionMain="Currículo ou LinkedIn"
        descriptionSecondary="Carta de apresentação"
        route="Revisao"
      />
      <SingleService
        service="LinkedIn: Revisão"
        description="Qualifique seu perfil e alcance seu sucesso!"
        route="Revisao"
      />
      <SingleService
        service="Preparação para PS"
        description="Processo Seletivos: aumente suas chances"
        route="Revisao"
      />
      <StatusBar style={'dark'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Poppins_800ExtraBold',
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginLeft: '5%',
    color: '#1A1A1A',
    fontSize: 18,
  },
});

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);

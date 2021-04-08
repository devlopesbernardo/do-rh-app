import React from 'react';
import * as eva from '@eva-design/eva';
import { StyleSheet, ImageBackground, Text, ScrollView } from 'react-native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import Header from '../molecules/Header';
import SingleService from '../molecules/SingleService';
import Featured from '../molecules/Featured';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userData from '../UserStore';

const url = 'http://209.126.2.112:3333';
export default function HomeScreen({ navigation }) {
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
  const fetchName = async (tokenSent) => {
    try {
      const fullName = await axios({
        url: `${url}/user/dados`,
        headers: {
          'content-type': 'application/json;charset=utf-8',
          accept: '*/*',
        },
        method: 'POST',
        data: {
          token: tokenSent,
        },
      });
      const name = await fullName.data;
      userData.data = name;
      userData.data.token = await AsyncStorage.getItem('@rhToken');
      console.log(userData.data);
    } catch (e) {
      console.log(e);
    }
  };

  const loadData = async () => {
    const token = await AsyncStorage.getItem('@rhToken');
    console.log(token);
    if (token !== null || undefined || '') {
      await fetchName(await AsyncStorage.getItem('@rhToken'));
    }
  };

  loadData();
  const services = [
    {
      id: 1,
      nome: 'Upgrade de apresentação',
      descriptions: {
        1: 'Currículo ou LinkedIn',
        2: 'Carta de apresentação',
      },
    },
    {
      id: 2,
      nome: 'Preparação para entrevista',
      descriptions: {
        1: 'Orientações para entrevistasª (2 sessões)',
        2: 'Elaboração ou revisão de currículo',
        3: 'Revisão de Linkedin',
        4: 'Carta de apresentação',
      },
    },
    {
      id: 3,
      nome: 'Contato ativo',
      descriptions: {
        1: 'Indicação de currículos para parceiros',
        2: 'Busca ativa de vagas (120 dias)',
        3: 'Orientações para entrevistas (3 sessões)',
        4: 'Elaboração ou revisão de currículo',
        5: 'Revisão de LinkedIn',
        6: 'Carta de apresentação',
      },
    },
    {
      id: 4,
      nome: 'Contato ativo plus',
      descriptions: {
        1: 'Indicação de currículos para parceiros',
        2: 'Busca ativa de vagas (180 dias)',
        3: 'Orientações para entrevistas (3 sessões)',
        4: 'Elaboração ou revisão de currículo',
        5: 'Revisão de LinkedIn',
        6: 'Carta de apresentação',
      },
    },
  ];

  userData.plans = services;
  userData.selectedPlan = {};
  console.log(userData.plans);

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
      {services.map((service) => {
        return (
          <SingleService
            key={service.id}
            id={service.id}
            entire_data={service}
            service={service.nome}
            descriptions={service.descriptions}
            route="Revisao"
          />
        );
      })}
      <StatusBar style={'dark'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Poppins_800ExtraBold',
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 10,
    color: '#1A1A1A',
    fontSize: 18,
  },
});

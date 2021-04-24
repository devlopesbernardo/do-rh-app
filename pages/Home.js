import React from 'react';
import * as eva from '@eva-design/eva';
import * as InAppPurchases from 'expo-in-app-purchases';
import {
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
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
import Button from '../atoms/Button';

const url = 'https://back.appdorh.com';
export default function HomeScreen({ navigation }) {
  const [items, setItems] = React.useState();
  React.useEffect(() => {
    async function connection() {
      try {
        const connect = await InAppPurchases.connectAsync();

        //console.log('conectado', connect);
      } catch (e) {
        console.log(e);
      }
    }
    connection();
  }, []);

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
      // console.log(userData.data);
    } catch (e) {
      console.log(e);
    }
  };

  const loadData = async () => {
    const token = await AsyncStorage.getItem('@rhToken');
    //console.log(token);
    if (token !== null || undefined || '') {
      await fetchName(await AsyncStorage.getItem('@rhToken'));
    }
  };

  loadData();
  const services = [
    {
      id: 1,
      image: `${require('../assets/image-1.png')}`,
      nome: 'Upgrade de apresentação',
      descriptions: {
        1: 'Currículo ou LinkedIn',
        2: 'Carta de apresentação',
      },
      detalhes: `Você sabia que cerca de 80% dos currículos são eliminados pelos recrutadores em menos de 1 minuto de leitura?
Se você está à procura de recolocação no mercado de trabalho e não quer fazer parte dessa estatística, confie seu currículo a quem tem experiência sobre o assunto e componha os 20% que interessam aos recrutadores.`,
    },
    {
      id: 2,
      image: `${require('../assets/image3.png')}`,

      nome: 'Preparação para entrevista',
      descriptions: {
        1: 'Orientações para entrevistas (2 sessões)',
        2: 'Elaboração ou revisão de currículo',
        3: 'Revisão de Linkedin',
        4: 'Carta de apresentação',
      },
      detalhes: `Já ouviu falar no ditado "a prática leva perfeição"? Pois bem, em uma entrevista de emprego a prática te leva a aprovação! Depois de participar do seleto grupo de pessoas convocadas para a entrevista, você não pode dar bobeira nessa etapa. Esteja pronto para a entrevista fazendo simulações com feedbacks relevantes que lhe darão a chave para o sucesso. `,
    },
    {
      id: 3,
      image: `${require('../assets/image3-1.png')}`,

      nome: 'Contato ativo',
      descriptions: {
        1: 'Indicação de currículos para parceiros',
        2: 'Busca ativa de vagas (120 dias)',
        3: 'Orientações para entrevistas (3 sessões)',
        4: 'Elaboração ou revisão de currículo',
        5: 'Revisão de LinkedIn',
        6: 'Carta de apresentação',
      },
      detalhes: `Em um mercado de trabalho altamente competitivo, estabelecer conexões é uma excelente estratégia para a geração de novas oportunidades. Nesse quesito, nós do RH podemos te ajudar! Temos uma boa rede de contatos profissionais que o levarão da invisibilidade ao destaque, alavancando suas chances na seleção. `,
    },
    {
      id: 4,
      image: `${require('../assets/image3-2.png')}`,

      nome: 'Contato ativo plus',
      descriptions: {
        1: 'Indicação de currículos para parceiros',
        2: 'Busca ativa de vagas (180 dias)',
        3: 'Orientações para entrevistas (3 sessões)',
        4: 'Elaboração ou revisão de currículo',
        5: 'Revisão de LinkedIn',
        6: 'Carta de apresentação',
      },
      detalhes: `Todos sabemos que o tempo é um recurso limitado, por isso, é importante usá-lo nas coisas que realmente importam. Aumente o tempo dedicado a busca ativa por vagas com esse pacote, deixando o trabalho por nossa parte! Assim, você poderá se dedicar a capacitações e outras atividades enquanto entregamos as melhores oportunidades em suas mãos. `,
    },
    {
      id: 5,
      image: `${require('../assets/image3-3.png')}`,
      nome: 'Coaching',
      descriptions: {
        1: 'Mentoria para alcance de suas metas!',
        2: '10 sessões',
      },
      detalhes: `Para quem almeja grandes conquistas o coaching é um processo de grande auxílio. Com o uso de técnicas cientificamente comprovadas e a experiência de nossos consultores, você será guiado rumo ao futuro que deseja!`,
    },
    {
      id: 6,
      image: `${require('../assets/image3-4.jpg')}`,
      nome: 'Treinamento',
      descriptions: {
        1: 'Tenha os anos de experiência dos nossos\nconsultores ao seu lado',
      },
      detalhes: `Explore suas habilidades e desenvolva as aptidões mais desejáveis do mercado de trabalho através dos seguintes treinamentos: 
      • Administração do tempo: Aprenda a otimizar seu tempo e ateste que a frase "não tenho tempo para X" só existe para quem não se organiza. 
      • Comunicação/Oratória: Aperfeiçoe essa qualidade tão essencial nos relacionamentos profissionais e veja suas oportunidades multiplicarem.
      • Liderança: Caminhe em direção ao topo da carreira através do aprimoramento da sua capacidade de liderança. `,
    },
  ];

  userData.plans = services;
  userData.selectedPlan = {};
  //console.log(userData.plans);

  return (
    <ScrollView
      removeClippedSubviews={false}
      style={{
        display: 'flex',

        //fontFamily: 'Poppins_800ExtraBold',
      }}
    >
      <Header />
      <Featured />
      <Text style={styles.h1}>Nossos Serviços</Text>
      {/* <Button
        text="teste"
        onPress={async () => await InAppPurchases.purchaseItemAsync('plano1')}
      /> */}
      {services.map((service) => {
        return (
          <SingleService
            key={service.id}
            onPress={() => {
              userData.selectedPlan = service;
            }}
            id={service.id}
            image={service.image}
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

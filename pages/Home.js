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

const url = 'http://209.126.2.112:3333';
export default function HomeScreen({ navigation }) {
  const [items, setItems] = React.useState();

  React.useEffect(() => {
    async function connection() {
      try {
        const connect = await InAppPurchases.connectAsync();
        await runFunc();

        //console.log('conectado', connect);
      } catch (e) {
        console.log(e);
        runFunc();
      }
    }
    connection();
  }, []);

  async function runFunc() {
    const itemSkus = Platform.select({
      ios: [
        'plano1', // just remove bundle id from product id
      ],
      android: [
        'plano1',
        'plano2', // just remove bundle id from product id
      ],
    });
    const { responseCode, results } = await InAppPurchases.getProductsAsync(
      itemSkus,
    );
    console.log('ola', results);
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      setItems(results);
      console.log('items', results);
    } else {
      console.log('deu erro', responseCode);
    }
  }

  // Set purchase listener
  InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
    // Purchase was successful
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      results.forEach((purchase) => {
        if (!purchase.acknowledged) {
          console.log(`Successfully purchased ${purchase.productId}`);
          // Process transaction here and unlock content...

          // Then when you're done
          InAppPurchases.finishTransactionAsync(purchase, true);
        }
      });
    }

    // Else find out what went wrong
    if (responseCode === IAPResponseCode.USER_CANCELED) {
      console.log('User canceled the transaction');
    } else if (responseCode === IAPResponseCode.DEFERRED) {
      console.log(
        'User does not have permissions to buy but requested parental approval (iOS only)',
      );
    } else {
      console.warn(
        `Something went wrong with the purchase. Received errorCode ${errorCode}`,
      );
    }
  });

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
      image: `${require('../assets/BannerRevisao.jpg')}`,
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
        1: 'Orientações para entrevistasª (2 sessões)',
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
  ];

  userData.plans = services;
  userData.selectedPlan = {};
  //console.log(userData.plans);

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
      <Button
        text="teste"
        onPress={async () => await InAppPurchases.purchaseItemAsync('plano1')}
      />
      {services.map((service) => {
        return (
          <SingleService
            key={service.id}
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

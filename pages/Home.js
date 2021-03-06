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
import { useNavigation } from '@react-navigation/native';

import Button from '../atoms/Button';

const url = 'https://back.appdorh.com';
export default function HomeScreen() {
  const navigation = useNavigation();

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
      userData.data.picture = await AsyncStorage.getItem('@rhPhoto');
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
      nome: 'Upgrade de apresenta????o',
      descriptions: {
        1: 'Curr??culo ou LinkedIn',
        2: 'Carta de apresenta????o',
      },
      detalhes: `Voc?? sabia que cerca de 80% dos curr??culos s??o eliminados pelos recrutadores em menos de 1 minuto de leitura?
Se voc?? est?? ?? procura de recoloca????o no mercado de trabalho e n??o quer fazer parte dessa estat??stica, confie seu curr??culo a quem tem experi??ncia sobre o assunto e componha os 20% que interessam aos recrutadores.`,
    },
    {
      id: 2,
      image: `${require('../assets/image3.png')}`,

      nome: 'Prepara????o para entrevista',
      descriptions: {
        1: 'Orienta????es para entrevistas (2 sess??es)',
        2: 'Elabora????o ou revis??o de curr??culo',
        3: 'Revis??o de Linkedin',
        4: 'Carta de apresenta????o',
      },
      detalhes: `J?? ouviu falar no ditado "a pr??tica leva perfei????o"? Pois bem, em uma entrevista de emprego a pr??tica te leva a aprova????o! Depois de participar do seleto grupo de pessoas convocadas para a entrevista, voc?? n??o pode dar bobeira nessa etapa. Esteja pronto para a entrevista fazendo simula????es com feedbacks relevantes que lhe dar??o a chave para o sucesso. `,
    },
    {
      id: 3,
      image: `${require('../assets/image3-1.png')}`,

      nome: 'Contato ativo',
      descriptions: {
        1: 'Indica????o de curr??culos para parceiros',
        2: 'Busca ativa de vagas (120 dias)',
        3: 'Orienta????es para entrevistas (3 sess??es)',
        4: 'Elabora????o ou revis??o de curr??culo',
        5: 'Revis??o de LinkedIn',
        6: 'Carta de apresenta????o',
      },
      detalhes: `Em um mercado de trabalho altamente competitivo, estabelecer conex??es ?? uma excelente estrat??gia para a gera????o de novas oportunidades. Nesse quesito, n??s do RH podemos te ajudar! Temos uma boa rede de contatos profissionais que o levar??o da invisibilidade ao destaque, alavancando suas chances na sele????o. `,
    },
    {
      id: 4,
      image: `${require('../assets/image3-2.png')}`,

      nome: 'Contato ativo plus',
      descriptions: {
        1: 'Indica????o de curr??culos para parceiros',
        2: 'Busca ativa de vagas (180 dias)',
        3: 'Orienta????es para entrevistas (3 sess??es)',
        4: 'Elabora????o ou revis??o de curr??culo',
        5: 'Revis??o de LinkedIn',
        6: 'Carta de apresenta????o',
      },
      detalhes: `Todos sabemos que o tempo ?? um recurso limitado, por isso, ?? importante us??-lo nas coisas que realmente importam. Aumente o tempo dedicado a busca ativa por vagas com esse pacote, deixando o trabalho por nossa parte! Assim, voc?? poder?? se dedicar a capacita????es e outras atividades enquanto entregamos as melhores oportunidades em suas m??os. `,
    },
    {
      id: 5,
      image: `${require('../assets/image3-3.png')}`,
      nome: 'Coaching',
      descriptions: {
        1: 'Mentoria para alcance de suas metas!',
        2: '10 sess??es',
      },
      detalhes: `Para quem almeja grandes conquistas o coaching ?? um processo de grande aux??lio. Com o uso de t??cnicas cientificamente comprovadas e a experi??ncia de nossos consultores, voc?? ser?? guiado rumo ao futuro que deseja!`,
    },
  ];

  const training = {
    id: 6,
    image: `${require('../assets/image3-4.jpg')}`,
    nome: 'Treinamento',
    descriptions: {
      1: 'Tenha os anos de experi??ncia dos nossos\nconsultores ao seu lado',
    },
    detalhes: `Explore suas habilidades e desenvolva as aptid??es mais desej??veis do mercado de trabalho atrav??s dos seguintes treinamentos: 
    ??? Administra????o do tempo: Aprenda a otimizar seu tempo e ateste que a frase "n??o tenho tempo para X" s?? existe para quem n??o se organiza. 
    ??? Comunica????o/Orat??ria: Aperfei??oe essa qualidade t??o essencial nos relacionamentos profissionais e veja suas oportunidades multiplicarem.
    ??? Lideran??a: Caminhe em dire????o ao topo da carreira atrav??s do aprimoramento da sua capacidade de lideran??a. `,
  };

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
      <Text style={styles.h1}>Nossos Servi??os</Text>
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
      <SingleService
        key={training.id}
        onPress={() => {
          userData.selectedPlan = training;
          navigation.navigate('Treinamento');
        }}
        id={training.id}
        image={training.image}
        entire_data={training}
        service={training.nome}
        descriptions={training.descriptions}
        route="Treinamento"
      />
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

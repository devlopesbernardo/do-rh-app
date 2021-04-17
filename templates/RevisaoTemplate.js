import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import foto from '../assets/leo.png';
import BannerRevisao from '../assets/BannerRevisao.jpg';
import ButtonRH from '../atoms/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import userData from '../UserStore';
import axios from 'axios';
import * as InAppPurchases from 'expo-in-app-purchases';

export default function RevisaoTemplate(props) {
  const [logged, setLogged] = React.useState(1);
  const [pago, setPago] = React.useState(false);
  const [falha, setFalha] = React.useState();
  const [items, setItems] = React.useState();
  const url = 'http://209.126.2.112:3333';
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    if (userData.data.token) {
      setLogged(1);
    } else {
      setLogged(0);
    }
    if (logged) {
      try {
        runFunc();
      } catch (e) {
        Alert.alert(e);
      }
    }
    console.log(
      'selected',
      userData.plans[route.params.service - 1].id,
      userData.selectedPlan,
    );
  }, []);

  async function writeDb() {
    const setPlan = await axios({
      method: 'post',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        accept: '*/*',
        Authorization: `Bearer ${userData.data.token}`,
      },
      url: `${url}/plan/analise-curricular`,
      data: {
        plan_name: `${plan.nome}`,
        plan_id: userData.plans[route.params.service - 1].id,
        links: { 1: 'Insira seus links :D' },
        user_comments: 'Seu comentário padrão =)',
        pending: true,
      },
    });
    let data = await setPlan.data;
    console.log(data);
    navigation.navigate('Plan');
    userData.selectedPlan = data;
  }

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
    //console.log('ola', results);
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      setItems(results);
      //console.log('items', results);
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
          setPago(true);
          console.log('oi');
          console.log(pago);
          // Then when you're done
          InAppPurchases.finishTransactionAsync(purchase, true);
        }
      });
      writeDb();
    }

    // Else find out what went wrong
    if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
      console.log('User canceled the transaction');
    } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
      console.log(
        'User does not have permissions to buy but requested parental approval (iOS only)',
      );
    } else {
      console.warn(
        `Something went wrong with the purchase. Received errorCode ${errorCode}`,
      );
    }
  });

  let plan = userData.plans[route.params.service - 1];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.image}>
        <ImageBackground
          style={styles.bg}
          source={userData.plans[route.params.service - 1].image}
          imageStyle={{ transform: [{ rotateY: '180deg' }] }}
        >
          <Layout style={styles.overlay} />

          <View style={styles.headerTop}>
            <View style={styles.parentArrow}>
              <Feather
                name="arrow-left"
                size={25}
                color="rgba(50, 50, 50, 0.5)"
                style={styles.arrow}
              />
            </View>
            <Text style={styles.headerText}>{plan.nome}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.description}>
        <Text style={styles.h1}>Descrição do produto</Text>
        <Text style={styles.h4}>
          {userData.plans[route.params.service - 1].detalhes
            ? userData.plans[route.params.service - 1].detalhes
            : `Nisi, ultrices augue mollis tempus in. Nec eget nulla vitae lorem orci
          nisi. Ac lacus lectus tempus egestas sed. At accumsan semper mi
          faucibus lacus. Ultricies nunc dolor odio amet neque, vel orci lacus.
          Semper a, amet id semper. Quam consequat at duis lorem pellentesque
          elementum aliquam pellentesque. Vulputate molestie pellentesque enim,
          sit nunc nunc.`}
        </Text>
        <View style={styles.parentbutton}>
          <ButtonRH
            onPress={async () => {
              if (logged) {
                try {
                  const purchase = await InAppPurchases.purchaseItemAsync(
                    'plano1',
                  );
                } catch (e) {
                  console.log(e);
                }
              } else {
                Alert.alert(
                  'Você não está logado',
                  'Por favor, se autentique antes de comprar',
                );
              }
            }}
            //service={userData.plans[route.params.service - 1]}
            text="Contratar"
            style={styles.button}
            buttonStyle={styles.buttonStyle}
            fontSize={{ fontSize: 25 }}
            size="30"
          />
          <Text style={[styles.h1, styles.spaced]}>Quem faz</Text>
          <View style={styles.faz}>
            <View style={styles.foto}>
              <ImageBackground source={foto} style={styles.foto} />
            </View>
            <View style={styles.wrapperProfile}>
              <Text style={styles.h2}>Leonardo Wienen</Text>
              <Text style={styles.h6}>
                Nisi, ultrices augue mollis tempus in. Nec eget nulla vitae
                lorem orci nisi. Ac lacus lectus tempus egestas sed.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 35,
    flexDirection: 'column',
    height: '100%',
    // backgroundColor: 'green',
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    top: 15,
  },
  headerText: {
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    flex: 2,
    alignSelf: 'center',
    textAlign: 'center',
  },
  parentArrow: {
    backgroundColor: '#fefefe',
    padding: 10,
    marginLeft: 15,
    display: 'flex',
    position: 'absolute',
    borderRadius: 50,
  },
  arrow: {
    alignSelf: 'center',
  },
  image: {},
  bg: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
    // flex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 300,
    width: '100%',
  },
  description: {
    alignSelf: 'center',
    textAlign: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 200,
    backgroundColor: '#fff',
    padding: '5%',
    bottom: 10,
    height: 520,
  },
  h1: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 18,
  },
  h5: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
  },

  parentbutton: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
  },

  button: {
    alignSelf: 'center',
    borderRadius: 12,
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    height: 70,
    flex: 1,
  },
  spaced: {
    marginTop: 15,
    marginBottom: 8,
  },
  faz: {
    maxHeight: 120,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    backgroundColor: 'rgba(229, 229, 229, 1.0)',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  foto: {
    width: 128,
    height: 128,
    bottom: 4,
    zIndex: 300,
  },
  wrapperProfile: {
    flex: 4,
    marginLeft: 10,
  },
  h2: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
  },
  h6: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
});

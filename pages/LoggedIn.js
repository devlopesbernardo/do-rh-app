import React, { useReducer } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { view } from '@risingstack/react-easy-state';
import userData from '../UserStore';
import axios from 'axios';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import photo from '../assets/user-logged.png';
import ButtonRH from '../atoms/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';

const LoggedIn = view(() => {
  const url = 'https://back.appdorh.com';
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      await AsyncStorage.setItem('@rhPhoto', result.uri);
      userData.data.picture = result.uri;
    }
  };

  const navigation = useNavigation();

  Object.keys(userData.plans[1].descriptions).map((key, index) => {
    console.log(userData.plans[1].descriptions[key]);
  });
  let [loading, setLoading] = React.useState();

  let [plans, setPlans] = React.useState([]);

  const call = (plan) => {
    if (plan.reviewed === true) {
      userData.selectedPlan = plan;
      navigation.navigate('Feedback');
    } else {
      const p = new Promise((resolve) => {
        userData.selectedPlan = plan;
        userData.selectedPlan.isEditing = true;
        resolve();
      }).then((r) => navigation.navigate('Plan'));
      console.log('oi', plan);
    }
  };

  const fetchName = async () => {
    try {
      const fullName = await axios({
        url: `${url}/user/dados`,
        headers: {
          'content-type': 'application/json;charset=utf-8',
          accept: '*/*',
        },
        method: 'POST',
        data: {
          token: userData.data.token,
        },
      });
      const name = fullName.data;
      userData.data.full_name = name.name;
    } catch (e) {
      console.log(e);
    }
  };
  if (userData.data.full_name === undefined) {
    fetchName();
  }

  React.useEffect(() => {
    setLoading(true);
    console.log(userData.data.picture);
    const loadMyPlans = async () => {
      try {
        setLoading(true);
        const user = await axios({
          url: `${url}/user/meus-planos`,
          headers: {
            'content-type': 'application/json;charset=utf-8',
            accept: '*/*',
            Authorization: `Bearer ${userData.data.token}`,
          },
          method: 'GET',
        });
        let dados = await user.data[0].plans;
        setPlans(dados);
        //console.log(plans);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    loadMyPlans();

    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  let dArr;
  function reformatDate(dateStr) {
    dArr = dateStr.split('-');
    return dArr[2] + '/' + dArr[1] + '/' + dArr[0].substring(0);
  }

  return loading ? (
    <Layout style={styles.loading}>
      <ActivityIndicator size={200} style={styles.spinner} color="#D31B28" />
      <Text style={styles.h1}>Carregando dados....</Text>
      <Text
        style={styles.h2}
        onPress={async () => {
          await AsyncStorage.removeItem('@rhToken');
          setLoading(false);
        }}
      >
        Se preferir cancelar o login automático, clique aqui
      </Text>
    </Layout>
  ) : (
    <ScrollView
      contentContainerStyle={{
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={styles.headerTop}>
        <Feather.Button
          name="arrow-left"
          onPress={() => navigation.goBack()}
          backgroundColor="rgba(0, 0, 0, 0.0)"
          size={20}
          color="#D31B28"
          iconStyle={{
            borderRadius: 500,
            width: 20,
            alignSelf: 'center',
            height: 30,
            //padding: 5,
            paddingTop: 5,
            paddingLeft: 3,
          }}
          style={styles.arrow}
          borderRadius={500}
        />

        <Text style={styles.headerText}>Minha conta</Text>

        <Feather.Button
          name="log-out"
          onPress={async () => {
            userData.clearData();
            await AsyncStorage.removeItem('@rhtoken'),
              navigation.navigate('Home');
          }}
          backgroundColor="rgba(0, 0, 0, 0.0)"
          iconStyle={{
            borderRadius: 500,
            width: 20,
            alignSelf: 'center',
            height: 30,
            //padding: 5,
            paddingTop: 5,
            paddingLeft: 3,
          }}
          borderRadius={500}
          size={20}
          color="#D31B28"
          style={styles.out}
        />
      </View>
      <View style={styles.userData}>
        <View style={styles.photo}>
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
          >
            <Image
              source={
                userData.data.picture !== null ||
                userData.data.picture !== undefined
                  ? { uri: userData.data.picture }
                  : photo
              }
              style={styles.insidePhoto}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.texts}>
          <Text style={styles.name}>{userData.data.full_name}</Text>
          <Text style={styles.email}>{userData.data.email}</Text>
        </View>
      </View>
      <View style={styles.plans}>
        <Text style={styles.h2}>Minhas contratações</Text>
        {plans.map((plan) => {
          return (
            <View style={styles.singlePlan} key={plan.id}>
              <Text style={styles.h5}>{plan.plan_name}</Text>
              {Object.keys(userData.plans[plan.plan_id - 1].descriptions).map(
                (key, index) => {
                  return (
                    <Text key={key} style={styles.h6}>{`\u2022 ${
                      userData.plans[plan.plan_id - 1].descriptions[key]
                    }`}</Text>
                  );
                },
              )}

              <View style={styles.status}>
                <Text style={styles.h3}>Status do serviço</Text>
                <View style={styles.going}>
                  <Text style={[styles.h5, styles.red]}>
                    {plan.pending
                      ? 'Aguardando envio de arquivos'
                      : plan.plan_status}
                  </Text>
                  <Text style={styles.h6}>
                    Contratado em:{' '}
                    {reformatDate(
                      plan.created_at.substr(0, plan.created_at.indexOf(' ')),
                    )}
                  </Text>
                  {plan.pending ? null : (
                    <Text style={styles.h6}>Retorno em em: 02/03/2021</Text>
                  )}
                </View>
                <ButtonRH
                  // route={'Plan'}
                  text={
                    plan.pending
                      ? 'Enviar arquivos'
                      : plan.reviewed
                      ? 'Visualizar Feedback'
                      : 'Alterar datas de encontros ou anexos'
                  }
                  style={styles.button}
                  red={true}
                  onPress={() => call(plan)}
                  buttonStyle={styles.buttonStyle}
                  fontSize={{
                    fontSize: 14,
                    color: 'white',
                    fontFamily: 'Poppins_400Regular',
                  }}
                />
                <Text style={styles.cancel}>Cancelar contratação</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  loading: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  spinner: {
    height: 200,
    width: 200,
  },
  h1: {
    fontSize: 20,
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginTop: 40,
    paddingVertical: 10,
  },
  headerText: {
    color: 'black',
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    flex: 2,
    alignSelf: 'center',
    textAlign: 'center',
  },
  parentArrow: {
    padding: 7,
    borderColor: '#D31B28',
    borderWidth: 2,
    marginLeft: 15,
    display: 'flex',
    position: 'absolute',
    borderRadius: 500,
  },
  arrow: {
    alignSelf: 'center',
    borderRadius: 500,
    padding: 7,
    borderColor: '#D31B28',
    borderWidth: 2,
    marginLeft: 15,
  },
  parentout: {},
  out: {
    alignSelf: 'center',
    borderRadius: 500,
    padding: 7,
    borderColor: '#D31B28',
    borderWidth: 2,
    marginRight: 15,
  },
  userData: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insidePhoto: {
    width: 128,
    height: 128,
    borderRadius: 100,
  },
  texts: {
    marginTop: 8,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    textAlign: 'center',
  },
  plans: {
    backgroundColor: '#D31B28',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    //paddingBottom: 10,
  },
  h2: {
    fontFamily: 'Poppins_700Bold',
    color: 'white',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 16,
  },
  singlePlan: {
    backgroundColor: '#f2f2f2',
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    marginTop: 16,
  },
  h5: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 0,
    paddingBottom: 0,
    color: '#323232',
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    //aa
  },
  h6: {
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Poppins_400Regular',
    color: '#120000',
  },
  h3: {
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Poppins_700Bold',
    marginTop: 5,
    color: '#120000',
  },
  red: {
    color: '#D31B28',
    marginTop: -5,
    marginBottom: -2,
  },
  going: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#D31B28',
    padding: 10,
  },
  button: {
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 12,
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    height: 50,
    flex: 1,
  },
  cancel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#acacac',
    alignSelf: 'center',
    marginTop: 10,
  },
});
export default LoggedIn;

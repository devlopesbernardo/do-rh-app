import { Input, Text, Spinner, Layout } from '@ui-kitten/components';
import React from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import user from '../assets/user_big.png';
import ButtonRH from '../atoms/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { view } from '@risingstack/react-easy-state';
import userData from '../UserStore';
import AppLoading from 'expo-app-loading';

export const Login = view(() => {
  const url = 'http://209.126.2.112:3333';

  const navigation = useNavigation();
  const route = 'Home';

  let [email, setEmail] = React.useState('');
  let [loading, setLoading] = React.useState();
  let [senha, setSenha] = React.useState('');

  // console.log('senha:', senha, 'e-mail:', email);

  const login = async () => {
    const url = 'http://209.126.2.112:3333';
    let response;
    try {
      response = await axios.post(
        `${url}/user/login`,
        {
          email: `${email}`,
          password: `${senha}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;
      const token = data.token;
      console.log(data);

      if (token) {
        userData.data.token = token;
        userData.data.email = email;
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
      }
      navigation.navigate('LoggedIn');
      console.log('Logaria!');
    } catch (e) {
      console.log(e);
      return Alert.alert(
        'Seus credenciais estão incorretos',
        'Por favor, cheque seu e-mail e senha',
      );
    }
  };

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
      //console.log(fullName);
      const name = await fullName.data;
      //userData.data = name;
      console.log('eu sou o name', name);
      await AsyncStorage.clear();
      let tokenInStorage = await AsyncStorage.setItem(
        '@rhToken',
        userData.data.token,
      );
      //console.log('token no storage', await AsyncStorage.getItem('@rhToken'));
      navigation.navigate('LoggedIn');
    } catch (e) {
      console.log(e);
    }
  };

  const getToken = async () => {
    if (userData.data.token) {
      await fetchName(userData.data.token);
    }
  };
  getToken();
  return loading ? (
    <Layout style={styles.loading}>
      <ActivityIndicator size={200} style={styles.spinner} color="#D31B28" />
      <Text style={styles.h1}>Te logando...</Text>
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
      contentContainerStyle={styles.container} //style={styles.container}
    >
      <Image source={user} style={styles.clapping} />
      <Text style={styles.h4}>E-mail</Text>
      <Input
        style={styles.input}
        textStyle={{ paddingVertical: 5 }}
        onChangeText={(e) => setEmail(e)}
      />
      <Text style={styles.h4}>Senha</Text>
      <Input
        style={styles.input}
        textStyle={{ paddingVertical: 5 }}
        onChangeText={(e) => setSenha(e)}
      />
      <View style={styles.parentbutton}>
        <ButtonRH
          text="Fazer Login"
          style={styles.outlineButton}
          red={true}
          buttonStyle={styles.outlineButtonStyle}
          fontSize={{
            fontSize: 25,
            color: '#D31B28',
            fontFamily: 'Poppins_400Regular',
          }}
          onPress={() => login()}
          size={22}
        />
        <ButtonRH
          route="Register"
          text="Fazer cadastro"
          style={styles.button}
          buttonStyle={styles.buttonStyle}
          fontSize={{ fontSize: 20 }}
          size="22"
        />
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
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    height: '100%',
    maxWidth: '90%',
    alignSelf: 'center',
  },
  clapping: {
    width: 180,
    height: 180,
  },

  parentbutton: {
    // flex: 1,
    marginTop: 20,
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
  outlineButton: {
    alignSelf: 'center',
    borderRadius: 12,
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 12,
  },
  outlineButtonStyle: {
    backgroundColor: '#fff',
    height: 70,
    flex: 1,
    borderColor: '#D31B28',
    fontFamily: 'Poppins_400Regular',
  },
  h4: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#F8F7FB',
    borderRadius: 11,
  },
});

export default Login;

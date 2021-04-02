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

export const Register = view(() => {
  const url = 'http://209.126.2.112:3333';

  const navigation = useNavigation();
  const route = 'Home';
  React.useEffect(() => {
    async function clearStorage() {
      await AsyncStorage.clear();
      await AsyncStorage.removeItem('@rhToken');
    }
    clearStorage();
  }, []);

  const sendRegister = async () => {
    try {
      const name = await axios({
        url: `${url}/user/register`,
        headers: {
          'content-type': 'application/json;charset=utf-8',
          accept: '*/*',
        },
        method: 'POST',
        data: {
          email,
          password: senha,
          password_confirmation: passConfirm,
          full_name: fullName,
          phone,
        },
      });
      const response = name.data;
      userData.data = response.name;
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
      return Alert.alert('Erro', await e.data);
    }
  };

  let [email, setEmail] = React.useState('');
  let [loading, setLoading] = React.useState();
  let [senha, setSenha] = React.useState('');
  let [passConfirm, setPassConfirm] = React.useState('');
  let [phone, setPhone] = React.useState('');
  let [fullName, setFullName] = React.useState('');

  // console.log('senha:', senha, 'e-mail:', email);

  return (
    <ScrollView
      style={{ display: 'flex' }}
      contentContainerStyle={styles.container} //style={styles.container}
    >
      <Image source={user} style={styles.clapping} />
      <Text style={styles.h4}>E-mail</Text>
      <Input
        style={styles.input}
        textStyle={{ paddingVertical: 5 }}
        onChangeText={(e) => setEmail(e)}
      />
      <Text style={styles.h4}>Nome completo</Text>
      <Input
        style={styles.input}
        textStyle={{ paddingVertical: 5 }}
        onChangeText={(e) => setFullName(e)}
      />
      <Text style={styles.h4}>Senha</Text>
      <Input
        style={styles.input}
        textStyle={{ paddingVertical: 5 }}
        onChangeText={(e) => setSenha(e)}
      />
      <Text style={styles.h4}>Confirme a senha</Text>
      <Input
        style={styles.input}
        textStyle={{ paddingVertical: 5 }}
        onChangeText={(e) => setPassConfirm(e)}
      />
      <Text style={styles.h4}>Telefone</Text>
      <Input
        style={styles.input}
        textStyle={{ paddingVertical: 5 }}
        onChangeText={(e) => setPhone(e)}
      />
      <View style={styles.parentbutton}>
        <ButtonRH
          onPress={() => navigation.goBack()}
          text="Voltar"
          style={styles.outlineButton}
          red={true}
          buttonStyle={styles.outlineButtonStyle}
          fontSize={{
            fontSize: 25,
            color: '#D31B28',
            fontFamily: 'Poppins_400Regular',
          }}
          size={22}
        />
        <ButtonRH
          //route={route}
          text="Cadastrar"
          style={styles.button}
          buttonStyle={styles.buttonStyle}
          fontSize={{ fontSize: 20 }}
          size="22"
          onPress={() => sendRegister()}
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
    display: 'flex',

    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
  },
  clapping: {
    width: 180,
    height: 180,
    marginTop: 20,
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

export default Register;

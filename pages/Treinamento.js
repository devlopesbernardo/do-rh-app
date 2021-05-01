import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import feedback from '../assets/feedback.png';
import { Feather } from '@expo/vector-icons';
import userData from '../UserStore';
import ButtonRH from '../atoms/Button';
import axios from 'axios';

export default function Treinamento() {
  const [career, setCareer] = React.useState('');
  console.log(userData.selectedPlan);

  const sendMail = async () => {
    try {
      const send = await axios({
        method: 'POST',
        url: 'https://back.appdorh.com/treinamento-email',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${userData.data.token}`,
        },
        data: career,
      });
      const response = await send.data;
      console.log('oi', response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={{
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.imageParent}>
        <Image source={feedback} style={styles.image} />
      </View>
      <View style={styles.section1}>
        <Text style={styles.h1}>Formulário de contato</Text>
      </View>
      <View style={styles.section2}>
        <Text style={styles.bold}>
          Como o treinamento dos nossos profissionais poderá te ajudar?
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          scrollEnabled={true}
          onChangeText={(text) => {
            setCareer(text);
          }}
          value={career}
          style={styles.career}
          placeholder={'Como conseguiremos ajudar?'}
          placeholderTextColor="grey"
        />
      </View>
      <ButtonRH
        //onPress={() => buttonClicked()}
        onPress={() => {
          sendMail();
        }}
        text="Enviar mensagem"
        style={styles.button}
        buttonStyle={styles.buttonStyle}
        fontSize={{ fontSize: 20 }}
        size="22"
      />
      <ButtonRH
        route={'Home'}
        text="Enviar depois"
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  imageParent: {
    width: 128,
    height: 128,
    marginTop: 40,
  },
  image: {
    width: 128,
    height: 128,
  },
  h1: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 26,
    color: '#1A1A1A',
    alignSelf: 'center',
  },
  section1: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  selecionar: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderWidth: 1,
    borderColor: '#D31b28',
    alignSelf: 'center',
    borderRadius: 8,
    width: '100%',
    marginTop: 5,
  },
  hButton: {
    fontFamily: 'Poppins_400Regular',
    marginLeft: 20,
    alignSelf: 'center',
    color: '#D31b28',
    fontSize: 20,
  },
  icon: {
    transform: [{ rotate: '-90deg' }],
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  check: {
    borderColor: 'rgba(0, 0, 0, 0.0)',
  },
  textCheck: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#000',
    maxWidth: '95%',
    marginLeft: 10,
    alignSelf: 'center',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  section2: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  career: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#120000',
    paddingHorizontal: 15,
    height: 100,
  },
  bold: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    color: '#000',
    alignSelf: 'flex-start',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginVertical: 10,
  },
  section3: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 12,
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
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
    marginTop: 10,
    marginBottom: 20,
  },
  outlineButtonStyle: {
    backgroundColor: '#fff',
    height: 70,
    flex: 1,
    borderColor: '#D31B28',
    fontFamily: 'Poppins_400Regular',
  },
});

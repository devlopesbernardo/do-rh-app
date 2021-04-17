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
import * as WebBrowser from 'expo-web-browser';

export default function Feedback() {
  const [checked, setChecked] = React.useState(false);
  const [career, setCareer] = React.useState('');
  const [filename, setFilename] = React.useState('');
  console.log(userData.selectedPlan);
  const downloadUrl = async () => {
    await WebBrowser.openBrowserAsync(
      'https://rh.codandosonhos.com:9000/minio/download/my-bucket/Notas%20P1%20e%20P2.pdf-0f06fca4-0e58-48d8-adfc-90c54b6b8756.pdf?token=',
    );
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
        <Text style={styles.h1}>Feedback de serviço</Text>
        <View style={styles.selecionar} onTouchStart={() => downloadUrl()}>
          <Feather
            name="log-out"
            //backgroundColor="rgba(0, 0, 0, 0.0)"
            size={30}
            color="#D31B28"
            style={styles.icon}
          />
          <Text style={styles.hButton}>Feedback</Text>
        </View>
      </View>
      <View style={styles.section2}>
        <Text style={styles.bold}>
          Conte um pouco sobre sua atuação situação e seus objetivos de carreira
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          editable={false}
          scrollEnabled={true}
          value={career}
          style={styles.career}
          placeholder={userData.selectedPlan.user_feedback}
          placeholderTextColor="grey"
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingHorizontal: 10,
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
});

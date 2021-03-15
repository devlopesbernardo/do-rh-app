import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Input, Layout } from '@ui-kitten/components';
import foto from '../assets/leo.png';
import BannerRevisao from '../assets/BannerRevisao.jpg';
import ButtonRH from '../atoms/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export default function DetalhesTemplate() {
  const route = 'RevisaoTemplate';
  return (
    <ScrollView style={styles.container}>
      <View style={styles.image}>
        <ImageBackground
          style={styles.bg}
          source={BannerRevisao}
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
            <Text style={styles.headerText}>Revisão Curricular</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.description}>
        <Text style={styles.h1}>Pagamento</Text>
        <Text style={styles.h4}>Nome completo</Text>
        <Input style={styles.input} />
        <View style={styles.parentbutton}>
          <ButtonRH
            route={route}
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
    fontSize: 20,
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
    height: 200,
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
  },
  input: {
    width: '100%',
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
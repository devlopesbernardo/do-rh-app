import { Text } from '@ui-kitten/components';
import React from 'react';
import { Image, SafeAreaView, View, StyleSheet } from 'react-native';
import clapping from '../assets/clapping.png';
import ButtonRH from '../atoms/Button';
export default function ParabensTemplate() {
  const route = 'Enviado';

  return (
    <SafeAreaView style={styles.container}>
      <Image source={clapping} style={styles.clapping} />
      <Text style={styles.h1}>PARABÉNS!</Text>
      <Text style={styles.texts}>
        Você acabou de adquirir a Upgrade de apresentação! {'\n'} {'\n'}
        Na tela a seguir você poderá fazer o envio do arquivo do seu currículo,
        nos contar um pouco sobre você e seus objetivos e adicionar alguns links
        que considere importante!
      </Text>
      <View style={styles.parentbutton}>
        <ButtonRH
          route={route}
          text="Seguir para o próximo passo"
          style={styles.button}
          buttonStyle={styles.buttonStyle}
          fontSize={{ fontSize: 20 }}
          size="22"
        />
        <ButtonRH
          route={route}
          text="Voltar ao início"
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
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  h1: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    color: '#1a1a1a',
    marginVertical: 20,
  },
  texts: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#120000',
    textAlign: 'center',
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
    marginTop: 10,
  },
  outlineButtonStyle: {
    backgroundColor: '#fff',
    height: 70,
    flex: 1,
    borderColor: '#D31B28',
    fontFamily: 'Poppins_400Regular',
  },
});

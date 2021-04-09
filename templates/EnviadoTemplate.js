import { Text } from '@ui-kitten/components';
import React from 'react';
import { Image, SafeAreaView, View, StyleSheet } from 'react-native';
import festas from '../assets/festas.png';
import ButtonRH from '../atoms/Button';
export default function EnviadoTemplate() {
  const route = 'Home';

  return (
    <SafeAreaView style={styles.container}>
      <Image source={festas} style={styles.clapping} />
      <Text style={styles.h1}>
        Suas informações foram enviadas corretamente!
      </Text>
      <Text style={styles.texts}>
        Agora nossos consultores trabalharão para te ajudar na conquistas de
        seus objetivos! Assim que tudo estiver certo, você será notificado por
        e-mail e poderá conferir o resultado no seu perfil aqui no app :)
      </Text>
      <View style={styles.parentbutton}>
        <ButtonRH
          route={'Home'}
          text="Voltar ao início"
          style={styles.button}
          buttonStyle={styles.buttonStyle}
          fontSize={{ fontSize: 20 }}
          size="22"
        />
        <ButtonRH
          route={'LoggedIn'}
          text="Ir para meu perfil"
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
    fontSize: 25,
    textAlign: 'center',
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

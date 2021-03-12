import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Banner from '../assets/Banner.jpg';
const Featured = () => {
  return (
    <Layout style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={Banner}
        //imageStyle={{ borderRadius: 15 }}
      >
        <Layout style={styles.overlay} />
        <View style={styles.texts}>
          <Text category="h1" style={styles.h1}>
            Promoção show!
          </Text>
          <Text category="h6" style={styles.h6}>
            Descrição incrível da promoção!
          </Text>
        </View>
      </ImageBackground>
    </Layout>
  );
};

export default Featured;

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    borderTopEndRadius: 15,
    borderTopRightRadius: 15,
  },
  bg: {
    height: 250,
    padding: 20,
    resizeMode: 'contain',
    borderTopEndRadius: 15,
    borderTopRightRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 250,
    borderTopEndRadius: 15,
    borderTopRightRadius: 15,
  },
  texts: {
    alignSelf: 'flex-start',
    marginTop: 150,
    borderRadius: 15,
  },
  h1: {
    color: 'white',
    fontFamily: 'Poppins_800ExtraBold',
    fontWeight: 'bold',
  },
  h6: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontWeight: '200',
    fontSize: 12,
  },
});

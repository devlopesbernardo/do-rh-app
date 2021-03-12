import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { FontAwesome5 } from '@expo/vector-icons';
import logo from '../assets/logo-black.png';

export default function Header() {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.logocontainer}>
        <Image source={logo} style={styles.logo} />
      </Layout>
      <Layout style={styles.usercontainer}>
        <FontAwesome5
          name="user-circle"
          size={40}
          color="#1a1a1a"
          style={styles.user}
        />
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 40,
    backgroundColor: '#f2f2f2',
  },
  logocontainer: {
    flex: 1.95,
    width: '100%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#f2f2f2',
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: 32,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
  },
  usercontainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
    backgroundColor: '#f2f2f2',
  },
  user: {
    flex: 1,
  },
});

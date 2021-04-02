import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';
import logo from '../assets/logo-black.png';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { view } from '@risingstack/react-easy-state';
import userData from '../UserStore';

export const Header = view(() => {
  const navigation = useNavigation();

  return (
    <Layout style={styles.container}>
      <Layout style={styles.logocontainer}>
        <Image source={logo} style={styles.logo} />
      </Layout>

      <Layout style={styles.usercontainer}>
        <FontAwesome.Button
          onPress={() =>
            navigation.navigate(userData.data.token ? 'LoggedIn' : 'Login')
          }
          name="user-circle"
          size={40}
          color="#1a1a1a"
          style={styles.user}
        />
      </Layout>
    </Layout>
  );
});

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 40,
    backgroundColor: '#f2f2f2',
  },
  logocontainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: 40,
    marginBottom: 5,
    backgroundColor: '#f2f2f2',
  },
  usercontainer: {
    position: 'absolute',
    left: '85%',
    backgroundColor: '#f2f2f2',
    top: -12,
  },
  user: {
    backgroundColor: '#f2f2f2',
  },
});

export default Header;

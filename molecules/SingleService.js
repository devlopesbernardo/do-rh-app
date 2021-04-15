import React, { useEffect } from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Button from '../atoms/Button';
import prod from '../assets/p1.jpg';
import { useNavigation } from '@react-navigation/native';

export default function SingleService(props) {
  let route = props.route;
  let descriptions = props.descriptions;
  const navigation = useNavigation();
  console.log(props.service);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.imageContainer}>
        <Image source={props.image} style={styles.image} />
      </Layout>
      <Layout style={styles.texts}>
        <Text style={styles.h5}>{props.service}</Text>
        {descriptions !== undefined
          ? Object.keys(props.descriptions).map((key, index) => (
              <Text
                key={key}
                style={styles.h6}
              >{`\u2022 ${props.descriptions[key]}`}</Text>
            ))
          : null}

        <Button
          route={route}
          service={props.id}
          text="Eu quero!"
          style={styles.button}
          red={true}
          accessory={true}
          buttonStyle={styles.buttonStyle}
          fontSize={{ fontSize: 25, color: '#D31B28' }}
          size="39"
        />
      </Layout>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#DADADA',
    borderWidth: 1,
    fontFamily: 'Poppins_400Regular',
    maxWidth: '100%',
    marginHorizontal: 10,
    borderTopColor: '#D31B28',
    borderTopWidth: 3,
    elevation: 2,
  },
  imageContainer: {
    height: 128,
    maxWidth: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    alignSelf: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 128,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  texts: {},
  h5: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 0,
    paddingBottom: 0,
    color: '#323232',
    fontFamily: 'Poppins_700Bold',
    fontSize: 17,
    //aa
  },
  h6: {
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Poppins_400Regular',
    color: '#120000',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 12,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    backgroundColor: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  buttonStyle: {
    height: 55,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: 'black',
    alignSelf: 'center',
    borderColor: '#D31B28',
    flex: 0.9,
    fontFamily: 'Poppins_700Bold',
  },
});

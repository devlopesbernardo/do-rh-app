import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Icon = (props) => {
  return props.size ? (
    <Ionicons name="checkmark-circle" size={props.size} color={props.color} />
  ) : (
    <Ionicons name="checkmark-circle" size={22} color="white" />
  );
};
const IconRed = (props) => {
  return props.size ? (
    <Ionicons name="checkmark-circle" size={props.size} color="#D31B28" />
  ) : (
    <Ionicons name="checkmark-circle" size={22} color="#D31B28" />
  );
};

import { Layout, Button, Text } from '@ui-kitten/components';
export default function ButtonRH(props) {
  const navigation = useNavigation();

  console.log(props.route);
  return (
    <Layout style={[props.style]}>
      <Button
        style={[styles.insideButton, props.buttonStyle]}
        accessoryLeft={props.red ? IconRed : Icon}
        onPress={() => navigation.navigate(props.route)}
      >
        <Text style={[styles.text, props.fontSize]}>{props.text}</Text>
      </Button>
    </Layout>
  );
}
const styles = StyleSheet.create({
  insideButton: {
    backgroundColor: '#D31B28',
    textAlign: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 10,
    height: 2,
    borderRadius: 12,
    display: 'flex',
    alignSelf: 'flex-start',
    fontFamily: 'Poppins_700Bold',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',

    textAlign: 'center',
    fontWeight: 'bold',
  },
});

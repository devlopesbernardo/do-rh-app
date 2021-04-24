import { NavigationHelpersContext } from '@react-navigation/native';
import { view } from '@risingstack/react-easy-state';
import { Layout, Calendar } from '@ui-kitten/components';
import axios from 'axios';

import React from 'react';
import { View, Modal, StyleSheet, Alert } from 'react-native';
import userData from '../UserStore';
const ModalCalendar = view((props) => {
  const [calendar, setCalendar] = React.useState(true);
  const [date, setDate] = React.useState(new Date());
  const id = props.id;

  const checkDates = async (id) => {
    try {
      const req = await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          accept: '*/*',
        },
        url: 'https://back.appdorh.com/datas',
        data: {
          hour: userData.calendarDate[id],
        },
      });
      let data = await req.data;
      if (data.length === 0) {
        Alert.alert(
          'Escolha outro dia',
          'A agenda para essa data já está lotada.',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('oi');
              },
            },
          ],
        );
      }
      userData.calendarOptions = data;
      console.log('oi', data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Layout style={styles.container} level="1">
        <View style={styles.calendarContainer}>
          <Calendar
            date={date}
            onSelect={(nextDate) => {
              setDate(nextDate), (userData.calendarDate[id] = nextDate);
              checkDates(id);
            }}
          />
        </View>
      </Layout>
    </View>
  );
});

export default ModalCalendar;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calendarContainer: {
    margin: 2,
  },
});

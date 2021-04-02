import { view } from '@risingstack/react-easy-state';
import { Layout, Calendar } from '@ui-kitten/components';

import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import userData from '../UserStore';
const ModalCalendar = view((props) => {
  const [calendar, setCalendar] = React.useState(true);
  const [date, setDate] = React.useState(new Date());
  const id = props.id;
  return (
    <View>
      <Layout style={styles.container} level="1">
        <View style={styles.calendarContainer}>
          <Calendar
            date={date}
            onSelect={(nextDate) => {
              setDate(nextDate), (userData.calendarDate[id] = nextDate);
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

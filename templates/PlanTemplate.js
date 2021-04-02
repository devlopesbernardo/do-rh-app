import { view } from '@risingstack/react-easy-state';
import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import planDetails from '../assets/PlanDetails.png';
import { Calendar, CheckBox, Layout, Modal } from '@ui-kitten/components';
import { Feather } from '@expo/vector-icons';
import ModalCalendar from '../components/ModalCalendar';
import userData from '../UserStore';

const PlanTemplate = view(() => {
  const [checked, setChecked] = React.useState(false);
  const [career, setCareer] = React.useState('');
  const [link, setLink] = React.useState('');
  const [modalOpener, setModalOpener] = React.useState(false);
  //   const [date1, setDate1] = React.useState(new Date());
  //   const [date2, setDate2] = React.useState(new Date());
  //   const [date3, setDate3] = React.useState(new Date());

  //   console.log(date);

  const ids = [0, 1, 2];
  const [idClicked, setIdClicked] = React.useState(0);

  React.useEffect(() => {
    userData.calendarDate = [];
  }, []);

  const openFunction = (id) => {
    setIdClicked(id);
    setModalOpener(true);
  };
  console.log(idClicked);

  console.log(userData.calendarDate);
  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={{
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.imageParent}>
        <Image source={planDetails} style={styles.image} />
      </View>
      <View style={styles.section1}>
        <Text style={styles.h1}>Envio de informações</Text>
        <View style={styles.selecionar}>
          <Feather
            name="log-out"
            //backgroundColor="rgba(0, 0, 0, 0.0)"
            size={30}
            color="#D31B28"
            style={styles.icon}
          />
          <Text style={styles.hButton}>Selecionar arquivo</Text>
        </View>
        <View style={styles.checkView}>
          <CheckBox
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
            style={styles.check}
          />
          <Text style={styles.textCheck}>
            Marque essa caixa caso não tenha currículo e/ou queira fazer do
            zero.
          </Text>
        </View>
      </View>
      <View style={styles.section2}>
        <Text style={styles.bold}>
          Conte um pouco sobre sua atuação situação e seus objetivos de carreira
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setCareer(text)}
          scrollEnabled={true}
          value={career}
          style={styles.career}
          placeholder="Nos conte sobre sua carreira!"
          placeholderTextColor="grey"
        />
      </View>
      <View style={styles.section3}>
        <Text style={styles.bold}>
          Deseja anexar links? (Linkedin, site pessoal, etc.)
        </Text>
        <TextInput
          onChangeText={(text) => setLink(text)}
          value={link}
          style={styles.link}
          placeholder="Link 1"
          placeholderTextColor="grey"
        />
        <TextInput
          onChangeText={(text) => setLink(text)}
          value={link}
          style={styles.link}
          placeholder="Link 1"
          placeholderTextColor="grey"
        />
        <TextInput
          onChangeText={(text) => setLink(text)}
          value={link}
          style={styles.link}
          placeholder="Link 1"
          placeholderTextColor="grey"
        />
      </View>
      <View style={styles.section4}>
        <Text style={styles.bold}>Datas para encontros</Text>
        {ids.map((id) => {
          let value = id;
          return (
            <>
              <TouchableOpacity
                style={styles.linkOpacity}
                onPress={() => openFunction(id)}
              >
                <Text style={styles.meeting}>
                  {userData.calendarDate[id] === null ||
                  userData.calendarDate[id] === undefined
                    ? `Encontro ${id + 1}`
                    : Object.values(userData.calendarDate[id].toLocaleString())}
                </Text>
              </TouchableOpacity>
            </>
          );
        })}
      </View>
      <Modal
        visible={modalOpener}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalOpener(!modalOpener)}
      >
        <ModalCalendar id={idClicked} />
      </Modal>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingHorizontal: 10,
  },
  imageParent: {
    width: 128,
    height: 128,
    marginTop: 40,
  },
  image: {
    width: 128,
    height: 128,
  },
  h1: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 26,
    color: '#1A1A1A',
    alignSelf: 'center',
  },
  section1: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  selecionar: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderWidth: 1,
    borderColor: '#D31b28',
    alignSelf: 'center',
    borderRadius: 8,
    width: '100%',
    marginTop: 5,
  },
  hButton: {
    fontFamily: 'Poppins_400Regular',
    marginLeft: 20,
    alignSelf: 'center',
    color: '#D31b28',
    fontSize: 20,
  },
  icon: {
    transform: [{ rotate: '-90deg' }],
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  check: {
    borderColor: 'rgba(0, 0, 0, 0.0)',
  },
  textCheck: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#000',
    maxWidth: '95%',
    marginLeft: 10,
    alignSelf: 'center',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  section2: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  career: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#120000',
    paddingHorizontal: 15,
    height: 100,
  },
  bold: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    color: '#000',
    alignSelf: 'flex-start',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginVertical: 10,
  },
  section3: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  link: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#120000',
    paddingHorizontal: 15,
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  section4: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerNone: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'none',
  },
  calendarContainer: {
    margin: 2,
  },
  meeting: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: 'gray',
    paddingHorizontal: 15,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  linkOpacity: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default PlanTemplate;

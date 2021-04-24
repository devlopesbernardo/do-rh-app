import { view } from '@risingstack/react-easy-state';
import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import planDetails from '../assets/PlanDetails.png';
import { CheckBox, Modal } from '@ui-kitten/components';
import { Feather } from '@expo/vector-icons';
import ModalCalendar from '../components/ModalCalendar';
import userData from '../UserStore';
import axios from 'axios';
import ButtonRH from '../atoms/Button';

const PlanTemplate = view(() => {
  console.log('ola meu nome eh eu', pdf);

  const navigation = useNavigation();

  const [checked, setChecked] = React.useState(false);
  const [career, setCareer] = React.useState('');
  const [link1, setLink1] = React.useState('');
  const [link2, setLink2] = React.useState('');
  const [link3, setLink3] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modalOpener, setModalOpener] = React.useState(false);
  const [pdf, setPdf] = React.useState('');
  const [numberOfForms, setNumberOfForms] = React.useState([]);
  const [isEditing, setEditing] = React.useState(false);
  const [idClicked, setIdClicked] = React.useState(0);
  const [filename, setFilename] = React.useState('');

  React.useEffect(() => {
    console.log('AQUI', userData.selectedPlan.plan_id);
    userData.calendarDate = [];
    setLoading(true);
    if (userData.selectedPlan.plan_id === 2) {
      setNumberOfForms([0, 1]);
    }
    if (
      (userData.selectedPlan.plan_id > 2) &
      (userData.selectedPlan.plan_id !== 5)
    ) {
      setNumberOfForms([0, 1, 2]);
    }
    if (userData.selectedPlan.plan_id === 5) {
      setNumberOfForms([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
    if (userData.selectedPlan.isEditing === true) {
      setEditing(true);
    }
    if (isEditing && !pdf) {
      setFilename(`${userData.selectedPlan.file_name.slice(0, 15)}...`);
    }
    if (!isEditing && !pdf) {
      setFilename('Envie um arquivo');
    }

    console.log(userData.selectedPlan.links);

    if (userData.selectedPlan.links) {
      console.log('CHEGUEI');
      setLink1(Object.values(userData.selectedPlan.links)[0]);
      setLink2(Object.values(userData.selectedPlan.links)[1]);
      setLink3(Object.values(userData.selectedPlan.links)[2]);
      console.log('aqui, porra', link1);
    }
    setLoading(false);
  }, []);

  const openFunction = (id) => {
    setIdClicked(id);
    setModalOpener(true);
    console.log(id, 'id');
  };
  console.log('date', userData.calendarDate);
  console.log('hour', userData.calendarHour);

  const buttonClicked = async () => {
    userData.calendarDate.map(async (data, index) => {
      let picked_data = `${data.toJSON().split('T')[0]}T${
        userData.calendarHour[index]
      }`;
      console.log(picked_data);
      try {
        const send = await axios({
          method: 'POST',
          url: 'https://back.appdorh.com/marcar',
          headers: {
            'content-type': 'application/json;charset=utf-8',
            accept: '*/*',
            Authorization: `Bearer ${userData.data.token}`,
          },
          data: {
            plan_id: userData.selectedPlan.id,
            hour: picked_data,
            title: `Encontro: Leo e ${userData.data.full_name}`,
            user_id: userData.data.id,
          },
        });
        const response = await send.data;
        //console.log('oi', response);
      } catch (e) {
        console.log(e);
      }
    });
  };

  const pickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({})
      .then((p) => {
        setPdf(p), setFilename(`${p.name.slice(0, 15)}...`);
      })
      .catch((e) => console.log(e));
    console.log('result', result);

    if (!result.cancelled) {
      try {
        setPdf(result);
        console.log(result);
        setFilename(`${pdf.name.slice(0, 15)}...`);
      } catch (e) {
        console.log(e);
      }
      await sendPdf();
    }
  };

  const sendInfos = async () => {
    if (userData.selectedPlan.plan_id !== 5) {
      try {
        const data = await axios({
          method: 'PUT',
          headers: {
            'content-type': 'application/json;charset=utf-8',
            accept: '*/*',
            Authorization: `Bearer ${userData.data.token}`,
          },
          url: 'https://back.appdorh.com/plan/editar',
          data: {
            id: userData.selectedPlan.id,
            user_comments: career,
            links: {
              1: link1,
              2: link2,
              3: link3,
            },
            file_name: pdf !== null || pdf !== undefined ? pdf.name : null,
            pending: false,
          },
        });
        const response = await data.data;
        if (pdf) {
          await sendPdf();
        }
        if (userData.calendarDate) {
          if (userData.calendarDate.includes(undefined)) {
            Alert.alert('Existem horários não marcados...');
          } else {
            await buttonClicked();
          }
        }
        console.log('oi', response);
        navigation.navigate('Enviado');
      } catch (e) {
        console.log(e);
      }
    } else {
      if (
        userData.calendarDate.includes(undefined) ||
        userData.calendarDate.length !== 10
      ) {
        Alert.alert('Existem horários não marcados...');
      } else {
        await buttonClicked();
        navigation.navigate('Enviado');
      }
    }
  };

  const sendPdf = async () => {
    const body = new FormData();
    body.append('file', {
      name: pdf.name,
      size: pdf.size,
      uri: pdf.uri,
      type: 'file/pdf',
    });
    body.append('id', userData.selectedPlan.id);
    try {
      const send = await axios({
        method: 'POST',
        url: 'https://back.appdorh.com/file/envio-curriculo',
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${userData.data.token}`,
        },
        data: body,
      });
      const response = await send.data;
      console.log('oi', response);
    } catch (e) {
      console.log(e);
    }
  };

  console.log('ta editando e', isEditing);
  return loading ? (
    <Layout style={styles.loading}>
      <ActivityIndicator size={200} style={styles.spinner} color="#D31B28" />
      <Text style={styles.h1}>Carregando dados....</Text>
      <Text
        style={styles.h2}
        onPress={async () => {
          await AsyncStorage.removeItem('@rhToken');
          setLoading(false);
        }}
      >
        Se preferir cancelar o login automático, clique aqui
      </Text>
    </Layout>
  ) : (
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
      <Text style={styles.h1}>Envio de informações</Text>

      {userData.selectedPlan.plan_id !== 5 ? (
        <>
          <View style={styles.section1}>
            <View style={styles.selecionar} onTouchStart={() => pickPdf()}>
              <Feather
                name="log-out"
                //backgroundColor="rgba(0, 0, 0, 0.0)"
                size={30}
                color="#D31B28"
                style={styles.icon}
              />
              <Text style={styles.hButton}>{filename}</Text>
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
              Conte um pouco sobre sua atuação situação e seus objetivos de
              carreira
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => setCareer(text)}
              scrollEnabled={true}
              value={career}
              style={styles.career}
              placeholder={
                !isEditing
                  ? 'Nos conte sobre sua carreira!'
                  : userData.selectedPlan.user_comments !== null ||
                    userData.selectedPlan.user_comments !== undefined
                  ? userData.selectedPlan.user_comments
                  : 'Nos conte sobre a sua carreira'
              }
              placeholderTextColor="grey"
            />
          </View>

          <View style={styles.section3}>
            <Text style={styles.bold}>
              Deseja anexar links? (Linkedin, site pessoal, etc.)
            </Text>
            <TextInput
              onChangeText={(text) => setLink1(text)}
              value={link1}
              style={styles.link}
              placeholder={isEditing ? link1 : 'Link 1'}
              placeholderTextColor="grey"
            />
            <TextInput
              onChangeText={(text) => setLink2(text)}
              value={link2}
              style={styles.link}
              placeholder="Link 1"
              placeholderTextColor="grey"
            />
            <TextInput
              onChangeText={(text) => setLink3(text)}
              value={link3}
              style={styles.link}
              placeholder="Link 1"
              placeholderTextColor="grey"
            />
          </View>
        </>
      ) : null}
      {userData.selectedPlan && userData.selectedPlan.plan_id !== 1 ? (
        <View style={styles.section4}>
          <Text style={styles.bold}>Datas para encontros</Text>
          {numberOfForms.map((id) => {
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
                      : Object.values(
                          userData.calendarDate[id].toLocaleString(),
                        )}
                  </Text>
                </TouchableOpacity>
                {userData.calendarDate[id] && (
                  <View style={styles.datePicker}>
                    <Text style={styles.textPicker}>Horário escolhido</Text>
                    <Picker
                      style={styles.select}
                      selectedValue={userData.calendarHour[id]}
                      onValueChange={(itemValue, itemIndex) =>
                        (userData.calendarHour[id] = itemValue)
                      }
                    >
                      {userData.calendarOptions.length !== 0
                        ? userData.calendarOptions.map((hour) => (
                            <Picker.Item label={hour} value={hour} />
                          ))
                        : null}
                    </Picker>
                  </View>
                )}
              </>
            );
          })}
        </View>
      ) : null}
      <View style={styles.parentbutton}>
        <ButtonRH
          //onPress={() => buttonClicked()}
          onPress={() => sendInfos()}
          text="Confirmar envio"
          style={styles.button}
          buttonStyle={styles.buttonStyle}
          fontSize={{ fontSize: 20 }}
          size="22"
        />
        <ButtonRH
          route={'Home'}
          text="Enviar depois"
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
  select: {
    maxWidth: 150,
    backgroundColor: 'white',
    flex: 1,
  },
  datePicker: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  textPicker: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
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
    marginBottom: 20,
  },
  outlineButtonStyle: {
    backgroundColor: '#fff',
    height: 70,
    flex: 1,
    borderColor: '#D31B28',
    fontFamily: 'Poppins_400Regular',
  },
});

export default PlanTemplate;

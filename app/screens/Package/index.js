/** @format */

import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  TextInput,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
} from '@components';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Picker } from '@react-native-picker/picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BaseColor, BaseStyle, useTheme } from '@config';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/core';
import styles from './styles';

import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

import axios from 'axios';

export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';

const Package = (props) => {
  const { navigation, route } = props;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [nameDelivery, setNameDelivery] = useState('');
  const [hpDelivery, setHpDelivery] = useState('');
  const [nameSender, setSenderName] = useState('');
  const [hpSender, setSenderHp] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dataGate, setDataGate] = useState([]);
  const [dataTower, setDataTower] = useState([]);
  const [dataUnit, setDataUnit] = useState([]);
  const [dataCust, setDataCust] = useState([]);
  const [dataType, setDataType] = useState([]);

  const [valueGate, setValueGate] = useState('');
  const [valueTower, setValueTower] = useState('');
  const [valueUnit, setValueUnit] = useState('');
  const [valueCust, setValueCust] = useState('');
  const [valueType, setValueType] = useState('');
  const [open, setOpen] = useState(false);
  const [openTower, setOpenTower] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [openCust, setOpenCust] = useState(false);

  const [select, setSelectec] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const selectHandler = (item) => {
    setSelectec(item);
  };

  useEffect(() => {
    console.log(select);
  }, [select]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 1000);
  }, []);

  const valueNameDelivery = (index) => {
    console.log('name', index);

    setNameDelivery(index);
  };

  const valueHpDelivery = (index) => {
    console.log('hpdeli', index);

    setHpDelivery(index);
  };

  const valueSenderName = (index) => {
    console.log('sendername', index);

    setSenderName(index);
  };

  const valueQuantity = (index) => {
    console.log('Quantity', index);

    setQuantity(index);
  };

  const valueSenderHp = (index) => {
    console.log('senderhp', index);

    setSenderHp(index);
  };

  const fetchGate = async () => {
    try {
      const res = await axios.get(
        'http://34.87.121.155:2121/apiwebpbi/api/gate'
      );
      setDataGate(res.data.data);
      console.log('datagate', JSON.stringify(dataGate));
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  };
  const fetchTower = async () => {
    try {
      const res = await axios.get(
        'http://34.87.121.155:2121/apiwebpbi/api/package/tower'
      );

      console.log('res tower', res.data.data);

      setDataTower(res.data.data);

      // console.log("datatower", dataTower);
      // fetchUnit(res.data.data); //coba buat ngehit unit
    } catch (error) {
      setErrors(error.ressponse.data);
    }
  };

  const gate = valueGate;
  console.log('datagate', gate);
  const towerNo = valueTower;
  console.log('datatowerss', towerNo);
  const unitNo = valueUnit;
  console.log('dataUniit', unitNo);

  const chooseTower = (itemValue) => {
    console.log('itemvalue choose tower', itemValue);
    setValueTower(itemValue);
    // alert("choose tower lalu get unit");
    fetchUnit(itemValue);
  };

  const chooseUnit = (item) => {
    console.log('itemvalue choose unit', item);
    // setValueTower(item);
    setValueUnit(item);
    // fetchUnit(item);
    fetchCust(item);
  };

  //   const chooseCust = (itemCust) => {
  //     console.log('itemvalue choose customer', itemCust);
  //     // setValueTower(itemCust);
  //     // setValueUnit(itemCust);
  //     setValueCust(itemCust);
  //     fetchCust(itemCust);
  //   };

  const fetchUnit = async (paramsTower) => {
    console.log('hit api unit');
    // const towerNo = valueTower.lot_type;
    // console.log('datatowerss', towerNo);
    console.log('where tower untuk unit', paramsTower);
    const tower = paramsTower.lot_type;
    try {
      const res = await axios.get(
        `http://34.87.121.155:2121/apiwebpbi/api/package/unit?entity=01&project=01&tower=${tower}`
      );
      console.log('res unit', res.data.data);
      // console.log("res unitss", res);
      setDataUnit(res.data.data);
      // console.log("dataunit", dataUnit);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  };

  const fetchCust = async (paramsUnit, paramsTower) => {
    console.log('where tower untuk custs', unitNo);
    console.log('where tower untuk tower', paramsTower);
    console.log('where er', paramsUnit);

    const tower = towerNo;
    const unit = unitNo;
    console.log('where tower untuk er', tower);
    console.log('where tower untuk tw', unit);

    try {
      const res = await axios.get(
        `http://34.87.121.155:2121/apiwebpbi/api/package/unit/tenant?entity=01&project=01&tower=${tower}&lotno=${unit}`
      );
      setDataCust(res.data.data);
      console.log('dataunit', dataCust);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  };

  async function fetchType() {
    try {
      const res = await axios.get(
        'http://34.87.121.155:2121/apiwebpbi/api/package/type'
      );
      setDataType(res.data.data);
      console.log('datatype', dataType);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  useEffect(() => {
    fetchGate();
    fetchTower();
    fetchUnit();
    fetchCust();
    fetchType();
  }, []);

  const [fileList, setFileList] = useState([]);
  const state = useMemo(() => ({ fileList }), [fileList]);

  const onSelectedImage = useCallback(
    (image) => {
      setFileList((fileList) => {
        const newDataImg = [...fileList];
        const source = { uri: image.path };
        const item = {
          id: Date.now(),
          url: source,
          content: image.data,
        };
        newDataImg.push(item);
        return newDataImg;
      });
    },
    [setFileList]
  );

  const takePhotoFromCamera = useCallback(() => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then((image) => {
      onSelectedImage(image);
      console.log('itemimage', image);
    });
  }, [onSelectedImage]);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View>
        <Image source={item.url} style={styles.imageBox} />
      </View>
    );
  }, []);

  const onSubmit = (itemValue) => {
    //   if (name == '' || email == '' || message == '') {
    //     setSuccess({
    //       ...success,
    //       email: email != '' ? true : false,
    //       name: name != '' ? true : false,
    //       message: message != '' ? true : false,
    //     });
    //   } else {
    //     setLoading(true);
    //     setTimeout(() => {
    //       setLoading(false);
    //       navigation.goBack();
    //     }, 500);
    //   }
    // setValueGate(itemValue);
    // setValueTower(itemValue);

    // fetchGate();
    if (!valueGate.trim()) {
      alert('Please enter Gate');
      return;
    }
    if (!valueTower.trim()) {
      alert('Please enter Tower');
      return;
    }
    if (!valueUnit.trim()) {
      alert('Please enter Unit');
      return;
    }
    if (!valueCust.trim()) {
      alert('Please enter Name Resident');
      return;
    }
    if (!nameDelivery.trim()) {
      alert('Please enter Name Delivery');
      return;
    }
    if (!valueType.trim()) {
      alert('Please enter Type Packages');
      return;
    }
    // if (!fileList.url) {
    //   alert('Please enter Image');
    //   return;
    // }

    const gate = valueGate;
    console.log('gate', gate);
    const tower = valueTower;
    console.log('tower', tower);
    const unit = valueUnit;
    console.log('unit', unit);
    const resident = valueCust;
    console.log('resident', resident);
    const devname = nameDelivery;
    console.log('devname', devname);
    const devhape = hpDelivery;
    console.log('devhape', devhape);
    const sendername = nameSender;
    console.log('sendername', sendername);
    const senderhape = hpSender;
    console.log('senderhape', senderhape);
    const type = valueType;
    console.log('type', type);
    const kuantity = quantity;
    console.log('kuantity', kuantity);
    const image = fileList[0].url.uri;
    console.log('image', image);

    const bodyData = new FormData();
    bodyData.append('entity_cd', '01');
    bodyData.append('project_no', '01');
    bodyData.append('gate_cd', gate);
    bodyData.append('tower', tower);
    bodyData.append('lot_no', unit);
    bodyData.append('tenant_name', resident);
    bodyData.append('deliveryman_name', devname);
    bodyData.append('deliveryman_hp', devhape);
    bodyData.append('sender_name', sendername);
    bodyData.append('sender_hp', senderhape);
    bodyData.append('package_type', type);
    bodyData.append('package_qty', kuantity);
    bodyData.append('userfile', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    bodyData.append('userid', 'MGR');

    console.log('liatbody', bodyData);
    return fetch('http://34.87.121.155:2121/apiwebpbi/api/package/save', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyData,
    })
      .then((res) => {
        return res.json().then((resJson) => {
          console.log('resJsonCallback', resJson);
          Alert.alert(resJson.Pesan);
          navigation.navigate('PackageComplate', resJson.Data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderContent = () => {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('New Package')}
          renderLeft={() => {
            return (
              <Icon
                name='angle-left'
                size={20}
                color={colors.primary}
                enableRTL={true}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <ScrollView
          contentContainerStyle={styles.contain}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <DropDownPicker
              schema={{
                label: 'gate_name',
                value: 'gate_cd',
              }}
              listMode='MODAL'
              open={open}
              items={dataGate}
              setItems={setDataGate}
              setOpen={setOpen}
              value={valueGate}
              searchable={true}
              setValue={setValueGate}
              style={{
                paddingHorizontal: 20,
                height: 50,
                width: '100%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <DropDownPicker
              schema={{
                label: 'descs',
                value: 'lot_type',
              }}
              listMode='MODAL'
              open={openTower}
              items={dataTower}
              setItems={setDataTower}
              setOpen={setOpenTower}
              value={valueTower}
              searchable={true}
              setValue={setValueTower}
              onValueChange={(itemValue) =>
                // setValueTower(itemValue)
                chooseTower(itemValue)
              }
              onSelectItem={(itemValue) =>
                // setValueTower(itemValue)
                chooseTower(itemValue)
              }
              style={{
                paddingHorizontal: 20,
                height: 50,
                width: '100%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <DropDownPicker
              schema={{
                label: 'lot_no',
                value: 'lot_no',
              }}
              listMode='MODAL'
              open={openUnit}
              items={dataUnit}
              setItems={setDataUnit}
              setOpen={setOpenUnit}
              value={valueUnit}
              searchable={true}
              setValue={setValueUnit}
              onValueChange={(itemValue) =>
                // setValueTower(itemValue)
                chooseUnit(itemValue)
              }
              onSelectItem={(itemValue) =>
                // setValueTower(itemValue)
                chooseUnit(itemValue)
              }
              style={{
                paddingHorizontal: 20,
                height: 50,
                width: '100%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <DropDownPicker
              schema={{
                label: 'member_name',
                value: 'member_name',
              }}
              listMode='MODAL'
              open={openCust}
              items={dataCust}
              setItems={setDataCust}
              setOpen={setOpenCust}
              value={valueCust}
              searchable={true}
              setValue={setValueCust}
              onValueChange={(itemValue) =>
                // setValueTower(itemValue)
                setValueCust(itemValue)
              }
              onSelectItem={(itemValue) =>
                // setValueTower(itemValue)
                setValueCust(itemValue)
              }
              style={{
                paddingHorizontal: 20,
                height: 50,
                width: '100%',
              }}
            />
          </View>

          <View
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            <View style={styles.contentTitle}>
              <Text semibold>{t('Delivery Name')}</Text>
            </View>

            <TextInput
              style={{ width: '70%' }}
              autoCorrect={false}
              placeholder={t('Delivery Name')}
              value={nameDelivery}
              onChangeText={valueNameDelivery}
            />
          </View>
          <View
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            <View style={styles.contentTitle}>
              <Text semibold>{t('Delivery HP')}</Text>
            </View>

            <TextInput
              style={{ width: '70%' }}
              autoCorrect={false}
              placeholder={t('Delivery HP')}
              value={hpDelivery}
              onChangeText={valueHpDelivery}
              keyboardType='phone-pad'
              maxLength={14}
            />
          </View>
          <View
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            <View style={styles.contentTitle}>
              <Text semibold>{t('Sender Name')}</Text>
            </View>

            <TextInput
              style={{ width: '70%' }}
              autoCorrect={false}
              placeholder={t('Sender Name')}
              value={nameSender}
              onChangeText={valueSenderName}
            />
          </View>
          <View
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            <View style={styles.contentTitle}>
              <Text semibold>{t('Sender HP')}</Text>
            </View>

            <TextInput
              style={{ width: '70%' }}
              autoCorrect={false}
              placeholder={t('Sender HP')}
              value={hpSender}
              onChangeText={valueSenderHp}
              keyboardType='phone-pad'
              maxLength={14}
            />
          </View>

          <View
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Picker
                selectedValue={valueType}
                style={styles.dropdown2BtnStyle}
                accessibilityLabel='Select'
                onValueChange={(itemValue, itemIndex) =>
                  // setValueTower(itemValue)
                  setValueType(itemValue)
                }>
                <Picker.Item label={'Select Type'} value={''} enabled={false} />
                {dataType.map((item, index) => {
                  return (
                    <Picker.Item
                      value={item.package_type}
                      label={item.package_type}
                      key={index}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            <View style={styles.contentTitle}>
              <Text semibold>{t('Quantity')}</Text>
            </View>

            <TextInput
              style={{ width: '70%' }}
              autoCorrect={false}
              placeholder={t('QTY')}
              value={quantity}
              onChangeText={valueQuantity}
            />
          </View>
          <View style={styles.container}>
            <FlatList
              data={fileList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              extraData={state}
            />

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={takePhotoFromCamera}>
              <Text>Open Camera</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.buttonStyle}
              onPress={choosePhotoFromLibrary}>
              <Text>Open Gallery</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            full
            onPress={() => {
              onSubmit();
            }}>
            {t('send')}
          </Button>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Package;

/** @format */

import { Button, Header, Icon, SafeAreaView, Text } from '@components';
import { BaseStyle, useTheme } from '@config';
import { parseHexTransparency } from '@utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

export default function PackageComplate({ route, navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [passProp, setPassProp] = useState(route.params);
  console.log('urutan ke empat item', passProp);

  const itemId = { ...passProp };
  console.log('urutan ke empat itemid', itemId);

  const {
    package_id,
    gate_cd,
    package_picture,
    lot_no,
    package_qty,
    package_type,
    tenant_name,
    tower,
    received_by,
    received_date,
    deliveryman_name,
    deliveryman_hp,
  } = itemId;

  // const itemprops = { ...passProp };
  // console.log('urutan ke empat props', itemprops);

  const printPDF = async () => {
    const result = await RNHTMLtoPDF.convert({
      html: `<h1>Package ID = ${package_id}</h1>
      <h1>Tenant Name  = ${tenant_name}</h1>`,
      fileName: `${package_id}`,
      base64: true,
    });
    await RNPrint.print({ filePath: result.filePath });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header title={t('Submit Success')} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={[styles.headerView]}>
          <View
            style={{
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <Text subhead light style={{ marginBottom: 5 }}>
              {t('Package ID')}
            </Text>
            <Text title1>{package_id}</Text>
          </View>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: parseHexTransparency(colors.primary, 30),
            }}>
            <Icon name='check' size={48} color={colors.primary} />
          </View>
          <Text
            headline
            bold
            style={{
              marginTop: 30,
              marginBottom: 20,
            }}>
            {t('transaction_completed')}
          </Text>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              marginHorizontal: 50,
              textAlign: 'center',
            }}>
            <View style={{ flex: 1 }}>
              <Text capption1 grayColor>
                Gate
              </Text>
              <Text body1 style={{ paddingTop: 4 }}>
                {gate_cd}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text capption1 grayColor>
                Tenant Name
              </Text>
              <Text body1 style={{ paddingTop: 4 }}>
                {tenant_name}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              marginHorizontal: 50,
              textAlign: 'center',
            }}>
            <View style={{ flex: 1 }}>
              <Text capption1 grayColor>
                Tower
              </Text>
              <Text body1 style={{ paddingTop: 4 }}>
                {tower}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text capption1 grayColor>
                Unit
              </Text>
              <Text body1 style={{ paddingTop: 4 }}>
                {lot_no}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              marginHorizontal: 50,
              textAlign: 'center',
            }}>
            <View style={{ flex: 1 }}>
              <Text capption1 grayColor>
                Package Type
              </Text>
              <Text body1 style={{ paddingTop: 4 }}>
                {package_type}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text capption1 grayColor>
                Package Qty
              </Text>
              <Text body1 style={{ paddingTop: 4 }}>
                {package_qty}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              marginHorizontal: 50,
              textAlign: 'center',
            }}>
            <View style={{ flex: 1 }}>
              <Text capption1 grayColor>
                Delivery Name
              </Text>
              <Text body1 style={{ paddingTop: 4 }}>
                {deliveryman_name}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text capption1 grayColor>
                Delivery Hp
              </Text>
              <Text body1 style={{ paddingTop: 4 }}>
                {deliveryman_hp}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
          }}>
          <Button
            icon={
              <Icon
                name='plus'
                color={colors.primary}
                style={{ marginRight: 5 }}
              />
            }
            outline
            style={{
              marginHorizontal: 10,
              backgroundColor: colors.background,
            }}
            onPress={() => navigation.navigate('PackageHome')}>
            {t('Go Back')}
          </Button>
          <Button
            icon={
              <Icon
                name='plus'
                color={colors.primary}
                style={{ marginRight: 5 }}
              />
            }
            outline
            style={{
              marginHorizontal: 10,
              backgroundColor: colors.background,
            }}
            onPress={printPDF}>
            {t('Print to save')}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

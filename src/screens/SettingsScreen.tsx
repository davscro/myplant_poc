import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Container, Content, Input, Item, Header, Button } from "native-base";
import { firebaseInstance } from "../firebase_instance";

const getSensorPercentage = (sensorRead: number | any) => {
  const ret = Math.round((1 - (0 | sensorRead) / 1000) * 100);

  // return Math.round(100 - (sensorRead / 1000) * 100);

  console.log("RET", ret);
  return ret;
};

function ConfigInput({ label, value, onChange }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text>{label}</Text>

      <Item regular style={{ width: "30%" }}>
        <Input
          keyboardType={"numeric"}
          value={value}
          onChange={(e) => {
            const changeVal = 1000 - (0 | (e.nativeEvent.text as any)) * 10;
            console.log("CHNAGE", changeVal);
            onChange(changeVal);
          }}
        />
      </Item>
    </View>
  );
}

export default function SettingsScreen() {
  const [configData, updateConfigData] = useState({
    isr: 0,
    sm: 0,
    sms: 0,
  });
  const database = firebaseInstance.database();

  useEffect(() => {
    database.ref("/config").on("value", (snapshot) => {
      updateConfigData({ ...snapshot.val() });
    });
  }, []);

  const updatDBConfig = () => database.ref("/config").update({ ...configData });

  return (
    <Container>
      {/*<Header />*/}

      <Content style={{ padding: "5%" }}>
        <ConfigInput
          value={configData.isr.toString()}
          label={"SENSOR INTERVAL READ (MIN)"}
          onChange={(val: number) =>
            updateConfigData({
              ...configData,
              isr: val,
            })
          }
        />
        <ConfigInput
          value={getSensorPercentage(configData.sm).toString()}
          label={"MOISTURE THRESHOLD"}
          onChange={(val: number) =>
            updateConfigData({
              ...configData,
              sm: val,
            })
          }
        />
        <ConfigInput
          value={getSensorPercentage(configData.sms).toString()}
          label={"SAFETY SENSOR THRESHOLD"}
          onChange={(val: number) =>
            updateConfigData({
              ...configData,
              sms: val,
            })
          }
        />

        <View
          style={{
            paddingTop: "15%",
            // borderWidth: 1,
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            block
            warning
            style={{ padding: "3%", width: "50%" }}
            onPress={() => {
              console.log(configData);
              // updatDBConfig();
            }}
          >
            <Text> SAVE </Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

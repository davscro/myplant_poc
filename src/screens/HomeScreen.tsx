import { Text, View } from "react-native";
import { Button, Content } from "native-base";
import React, { useEffect, useState } from "react";

import { firebaseInstance } from "../firebase_instance";
import uuid from "uuid-random";
import ProgressScreen from "../components/ProgressCircle";

type Sensor = {
  pumpIsRunning: boolean;
  sensorAvg: number;
  sensorSafety: number;
  sensorTwo: number;
  sensorOne: number;
  timestamp: string;
};

const data = {
  pumpIsRunning: false,
  sensorAvg: 564,
  sensorSafety: 169,
  sensorTwo: 560,
  sensorOne: 568,
  timestamp: new Date("1595966589129").toLocaleString(),
};

export default function HomeScreen() {
  const [sensorData, setData] = useState<Sensor>(data);
  const database = firebaseInstance.database();

  useEffect(() => {
    // @ts-ignore
    const updateState = (dataSnapshot) => {
      const item: Sensor = {
        pumpIsRunning: dataSnapshot.pump_is_running,
        sensorAvg: dataSnapshot.sensor_avg,
        sensorSafety: dataSnapshot.sensor_one,
        sensorOne: dataSnapshot.sensor_two,
        sensorTwo: dataSnapshot.sensor_three,
        timestamp: new Date(dataSnapshot.timestamp).toLocaleString(),
      };
      setData(item);
    };

    //set on listener
    database
      .ref("/sensors/")
      .orderByChild("timestamp")
      .limitToLast(1)
      .on("child_added", (snapshot) => updateState(snapshot.val()));

    const getData = async () => {
      const data = await database
        .ref("/sensors/")
        .orderByChild("timestamp")
        .limitToLast(1)
        .once("value");

      data.forEach((_) => updateState(_.val()));
    };
    getData();
  }, []);

  const readSensorData = () =>
    database.ref().update({
      read_sensors: uuid(),
    });

  const startPump = () =>
    database.ref().update({
      pump: true,
    });
  const stopPump = () =>
    database.ref().update({
      pump: false,
    });

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "20%",
        }}
      >
        <ProgressScreen
          name={sensorData.timestamp}
          percentage={sensorData.sensorAvg}
          size={200}
          width={30}
        />
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
      <Content style={{ padding: "5%" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ProgressScreen name="Sensor 1" percentage={sensorData.sensorOne} />
          <ProgressScreen name="Sensor 2" percentage={sensorData.sensorTwo} />
          <ProgressScreen
            name="Safe Sensor"
            percentage={sensorData.sensorSafety}
          />
        </View>
        <View
          style={{
            paddingTop: "15%",
            // borderWidth: 1,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            block
            warning
            style={{ padding: "3%" }}
            onPress={() => {
              readSensorData();
            }}
          >
            <Text> READ SENSORS </Text>
          </Button>
          <Button
            block
            success
            style={{ padding: "3%" }}
            onPress={() => {
              startPump();
            }}
          >
            <Text> WATER THE PLANT </Text>
          </Button>
        </View>
      </Content>
    </>
  );
}

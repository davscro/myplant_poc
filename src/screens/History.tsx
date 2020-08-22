import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native/lib";
import { View } from "native-base";

const sensors = {
  "-MFCdPZTf7te3_4EJcns": {
    datetime: "8/20/2020, 10:53:14 PM",
    pump_is_running: false,
    sensor_avg: 474,
    sensor_one: 111,
    sensor_three: 389,
    sensor_two: 560,
    timestamp: 1597956794257,
  },
  "-MFEibnHKzNM18M3Wsfq": {
    datetime: "8/21/2020, 8:35:13 AM",
    pump_is_running: false,
    sensor_avg: 456,
    sensor_one: 143,
    sensor_three: 421,
    sensor_two: 492,
    timestamp: 1597991713419,
  },
  "-MFF_StcOjV8CvPjT86F": {
    datetime: "8/21/2020, 12:34:50 PM",
    pump_is_running: false,
    sensor_avg: 387,
    sensor_one: 326,
    sensor_three: 330,
    sensor_two: 444,
    timestamp: 1598006090904,
  },
  "-MFGRMjTF5HYajZWq1MS": {
    datetime: "8/21/2020, 4:34:43 PM",
    pump_is_running: true,
    sensor_avg: 485,
    sensor_one: 731,
    sensor_three: 485,
    sensor_two: 485,
    timestamp: 1598020483532,
  },
  "-MFHIGNCPVEMIgTDgxVw": {
    datetime: "8/21/2020, 8:34:35 PM",
    pump_is_running: false,
    sensor_avg: 488,
    sensor_one: 667,
    sensor_three: 504,
    sensor_two: 473,
    timestamp: 1598034875499,
  },
};

const blah = Object.values(sensors).reduce(
  // @ts-ignore
  (acc, current, idx) => {
    return {
      avg: [
        ...acc.avg,
        {
          x: idx,
          y: current.sensor_avg,
          avg: current.sensor_avg,
          ts: new Date(current.timestamp).toLocaleTimeString(),
          dt: current.datetime,
          pump: current.pump_is_running,
        },
      ],
      safe: [
        ...acc.safe,
        {
          x: idx,
          y: current.sensor_one,
          avg: current.sensor_avg,
          ts: new Date(current.timestamp).toLocaleTimeString(),
          dt: current.datetime,
        },
      ],
      border: [
        ...acc.border,
        {
          x: idx,
          y: 600,
        },
      ],
    };
  },
  { avg: [], safe: [], border: [] }
);

console.log("blah", blah);

export function History() {
  return (
    <View style={{ paddingTop: 50 }}>
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            activateData={false}
            voronoiDimension="x"
            labels={({ datum }) => {
              if (!datum.ts) return null;
              if (datum.avg === datum.y) return null;

              return `dt: ${datum.dt} avg: ${datum.avg} safe: ${datum.y}`;
            }}
            // voronoiPadding={15}
            labelComponent={
              <VictoryTooltip
                center={{ x: 200, y: 0 }}
                pointerWidth={10}
                constrainToVisibleArea
                pointerOrientation={"top"}
                cornerRadius={0}
                flyoutStyle={{ fill: "white" }}
              />
            }
          />
        }
      >
        <VictoryLine
          // labels={({ datum }) => datum.y}

          style={{
            data: { stroke: "red" },
            parent: { border: "1px solid #ccc" },
          }}
          data={blah.safe}
        />
        <VictoryLine
          style={{
            data: { strokeDasharray: "5,5" },
          }}
          data={blah.border}
        />
        <VictoryLine
          labels={({ datum }) => (datum.pump ? `⛽` : "")}
          style={{
            data: { stroke: "blue" },
            parent: { border: "1px solid #ccc" },
          }}
          data={blah.avg}
        />
      </VictoryChart>
    </View>
  );
}

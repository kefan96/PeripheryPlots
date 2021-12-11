import React from "react";
import * as d3 from "d3";
import ReactDOM from "react-dom";
import _ from "lodash";

import LineGroup from "./encodings/TVPE/LineGroup.jsx";
import BarGroup from "./encodings/TVPE/BarGroup.jsx";
import ScatterGroup from "./encodings/TVPE/ScatterGroup.jsx";
import TimeTraceGroup from "./encodings/TPE/TimeTraceGroup.jsx";
import QuantitativeTraceGroup from "./encodings/VPE/QuantitativeTraceGroup.jsx";
import AverageLine from "./encodings/VPE/AverageLine.jsx";
import MedianLine from "./encodings/VPE/MedianLine.jsx";
import VistaViewer from "./components/VistaViewer.jsx";

import * as covidData from "../data/owid-covid-data.json";

// let data = [];
// function processRow(row) {
//   if (row && row.date) {
//     row.date = new Date(row.date);
//     let floatKeys = ["precipitation", "temp_max", "temp_min", "wind"];
//     for (let key of floatKeys) row[key] = parseFloat(row[key]);
//     data.push(row);
//   }
// }

let data = covidData.default.USA.data.slice(50, 10000);
console.log(data);
data.forEach((d) => {
  d.date = new Date(d.date);
  d.new_deaths_above_1000 = d.new_deaths > 1000;
});
let dateExtent = d3.extent(data.map((d) => d.date));
let config = {
  title: "Visulization of COVID-19 temporal data in USA",
  trackwiseObservations: [data, data, data, data, data],
  trackwiseTimeKeys: ["date", "date", "date", "date", "date"],
  trackwiseValueKeys: [
    "total_cases",
    "new_cases",
    "positive_rate",
    "new_deaths",
    "new_deaths_above_1000",
  ],
  trackwiseUnits: [null, null, null, null, null],
  trackwiseEncodings: [
    [
      [BarGroup, AverageLine, MedianLine],
      [LineGroup, AverageLine, MedianLine],
      [BarGroup, AverageLine, MedianLine],
    ],
    [
      [QuantitativeTraceGroup, AverageLine, MedianLine],
      [BarGroup, AverageLine, MedianLine],
      [QuantitativeTraceGroup, AverageLine, MedianLine],
    ],
    [
      [QuantitativeTraceGroup, AverageLine, MedianLine],
      [LineGroup, AverageLine, MedianLine],
      [QuantitativeTraceGroup, AverageLine, MedianLine],
    ],
    [
      [QuantitativeTraceGroup, AverageLine, MedianLine],
      [ScatterGroup, AverageLine, MedianLine],
      [QuantitativeTraceGroup, AverageLine, MedianLine],
    ],
    [TimeTraceGroup, TimeTraceGroup, TimeTraceGroup],
  ],
  timeExtentDomain: dateExtent,
  timeDomains: [
    ["06/01/2020", "10/01/2020"].map((dateStr) => new Date(dateStr)),
    ["10/01/2020", "01/01/2021"].map((dateStr) => new Date(dateStr)),
    ["01/01/2021", "05/01/2021"].map((dateStr) => new Date(dateStr)),
  ],
};

// d3.csv("../data/seattle-weather.csv", processRow).then(() => {
//   let dateExtent = d3.extent(data.map((d) => d.date));

//   // Testing with 3 tracks
//   let config = {
//     // Parameters to construct tracks
//     trackwiseObservations: [data, data, data, data],
//     trackwiseTimeKeys: ["date", "date", "date", "date"],
//     trackwiseValueKeys: ["temp_max", "precipitation", "wind", "weather"],
//     trackwiseUnits: ["celsius", "inches", "km / hr", null],
//     trackwiseEncodings: [
//       [
//         [QuantitativeTraceGroup, AverageLine],
//         [LineGroup, AverageLine],
//         [QuantitativeTraceGroup, AverageLine],
//       ],
//       [
//         [BarGroup, AverageLine],
//         [BarGroup, AverageLine],
//         [BarGroup, AverageLine],
//       ],
//       [
//         [ScatterGroup, AverageLine],
//         [LineGroup, AverageLine],
//         [ScatterGroup, AverageLine],
//       ],
//       [NominalTraceGroup, EventGroup, NominalTraceGroup],
//     ],

//     // Parameters to construct control
//     timeExtentDomain: dateExtent,
//     timeDomains: [
//       ["02/02/2012", "02/01/2013"].map((dateStr) => new Date(dateStr)),
//       ["02/02/2013", "02/01/2014"].map((dateStr) => new Date(dateStr)),
//       ["02/02/2014", "02/01/2015"].map((dateStr) => new Date(dateStr)),
//     ],
//   };

ReactDOM.render(
  <VistaViewer config={config} />,
  document.getElementById("ROOT")
);

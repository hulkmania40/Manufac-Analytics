import "./App.css";
import Table from "./components/Table";
import React, { FC } from "react";
import { data } from "./data/Wine-Data";

type AppProps = {};

export interface DataProps {
  alcohol: number;
  malicAcid: number;
  ash: string | number;
  alcalinityOfAsh: number;
  magnesium: number;
  totalPhenols: number;
  flavanoids: string | number;
  nonflavanoidPhenols: string | number;
  proanthocyanins: string | number;
  colorIntensity: string | number;
  hue: number;
  dilutedWines: string | number;
  unknown: number;
}

const App: FC<AppProps> = () => {
  const updatedDataFormat: DataProps[] = [];

  // Bring the data down to a particular format
  data.forEach((res) => {
    updatedDataFormat.push({
      alcalinityOfAsh: res["Alcalinity of ash"],
      alcohol: res["Alcohol"],
      ash: res["Ash"],
      colorIntensity: res["Color intensity"],
      dilutedWines: res["OD280/OD315 of diluted wines"],
      flavanoids: res["Flavanoids"],
      hue: res["Hue"],
      magnesium: res["Magnesium"],
      malicAcid: res["Malic Acid"],
      nonflavanoidPhenols: res["Nonflavanoid phenols"],
      proanthocyanins: res["Proanthocyanins"],
      totalPhenols: res["Total phenols"],
      unknown: res["Unknown"],
    });
  });

  const calculateMeanMedianMode = (data: DataProps[]) => {
    // Create an object to store the sum, count, and occurrences for each Alcohol class
    const alcoholStats: any = {};

    // Iterate through the data array
    data.forEach((entry) => {
      const alcoholClass = entry.alcohol;
      const flavinoids = Number(entry.flavanoids);

      // If the Alcohol class does not exist in the alcoholStats object, initialize it
      if (!alcoholStats[alcoholClass]) {
        alcoholStats[alcoholClass] = { sum: 0, count: 0, occurrences: {} };
      }

      alcoholStats[alcoholClass].sum += flavinoids;
      alcoholStats[alcoholClass].count++;

      // Count the occurrences of Alcohol Stats for each Alcohol class
      alcoholStats[alcoholClass].occurrences[flavinoids] =
        (alcoholStats[alcoholClass].occurrences[flavinoids] || 0) + 1;
    });

    // Calculate the mean, median, and mode for each Alcohol class and store the results in an array
    const result = [];
    for (const alcoholClass in alcoholStats) {
      const { sum, count, occurrences } = alcoholStats[alcoholClass];
      const mean = sum / count;

      const sortedFlavinoids = Object.keys(occurrences)
        .map(Number)
        .sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedFlavinoids.length / 2);
      const median =
        sortedFlavinoids.length % 2 === 0
          ? (sortedFlavinoids[middleIndex - 1] +
              sortedFlavinoids[middleIndex]) /
            2
          : sortedFlavinoids[middleIndex];

      let mode = 0;
      let maxOccurrences = 0;
      for (const flavinoidValue in occurrences) {
        const occurrenceCount = occurrences[flavinoidValue];
        if (occurrenceCount > maxOccurrences) {
          mode = +flavinoidValue;
          maxOccurrences = occurrenceCount;
        }
      }

      result.push({
        alcohol_class: +alcoholClass,
        mean: mean,
        median: median,
        mode: mode,
      });
    }

    return result;
  };

  const calculateGammaStats = (data: DataProps[]) => {
    // Create an object to store the sum, count, and occurrences of Gamma for each Alcohol class
    const alcoholStats: any = {};

    // Iterate through the data array
    data.forEach((entry) => {
      const alcoholClass = entry.alcohol;
      const ash = Number(entry.ash);
      const magnesium = entry.magnesium;
      const hue = entry.hue;

      // Calculate Gamma
      const gamma = (ash * hue) / magnesium;

      // If the Alcohol class does not exist in the alcoholStats object, initialize it
      if (!alcoholStats[alcoholClass]) {
        alcoholStats[alcoholClass] = { sum: 0, count: 0, occurrences: {} };
      }

      // Accumulate the sum and count of Gamma for each Alcohol class
      alcoholStats[alcoholClass].sum += gamma;
      alcoholStats[alcoholClass].count++;

      // Count the occurrences of Gamma for each Alcohol class
      alcoholStats[alcoholClass].occurrences[gamma] =
        (alcoholStats[alcoholClass].occurrences[gamma] || 0) + 1;
    });

    // Calculate the mean, median, and mode for each Alcohol class and store the results in an array
    const result = [];
    for (const alcoholClass in alcoholStats) {
      const { sum, count, occurrences } = alcoholStats[alcoholClass];
      const mean = sum / count;

      const sortedGammas = Object.keys(occurrences)
        .map(Number)
        .sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedGammas.length / 2);
      const median =
        sortedGammas.length % 2 === 0
          ? (sortedGammas[middleIndex - 1] + sortedGammas[middleIndex]) / 2
          : sortedGammas[middleIndex];

      let mode = 0;
      let maxOccurrences = 0;
      for (const gammaValue in occurrences) {
        const occurrenceCount = occurrences[gammaValue];
        if (occurrenceCount > maxOccurrences) {
          mode = +gammaValue;
          maxOccurrences = occurrenceCount;
        }
      }

      result.push({
        alcohol_class: +alcoholClass,
        mean: mean,
        median: median,
        mode: mode,
      });
    }

    return result;
  };

  const statsPerAlcoholClass = calculateMeanMedianMode(updatedDataFormat);
  const GammaStatsPerAlcoholClass = calculateGammaStats(updatedDataFormat);

  return (
    <div className="App">
      <Table title={"Flavonoids"} data={statsPerAlcoholClass} />
      <Table title={"Gamma"} data={GammaStatsPerAlcoholClass} />
    </div>
  );
};

export default App;

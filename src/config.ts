/*
Config file which can be updated by the carrier.

Assumptions: The carrier inputs sensible values eg. the volume of a
small parcel is not greater than a medium parcel.

Improvements: Extend config to handle multiple carriers.
*/

interface IConfigValues {
  [field: string]: string | number;
}

interface IParcel {
  small: number;
  medium: number;
  large: number;
}

interface IConfig {
  dimensions: {
    length: IParcel;
    breadth: IParcel;
    height: IParcel;
  };
  cost: IConfigValues;
  maxWeight: number;
  units: IConfigValues;
}

const config: IConfig = {
  dimensions: {
    length: {
      small: 200,
      medium: 300,
      large: 400,
    },
    breadth: {
      small: 300,
      medium: 400,
      large: 600,
    },
    height: {
      small: 150,
      medium: 200,
      large: 250,
    },
  },
  cost: {
    small: 5,
    medium: 7.5,
    large: 8.5,
  },
  maxWeight: 25,
  units: {
    length: "mm",
    breadth: "mm",
    height: "mm",
    weight: "kg",
  },
};

export default config;

import React, { useState } from "react";
import { useFormik } from "formik";
import { Alert, Button } from "@mui/material";
import { Box } from "@mui/system";
import FormInput from "../FormInput/FormInput";
import validationSchema from "./ParcelFormValidation";
import config from "../../config";
import { capitalize } from "lodash";

/*
Improvement: Create a form button component
*/

interface IValues {
  length: string;
  breadth: string;
  height: string;
  weight: string;
}

enum ParcelSize {
  small = 0,
  medium = 1,
  large = 2,
}

const initialValues: IValues = {
  length: "",
  breadth: "",
  height: "",
  weight: "",
};

const initialAlert = {
  success: {
    show: false,
    message: "",
  },
  error: {
    show: false,
    message: "Sorry the entered parcel dimensions exceeds our largest parcel size.",
  },
};

const ParcelForm = () => {
  const [alert, setAlert] = useState(initialAlert);

  /* 
  A parcel can be orientated in different ways to get varying
  length, width, height values. This means a user can input a value 
  that is an invalid height but is a valid breadth. We need to take
  the users dimension inputs and check them against all combinations
  of dimensions to get the right parcel size.

  Ideally the business logic in method will be in a backend handler 
  accessible through an API

  Assumptons: In the config, breadth.small > length.small > height.small
  vice versa for medium and large.
  */
  const calculateParcelSize = (values: IValues): ParcelSize | undefined => {
    const { breadth, length, height } = values;
    // Parcel dimensions are sorted in descending order
    const parcelDimensions = [
      config.dimensions.breadth,
      config.dimensions.length,
      config.dimensions.height,
    ];

    // Sort user's dimensions in descending order
    const userDimensions = [Number(breadth), Number(length), Number(height)]
      .sort((a, b) => a - b)
      .reverse();

    var parcelSize = ParcelSize.small;
    // Compare user's dimensions with parcel dimensions
    for (var i = 0; i < parcelDimensions.length; i++) {
      const userSide = userDimensions[i];
      // If the user's side is bigger than the largest side -> invalid
      if (userSide > parcelDimensions[i].large) {
        return undefined;
      }
      if (userSide <= parcelDimensions[i].small && parcelSize === ParcelSize.small) {
        // Continue since the default parcel size is small
        continue;
      }
      parcelSize =
        userSide <= parcelDimensions[i].medium && parcelSize <= ParcelSize.medium
          ? ParcelSize.medium
          : ParcelSize.large;
    }
    return parcelSize;
  };

  const displayAlert = (parcelSize: ParcelSize | undefined) => {
    if (parcelSize !== undefined) {
      const successMessage = `Your parcel size is: ${capitalize(ParcelSize[parcelSize])} ($${Number(
        config.cost[ParcelSize[parcelSize]]
      ).toFixed(2)})`;
      setAlert({
        ...initialAlert,
        success: {
          show: true,
          message: successMessage,
        },
      });
    } else {
      setAlert({
        ...initialAlert,
        error: {
          ...alert.error,
          show: true,
        },
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => displayAlert(calculateParcelSize(values)),
  });

  const resetHandleClick = () => {
    formik.resetForm();
    setAlert(initialAlert);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {Object.keys(initialValues).map((input) => {
        return <FormInput formik={formik} id={input} key={input} />;
      })}
      <Box pt={6}>
        <Button variant="contained" fullWidth type="submit">
          Calculate my parcel
        </Button>
      </Box>
      <Box pt={2}>
        <Button variant="outlined" fullWidth onClick={resetHandleClick}>
          Reset
        </Button>
      </Box>
      <Box pt={2}>
        {alert.success.show && <Alert severity="success">{alert.success.message}</Alert>}
        {alert.error.show && <Alert severity="error">{alert.error.message}</Alert>}
      </Box>
    </form>
  );
};

export default ParcelForm;

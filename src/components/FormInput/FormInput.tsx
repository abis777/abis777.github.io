import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { FormikValues } from "formik";
import { capitalize } from "lodash";
import config from "../../config";

interface IFormInputProps {
  formik: FormikValues;
  id: string;
}

function FormInput(props: IFormInputProps) {
  const { formik, id } = props;
  const label = `${capitalize(id)}*`;

  return (
    <Box pt={3}>
      <TextField
        fullWidth
        id={id}
        name={id}
        label={label}
        value={formik.values[id]}
        onChange={formik.handleChange}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        helperText={formik.touched[id] && formik.errors[id]}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{config.units[id]}</InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default FormInput;

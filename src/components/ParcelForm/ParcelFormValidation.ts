import * as yup from "yup";
import config from "../../config";

const maxWeight = config.maxWeight;
const weightUnit = config.units.weight;

const validationSchema = yup.object({
  length: yup
    .number()
    .positive("Please enter a positive number")
    .integer("Please enter an integer")
    .required("Length is required"),
  breadth: yup
    .number()
    .positive("Please enter a positive number")
    .integer("Please enter an integer")
    .required("Breadth is required"),
  height: yup
    .number()
    .positive("Please enter a positive number")
    .integer("Please enter an integer")
    .required("Height is required"),
  weight: yup
    .number()
    .positive("Please enter a positive number")
    .max(maxWeight, `Sorry the weight can not be more than ${maxWeight}${weightUnit}`)
    .required("Weight is required"),
});

export default validationSchema;

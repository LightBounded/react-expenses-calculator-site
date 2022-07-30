import { Formik, Form, Field } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";

export const BudgetForm = ({ data, setData }) => {
  const validationSchema = Yup.object({
    budget: Yup.number()
      .required("Budget cannot be empty.")
      .typeError("Budget must be a number.")
      .min(0, "Budget must be greater than or equal to 0."),
  });
  return (  
    <Formik
      initialValues={{
        budget: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        setData({ ...data, budget: values.budget });
        resetForm();
      }}>
      <Form
        noValidate
        className="bg-white border border-gray-200 shadow-lg w-max mb-8 p-4">
        <Field name="budget" type="number" label="Budget" as={TextField} />
        <button
          type="submit"
          className="border-2 border-green-400 text-green-400 font-bold uppercase text-sm mt-3 px-5 py-2 transition duration-300 hover:bg-green-400 hover:text-white focus:outline-none focus:ring-[3px] focus:ring-green-200">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

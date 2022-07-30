import { Formik, Form, Field } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import Expense from '../ExpenseClass';

export const ExpenseForm = ({ data, setData }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title cannot be empty.'),
    amount: Yup.number()
      .required('Amount cannot be empty')
      .typeError('Amount must be a number.')
      .positive('Amount must be positive.'),
  });
  return (
    <Formik
      initialValues={{
        title: '',
        amount: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const expense = new Expense(values.title, values.amount);
        setData({
          ...data,
          expenses: [
            ...data.expenses,
            {
              ...expense.getDetails(),
              id: Math.floor(Math.random() * 1000) + 9000,
            },
          ],
        });
        resetForm();
      }}
    >
      <Form
        noValidate
        className="bg-white border border-gray-200 shadow-lg w-max p-4"
      >
        <Field
          name="title"
          type="text"
          label="Title"
          as={TextField}
          className="mb-3"
        />
        <Field name="amount" type="number" label="Amount" as={TextField} />
        <button
          type="submit"
          className="border-2 border-red-400 text-red-400 font-bold uppercase text-sm mt-3 px-5 py-2 transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-[3px] focus:ring-red-200"
        >
          Add
        </button>
      </Form>
    </Formik>
  );
};

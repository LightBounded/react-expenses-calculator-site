import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Formik, Field, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';

export default function EditExpenseModal({
  isOpen,
  setIsOpen,
  selectedExpense,
  data,
  setData,
}) {
  const cancelButtonRef = useRef(null);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title cannot be empty.'),
    amount: Yup.number()
      .required('Amount cannot be empty')
      .typeError('Amount must be a number.')
      .positive('Amount must be positive.'),
  });

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={isOpen}
        onClose={setIsOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white text-left shadow-xl transform transition-all sm:align-middle">
              <div className="text-xl uppercase pt-4 px-4">Edit Expense</div>
              <div className="bg-white px-4 pt-2 pb-4">
                <Formik
                  initialValues={{
                    title: selectedExpense.title,
                    amount: selectedExpense.amount,
                  }}
                  onSubmit={values => {
                    setData({
                      ...data,
                      expenses: data.expenses.map(
                        element =>
                          (element =
                            element.id === selectedExpense.id
                              ? {
                                  title: values.title,
                                  amount: values.amount,
                                  id: selectedExpense.id,
                                }
                              : element)
                      ),
                    });
                    setIsOpen(false);
                  }}
                  validationSchema={validationSchema}
                >
                  <Form>
                    <Field
                      name="title"
                      type="text"
                      label="Title"
                      as={TextField}
                      className="mb-3"
                    />
                    <Field
                      name="amount"
                      type="number"
                      label="Amount"
                      as={TextField}
                    />
                    <button
                      type="submit"
                      className="border-2 border-purple-400 text-purple-400 font-bold uppercase text-sm mt-3 mr-2 px-5 py-2 transition duration-300 hover:bg-purple-400 hover:text-white focus:outline-none focus:ring-[3px] focus:ring-purple-200"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      ref={cancelButtonRef}
                      className="font-bold uppercase text-sm mt-3 px-5 py-2 transition duration-300 focus:outline-none focus:ring-[3px] focus:ring-gray-200"
                    >
                      Cancel
                    </button>
                  </Form>
                </Formik>
              </div>

              {/* <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

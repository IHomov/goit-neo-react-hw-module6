import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";

import { IMaskInput } from "react-imask";
import styles from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsSlice";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Max 50 characters")
    .required("Name is required"),
  number: yup
    .string()
    .min(7, "Number must be at least 7 digits")
    .matches(/^\d{7}$/, "Number must be 7 digits") // Перевірка на рівно 7 цифр
    .required("Number is required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = { id: nanoid(), ...values };
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        const handleMaskAccept = (_, mask) => {
          setFieldValue("number", mask.unmaskedValue);
        };
        return (
          <Form className={styles.form}>
            <label>
              Name:
              <Field type="text" name="name" className={styles.field} />
              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />
            </label>
            <br />
            <label>
              Number:
              <IMaskInput
                mask="000-00-00"
                value={values.number}
                onAccept={handleMaskAccept}
                className={styles.field}
                type="tel"
                placeholder="XXX-XX-XX"
              />
              <ErrorMessage
                name="number"
                component="span"
                className={styles.error}
              />
            </label>
            <br />
            <button type="submit">Add Contact</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactForm;

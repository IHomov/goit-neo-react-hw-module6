import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { nanoid } from "nanoid";
import styles from "./ContactForm.module.css";
import { IMaskInput } from "react-imask";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Max 50 characters")
    .required("Name is required"),

  number: yup
    .string()
    .min(3, "Number must be at least 3 characters")
    .matches(/^\d{7}$/, "Number must be exactly 7 digits (e.g., 991-23-45)")
    .max(50, "Max 50 characters")
    .required("Number is required"),
});

const ContactForm = ({ handleCreate }) => {
  const handleSubmit = (values, actions) => {
    const newContact = { id: nanoid(), ...values };
    handleCreate(newContact);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({values, setFieldValue}) => {
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
                onAccept={handleMaskAccept} // Використовуємо винесену функцію
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

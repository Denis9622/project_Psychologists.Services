import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './AppointmentForm.module.css';
import { appointmentSchema } from '../Validation/validationSchema';

const timeOptions = [
  { value: '09:00', label: '09:00 AM' },
  { value: '09:30', label: '09:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '13:00', label: '01:00 PM' },
];

const CustomSelect = ({ field, form, options, placeholder }) => {
  return (
    <div className={styles.formGroup}>
      <div className={styles.selectWrapper}>
        <img src="/images/clock.svg" alt="Clock" className={styles.clockIcon} />
        <select
          {...field}
          className={`${styles.selectInput} ${styles.selectInputWithIcon}`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {form.touched[field.name] && form.errors[field.name] && (
        <p className={styles.error}>{form.errors[field.name]}</p>
      )}
    </div>
  );
};

function AppointmentForm({ psychologist, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = ''; 
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <button onClick={onClose} className={styles.closeButton}>
          <img
            src="/images/close.svg"
            alt="Checkmark"
            className={styles.checkmark131}
          />
        </button>
        <h2 className={styles.h2class}>
          Make an appointment <br /> with a psychologist
        </h2>
        <p className={styles.textclass}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>
        <div className={styles.psychologistInfo}>
          <img
            src={psychologist.avatar_url}
            alt={psychologist.name}
            className={styles.avatar}
          />
          <div>
            <p className={styles.psychologistLabel}>Your psychologist</p>
            <p className={styles.psychologistName}>{psychologist.name}</p>
          </div>
        </div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            comment: '',
            date: '',
            time: '',
          }}
          validationSchema={appointmentSchema}
          onSubmit={values => {
            console.log('Appointment request data:', values);
            onClose();
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={styles.input}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className={styles.error}
                />
              </div>
              <div className={styles.flexRow}>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                  <Field
                    type="tel"
                    name="phone"
                    placeholder="+380"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className={styles.error}
                  />
                </div>
                <div
                  className={styles.formGroup}
                  style={{ flex: 1, marginLeft: '16px' }}
                >
                  <Field
                    name="time"
                    options={timeOptions}
                    placeholder="Meeting Time"
                    component={CustomSelect}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                  className={styles.input}
                />
                <ErrorMessage
                  name="comment"
                  component="p"
                  className={styles.error}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AppointmentForm;

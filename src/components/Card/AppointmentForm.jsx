import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './AppointmentForm.module.css';

// Схема валидации
const appointmentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, 'Phone number must be in format +380xxxxxxxxx')
    .required('Phone number is required'),
  comment: yup.string().required('Comment is required'),
  date: yup.date().required('Date is required'),
  time: yup.string().required('Time is required'),
});

function AppointmentForm({ psychologist, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

  const onSubmit = data => {
    console.log('Appointment request data:', data);
    // Здесь можно добавить логику отправки данных на сервер или Firebase
    onClose();
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.h2class}>
        Make an appointment with a psychologist
      </h2>
      <p className={styles.textclass}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.label}>
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </label>
        <label className={styles.label}>
          <input
            type="tel"
            placeholder="+380"
            {...register('phone')}
            className={styles.input}
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </label>
        <label className={styles.label}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </label>
        <label className={styles.label}>
          <textarea
            placeholder="Comment"
            {...register('comment')}
            className={styles.input}
          />
          {errors.comment && (
            <p className={styles.error}>{errors.comment.message}</p>
          )}
        </label>
        <label className={styles.label}>
          Meeting time:
          <input type="date" {...register('date')} className={styles.input} />
          {errors.date && <p className={styles.error}>{errors.date.message}</p>}
        </label>
        <label className={styles.label}>
          Time:
          <input type="time" {...register('time')} className={styles.input} />
          {errors.time && <p className={styles.error}>{errors.time.message}</p>}
        </label>
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;

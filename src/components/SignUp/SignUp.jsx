import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from './../Validation/validationSchema';
import { register as registerUser } from './../Auth/auth';
import styles from './SignUp.module.css';
import { useAuth } from './../utilits/authContext';

function SignUp({ onClose }) {
  const { setCurrentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async data => {
    try {
      const user = await registerUser(data.email, data.password, data.name); // Передаем name
      setCurrentUser(user); // Обновляем состояние пользователя
      setMessage('Регистрация успешна! Добро пожаловать!');
      onClose(); // Закрываем модальное окно
    } catch (error) {
      console.error('Ошибка регистрации: ', error);
      setMessage('Ошибка регистрации. Попробуйте снова.');
    }
  };

  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2 className={styles.h2class}>Registration</h2>
          <p className={styles.textclass}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              className={styles.input}
            />
            <span
              onClick={togglePasswordVisibility}
              className={styles.passwordToggle}
            >
              <img
                src={showPassword ? '/images/eye.svg' : '/images/eye-off.svg'}
                alt="Toggle visibility"
                className={styles.checkmark13}
              />
            </span>
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>

          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;

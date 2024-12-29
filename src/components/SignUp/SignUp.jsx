import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from './../Validation/validationSchema';
import { register as registerUser } from './../Auth/auth'; // Импорт функции регистрации
import styles from './SignUp.module.css';
import { useAuth } from './../utilits/authContext'; // Импортируем хук useAuth

function SignUp({ onClose }) {
  const { setCurrentUser } = useAuth(); // Получаем метод для обновления состояния пользователя
  const [showPassword, setShowPassword] = useState(false); // Состояние видимости пароля
  const [message, setMessage] = useState(''); // Состояние для уведомлений

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async data => {
    console.log('SignUp form submitted with data: ', data); // Логируем данные формы
    try {
      const user = await registerUser(data.email, data.password);
      console.log('User registered successfully: ', user); // Логируем успешную регистрацию
      setCurrentUser(user); // Обновляем состояние пользователя
      setMessage('Регистрация успешна! Добро пожаловать!');
    } catch (error) {
      console.error('Error registering user: ', error); // Логируем ошибку
      if (error.code) {
        console.error('Error code:', error.code);
      }
      if (error.message) {
        console.error('Error message:', error.message);
      }
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
          <h2 className={styles.h2class}>Регистрация</h2>
          <p className={styles.textclass}>
            Спасибо за интерес к нашей платформе! Пожалуйста, заполните форму
            ниже для регистрации.
          </p>
          <input
            type="text"
            placeholder="Имя"
            className={styles.input}
            {...register('name')}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            {...register('email')}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              className={styles.input}
              {...register('password')}
            />
            <span
              onClick={togglePasswordVisibility}
              className={styles.passwordToggleIcon}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    stroke="#407BFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.574-3.007-9.964-7.178Z"
                  />
                  <path
                    stroke="#407BFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    stroke="#2F2F2F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65A3 3 0 1 0 9.88 9.879m4.242 4.242L9.881 9.88"
                  />
                </svg>
              )}
            </span>
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <button type="submit" className={styles.submitButton}>
            Зарегистрироваться
          </button>

          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../Validation/validationSchema';
import { login } from '../Auth/auth';
import styles from './SignIn.module.css';
import { useAuth } from '../../utilits/authContext';

function SignIn({ onClose }) {
  const { setCurrentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async data => {
    try {
      const user = await login(data.email, data.password);
      setCurrentUser(user);
      setMessage('Login successful!');
      onClose();
    } catch (error) {
      setMessage('Error during login. Please try again.');
    }
  };

  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img
                      src="/images/close.svg"
                      alt="Checkmark"
                      className={styles.checkmark131}
                    />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2 className={styles.h2class}>Log In</h2>
          <p className={styles.textclass}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
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
            Login
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignIn;

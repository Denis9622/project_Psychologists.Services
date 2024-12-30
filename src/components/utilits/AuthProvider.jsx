import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { subscribeToAuthChanges } from './authFunctions';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(user => {
      setCurrentUser(user);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe(); // Проверяем, что unsubscribe это функция перед вызовом
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

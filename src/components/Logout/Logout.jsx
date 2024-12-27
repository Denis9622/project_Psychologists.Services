import { useEffect } from 'react';
import { logout } from './../Auth/auth';

function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <div>
      <h2>You have been logged out</h2>
    </div>
  );
}

export default Logout;

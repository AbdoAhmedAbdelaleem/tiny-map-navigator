import { useEffect } from 'react';

// This component just work as itermediate between user is logdin and signout should clear anything relate to user
// now we have only UserStatus we clear it and reload 
const LogOut = () => {
  useEffect(() => {
    delete localStorage.USER_STATUS
    window.location.reload();
  }, []);

  return null
};

export default LogOut;

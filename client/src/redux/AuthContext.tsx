import React, { useState, useEffect} from 'react';
import { User } from '../types/types'
import { AuthState } from '../types/types';
import ApiFunctions from '../api/apiHelper';

const AuthContext = React.createContext<AuthState>({
    user: null,
    loading: "idle",  // Initially, we're verifying the user's authentication status
  });

  interface AuthProviderProps {
    children: React.ReactNode;
  }  

 const AuthProvider: React.FC<AuthProviderProps>  = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<'idle' | 'loading'>('idle');

  const verifyAuth = async () => {
    setLoading('loading');
    try {
      const res = await ApiFunctions.getMe();
      if (res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to verify auth", error);
    } finally {
      setLoading('idle');
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
  
export { AuthContext, AuthProvider };

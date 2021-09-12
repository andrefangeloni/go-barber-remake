import React from 'react';

import api from '../services/api';

interface SignInCredredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredredentials): Promise<void>;
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = React.useCallback(async ({ email, password }) => {
    const { data } = await api.post('/sessions', { email, password });
    console.log(data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'André', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

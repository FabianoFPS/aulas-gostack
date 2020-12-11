import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface GenericObject {
  [key: string]: string | number;
}

interface AuthState {
  token: string;
  user: GenericObject;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: GenericObject;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');
    if (!token || !user) return {} as AuthState;
    return { token, user: JSON.parse(user) };
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, userResponse } = response.data;
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(userResponse));
    setData({ token, user: userResponse });
  }, []);
  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw Error('useAuth must be used within an AuthProvider');
  return context;
}

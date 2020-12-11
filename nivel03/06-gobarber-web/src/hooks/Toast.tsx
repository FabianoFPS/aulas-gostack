import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContex = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const addToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const id = uuid();
    const toast = {
      id,
      ...message,
    };
    setMessages(oldMessages => [...oldMessages, toast]);
  }, []);
  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);
  return (
    <ToastContex.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContex.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContex);
  if (!context) throw Error('useToast must be used within a ToastProvider');
  return context;
}

export { ToastProvider, useToast };

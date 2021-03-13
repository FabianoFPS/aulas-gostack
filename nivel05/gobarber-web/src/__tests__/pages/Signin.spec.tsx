import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Signin from '../../pages/Signin';

const mockedHostoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHostoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Signin Page', () => {
  it('should be able to sign in', () => {
    // const { debug } = render(<Signin />);
    // debug();
    const { getByPlaceholderText, getByText } = render(<Signin />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordFiels = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'b@b.com' } });
    fireEvent.change(passwordFiels, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    expect(mockedHostoryPush).toHaveBeenCalledWith('/dashboard');
  });
});

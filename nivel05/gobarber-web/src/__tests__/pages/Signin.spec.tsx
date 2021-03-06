import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import Signin from '../../pages/Signin';

const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

const mockedSignin = jest.fn();
jest.mock('../../hooks/Auth', () => ({
  useAuth: () => ({
    signIn: mockedSignin,
  }),
}));

const mockedAddToast = jest.fn();
jest.mock('../../hooks/Toast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('Signin Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedSignin.mockClear();
  });

  it('should be able to sign in', async () => {
    // const { debug } = render(<Signin />);
    // debug();
    const { getByPlaceholderText, getByText } = render(<Signin />);

    act(() => {
      const emailField = getByPlaceholderText('E-mail');
      const passwordFiels = getByPlaceholderText('Senha');
      const buttonElement = getByText('Entrar');

      fireEvent.change(emailField, { target: { value: 'b@b.com' } });
      fireEvent.change(passwordFiels, { target: { value: '123456' } });
      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in withinvalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);

    act(() => {
      const emailField = getByPlaceholderText('E-mail');
      const passwordFiels = getByPlaceholderText('Senha');
      const buttonElement = getByText('Entrar');

      fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
      fireEvent.change(passwordFiels, { target: { value: '123456' } });
      fireEvent.click(buttonElement);
    });

    await waitFor(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  });

  it('should be display an erros if ligin false', async () => {
    jest.mock('../../hooks/Auth', () => ({
      useAuth: () => ({
        signIn: () => {
          throw new Error();
        },
      }),
    }));

    const { getByPlaceholderText, getByText } = render(<Signin />);

    act(() => {
      const emailField = getByPlaceholderText('E-mail');
      const passwordFiels = getByPlaceholderText('Senha');
      const buttonElement = getByText('Entrar');

      fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
      fireEvent.change(passwordFiels, { target: { value: '123456' } });
      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});

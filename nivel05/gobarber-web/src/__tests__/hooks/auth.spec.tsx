import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-test-renderer';

import { AuthProvider, useAuth } from '../../hooks/Auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 1234,
        name: 'Jhon Doe',
        email: 'b@b.com',
      },
      token: 'token-12km4me0df9fdf',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signIn({
        email: apiResponse.user.email,
        password: '123456',
      });
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual(apiResponse.user.email);
  });

  it('should restore saved data from storage when auth inits', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => {
        const user = {
          id: 1234,
          name: 'Jhon Doe',
          email: 'b@b.com',
        };
        switch (key) {
          case '@GoBarber:token':
            return 'token-12km4me0df9fdf';
          case '@GoBarber:user':
            return JSON.stringify(user);
          default:
            return null;
        }
      });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('b@b.com');
  });

  it('should be able to sign out', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => {
        const user = {
          id: 1234,
          name: 'Jhon Doe',
          email: 'b@b.com',
        };
        switch (key) {
          case '@GoBarber:token':
            return 'token-12km4me0df9fdf';
          case '@GoBarber:user':
            return JSON.stringify(user);
          default:
            return null;
        }
      });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.signOut());

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'uuid',
      name: 'Jhon Doe',
      email: 'b@b.com',
      avatar_url: 'link',
    };

    act(() => result.current.updateUser(user));

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
